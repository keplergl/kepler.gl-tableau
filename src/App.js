// Copyright (c) 2019 Chris DeMartini
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/* eslint-disable complexity */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

import './App.css';

// actions
import {markerSelect} from './actions';

// Custom config components
import SplashScreen from './components/SplashScreen';
import {
  PickSheets,
  CustomizeViolin,
  Stepper,
  StepButtons
} from './components/Configuration';

// Viz components
import KeplerGlComponent from './components/KeplerGL/index';

import {withStyles} from '@material-ui/core/styles';

// Tableau Styles and Tableau
// import './assets/tableau/vendor/slick.js/slick/slick.css';
// import './assets/tableau/css/style.min.css';
import {tableau} from './tableau-extensions-1.latest';

// tableau settings handler
import * as TableauSettings from './TableauSettings';

// initial default settings
import defaultSettings from './components/Configuration/defaultSettings';

// utils and variables
import {
  columnToKeplerField,
  dataToKeplerRow,
  dataTableToKepler,
  log
} from './utils';
import {
  selectMarksByField,
  applyFilterByField,
  clearMarksByField,
  clearFilterByField
} from './utils/interaction-utils';

//logos
import dbLogo from './assets/dblogo.png';
import ssLogo from './assets/sslogo.jpg';
import kepLogo from './assets/kepler.gl-logo_2x.png';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoiY2p2OGVvejQwMDJxZzRma2dvdWQ2OTQwcSJ9.VbuIamTa_JayuD2yr5tjaA';

// begin constants to move to another file later
// material ui styles
const styles = theme => ({
  root: {
    display: 'flex'
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

const tableauExt = window.tableau.extensions;

//tableau get summary data options
const options = {
  ignoreAliases: false,
  ignoreSelection: true,
  maxRows: 0
};

function findColumnIndexByFieldName(state, fieldName) {
  return (state.ConfigSheetColumns || []).findIndex(
    f => f.fieldName === fieldName
  );
}
// end constants to move to another file later

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfig: this.props.isConfig || false,
      isLoading: true,
      isSplash: true,
      configuration: false,
      height: 300,
      width: 300,
      dashboardName: '',
      sheetNames: [],
      tableauSettings: {},
      demoType: 'Violin',
      stepIndex: 1,
      isMissingData: true,
      highlightOn: undefined,
      unregisterHandlerFunctions: [],
      filterKeplerObject: [],
      theme: 'light'
    };

    TableauSettings.setEnvName(this.props.isConfig ? 'CONFIG' : 'EXTENSION');

    this.unregisterHandlerFunctions = [];
    this.applyingMouseActions = false;
    this.clickCallBack = throttle(this.clickCallBack, 200);
    this.hoverCallBack = throttle(this.hoverCallBack, 200);
    this.configCallBack = debounce(this.configCallBack, 500);
  }

  // eslint-disable-next-line react/sort-comp
  addEventListeners = () => {
    // Whenever we restore the filters table, remove all save handling functions,
    // since we add them back later in this function.
    // provided by tableau extension samples

    log('%c addEventListeners', 'background: purple; color:yellow');
    this.removeEventListeners();

    const localUnregisterHandlerFunctions = [];

    // add filter change event listener with callback to re-query data after change
    // go through each worksheet and then add a filter change event listener
    // need to check whether this is being applied more than once
    tableauExt.dashboardContent.dashboard.worksheets.map(worksheet => {
      // add event listener
      const unregisterFilterHandlerFunction = worksheet.addEventListener(
        window.tableau.TableauEventType.FilterChanged,
        this.filterChanged
      );
      // provided by tableau extension samples, may need to push this to state for react
      localUnregisterHandlerFunctions.push(unregisterFilterHandlerFunction);

      const unregisterMarkerHandlerFunction = worksheet.addEventListener(
        window.tableau.TableauEventType.MarkSelectionChanged,
        this.marksSelected
      );

      // provided by tableau extension samples, may need to push this to state for react
      localUnregisterHandlerFunctions.push(unregisterMarkerHandlerFunction);
    });

    this.unregisterHandlerFunctions = localUnregisterHandlerFunctions;
    // log(`%c added ${this.unregisterHandlerFunctions.length} EventListeners`, 'background: purple, color:yellow');
  };

  removeEventListeners = () => {
    log(
      `%c remove ${this.unregisterHandlerFunctions.length} EventListeners`,
      'background: green; color:black'
    );

    this.unregisterHandlerFunctions.forEach(unregisterHandlerFunction => {
      unregisterHandlerFunction();
    });

    this.unregisterHandlerFunctions = [];
  };

  onNextStep = () => {
    if (this.state.stepIndex === 2) {
      this.customCallBack('configuration');
    } else {
      this.setState((previousState, currentProps) => {
        return {stepIndex: previousState.stepIndex + 1};
      });
    }
  };

  onPrevStep = () => {
    this.setState((previousState, currentProps) => {
      return {stepIndex: previousState.stepIndex - 1};
    });
  };

  clickCallBack = d => {
    const {clickField, clickAction} = this.state.tableauSettings;

    log(
      '%c in on click callback',
      'background: brown'
      // d,
      // findColumnIndexByFieldName(this.state, clickField),
      // clickAction
    );

    this.applyMouseActionsToSheets(d, clickAction, clickField);
  };

  hoverCallBack = d => {
    const {hoverField, hoverAction} = this.state.tableauSettings;

    log(
      '%c in on hover callback',
      'background: OLIVE'
      // d,
      // findColumnIndexByFieldName(this.state, hoverField),
      // hoverAction
    );

    this.applyMouseActionsToSheets(d, hoverAction, hoverField);
    // go through each worksheet and select marks
  };

  applyMouseActionsToSheets = (d, action, fieldName) => {
    if (this.applyingMouseActions) {
      return;
    }
    const {ConfigSheet} = this.state.tableauSettings;
    const toHighlight =
      action === 'Highlight' && (fieldName || 'None') !== 'None';
    const toFilter = action === 'Filter' && (fieldName || 'None') !== 'None';

    // if no action should be taken
    if (!toHighlight && !toFilter) {
      return;
    }

    // remove EventListeners before apply any async actions
    this.removeEventListeners();
    this.applyingMouseActions = true;

    let tasks = [];

    if (d) {
      // select marks or filter
      const fieldIdx = findColumnIndexByFieldName(this.state, fieldName);
      const fieldValues =
        typeof d[0] === 'object'
          ? d.map(childD => childD[fieldIdx])
          : [d[fieldIdx]];

      const actionToApply = toHighlight
        ? selectMarksByField
        : applyFilterByField;
      tasks = actionToApply(fieldName, fieldValues, ConfigSheet);
    } else {
      // clear marks or filer
      const actionToApply = toHighlight
        ? clearMarksByField
        : clearFilterByField;
      tasks = actionToApply(fieldName, ConfigSheet);
    }

    Promise.all(tasks).then(() => {
      // all selection should be completed
      // Add event listeners back
      this.addEventListeners();
      this.applyingMouseActions = false;
    });
  };

  demoChange = event => {
    this.setState({demoType: event.target.value});
    log('in demo change', event.target.value, this.state.demoType);
  };

  handleChange = event => {
    log('event', event);
    if (TableauSettings.ShouldUse) {
      // create a single k/v pair
      const kv = {};
      kv[event.target.name] = event.target.value;
      // update the settings

      log(
        '%c handleChange=======TableauSettings.updateAndSave',
        'background: red; color: white'
      );
      TableauSettings.updateAndSave(kv, settings => {
        this.setState({
          tableauSettings: settings
        });
      });
    } else {
      tableauExt.settings.set(event.target.name, event.target.value);
      tableauExt.settings.saveAsync().then(() => {
        this.setState({
          tableauSettings: tableauExt.settings.getAll()
        });
      });
    }
  };

  configCallBack = (field, columnName) => {
    if (TableauSettings.ShouldUse) {
      log(
        '%c configCallBack=======TableauSettings.updateAndSave',
        'background: red; color: white'
      );
      TableauSettings.updateAndSave(
        {
          // ['is' + field]: true,
          [field]: columnName
        },
        settings => {
          this.setState({
            // ['is' + field]: true,
            tableauSettings: settings
          });
        }
      );
    } else {
      tableauExt.settings.set(field, columnName);
      tableauExt.settings.saveAsync().then(() => {
        this.setState({
          tableauSettings: tableauExt.settings.getAll()
        });
      });
    }
  };

  eraseCallBack = field => {
    log('triggered erase', field);
    if (TableauSettings.ShouldUse) {
      log(
        '%c eraseCallBack=======TableauSettings.eraseAndSave',
        'background: red; color: white'
      );
      TableauSettings.eraseAndSave([field], settings => {
        this.setState({
          tableauSettings: settings
        });
      });
    } else {
      // erase all the settings, there has got be a better way.
      tableauExt.settings.erase(field);

      // save async the erased settings
      // wip - should be able to get rid of state as this is all captured in tableu settings (written to state)
      tableauExt.settings.saveAsync().then(() => {
        this.setState({
          tableauSettings: tableauExt.settings.getAll()
        });
      });
    }
  };

  customCallBack = confSetting => {
    log('in custom call back', confSetting);
    if (TableauSettings.ShouldUse) {
      log(
        '%c customCallBack=======TableauSettings.updateAndSave',
        'background: red; color: white'
      );
      TableauSettings.updateAndSave(
        {
          [confSetting]: true
        },
        settings => {
          this.setState({
            [confSetting]: true,
            tableauSettings: settings
          });

          if (confSetting === 'configuration') {
            tableauExt.ui.closeDialog('false');
          }
        }
      );
    } else {
      tableauExt.settings.set(confSetting, true);
      tableauExt.settings.saveAsync().then(() => {
        this.setState({
          [confSetting]: true,
          tableauSettings: tableauExt.settings.getAll()
        });
        if (confSetting === 'configuration') {
          tableauExt.ui.closeDialog('false');
        }
      });
    }
  };

  // needs to be updated to handle if more than one data set is selected
  // find all sheets in array and then call get summary, for now hardcoding
  filterChanged = e => {
    const selectedSheet = tableauExt.settings.get('ConfigSheet');
    if (selectedSheet && selectedSheet === e.worksheet.name) {
      log(
        '%c ==============App filter has changed',
        'background: red; color: white'
      );
      this.getConfigSheetSummaryData(selectedSheet);
    }
  };

  marksSelected = e => {
    if (this.state.tableauSettings.keplerFilterField) {
      if (this.applyingMouseActions) {
        return;
      }
      log(
        '%c ==============App Marker selected',
        'background: red; color: white'
      );

      // remove event listeners
      this.removeEventListeners();

      // get selected marks and pass to kepler via state object
      e.getMarksAsync().then(marks => {
        const {keplerFilterField} = this.state.tableauSettings;
        // loop through marks table and adjust the class for opacity
        const marksDataTable = marks.data[0];
        const col_indexes = {};
        const keplerFields = [];

        // write column names to array
        for (let k = 0; k < marksDataTable.columns.length; k++) {
          col_indexes[marksDataTable.columns[k].fieldName] = k;
          keplerFields.push(columnToKeplerField(marksDataTable.columns[k], k));
        }

        const keplerData = dataToKeplerRow(marksDataTable.data, keplerFields);

        const filterKeplerObject = {
          field: keplerFilterField,
          values: keplerData.map(
            childD => childD[col_indexes[keplerFilterField]]
          )
        };

        // @shan you can remove this console once you are good with the object
        this.props.dispatch(markerSelect(filterKeplerObject));
        this.setState({filterKeplerObject}, () => this.addEventListeners());
      });
    }
  };

  getConfigSheetSummaryData = selectedSheet => {
    // get sheet information this.state.selectedSheet should be syncronized with settings
    // can possibly remove the || in the sheetName part

    const sheetName = selectedSheet;
    const sheetObject = tableauExt.dashboardContent.dashboard.worksheets.find(
      worksheet => worksheet.name === sheetName
    );
    if (!sheetObject) {
      return;
    }

    // clean up event listeners (taken from tableau example)
    this.removeEventListeners();

    if (TableauSettings.ShouldUse) {
      this.setState({
        isLoading: true
      });
    } else {
      this.setState({isLoading: true});
      tableauExt.settings.set('isLoading', true);
      tableauExt.settings.saveAsync().then(() => {
        this.setState({
          tableauSettings: tableauExt.settings.getAll()
        });
      });
    }

    //working here on pulling out summmary data
    //may want to limit to a single row when getting column names
    sheetObject.getSummaryDataAsync(options).then(t => {
      log('in getData().getSummaryDataAsync', t, this.state);

      const newDataState = dataTableToKepler(t);

      if (TableauSettings.ShouldUse) {

        this.setState({
          ...newDataState,
          selectedSheet: sheetName,
          isLoading: false,
          isMissingData: false
        });

      } else {
        log(
          '%c getConfigSheetSummaryData TableauSettings.ShouldUse false',
          'color: purple'
        );

        this.setState({isLoading: false});
        tableauExt.settings.set('isLoading', false);
        tableauExt.settings.saveAsync().then(() => {
          this.setState({
            ...newDataState,
            isLoading: false,
            tableauSettings: tableauExt.settings.getAll()
          });
        });
      }

      this.addEventListeners();
    });
  };

  clearSheet() {
    log('triggered erase');
    if (TableauSettings.ShouldUse) {
      TableauSettings.eraseAndSave(['isLoading', 'configuration'], settings => {
        this.setState({
          tableauSettings: settings,
          configuration: false,
          isSplash: true
        });
      });
    } else {
      // erase all the settings, there has got be a better way.
      tableauExt.settings.erase('isLoading');
      tableauExt.settings.erase('configuration');

      // save async the erased settings
      // wip - should be able to get rid of state as this is all captured in tableu settings (written to state)
      tableauExt.settings.saveAsync().then(() => {
        this.setState({
          tableauSettings: tableauExt.settings.getAll(),
          configuration: false,
          isSplash: true
        });
      });
    }
  }

  clearSplash = () => {
    this.setState({
      isSplash: false
    });
  };

  configure = () => {
    this.clearSheet();
    const popUpUrl = window.location.href + '#true';
    const popUpOptions = {
      height: 625,
      width: 720
    };

    tableauExt.ui
      .displayDialogAsync(popUpUrl, '', popUpOptions)
      .then(closePayload => {
        log('configuring', closePayload, tableauExt.settings.getAll());
        if (closePayload === 'false') {
          this.setState({
            isSplash: false,
            isConfig: false,
            tableauSettings: tableauExt.settings.getAll()
          });
        }
      })
      .catch(error => {
        // One expected error condition is when the popup is closed by the user (meaning the user
        // clicks the 'X' in the top right of the dialog).  This can be checked for like so:
        switch (error.errorCode) {
          case window.tableau.ErrorCodes.DialogClosedByUser:
            log('closed by user');
            break;
          default:
            console.error(error.message);
        }
      });
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize, true);
  }

  resize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize, true);
    this.resize();

    tableauExt.initializeAsync({configure: this.configure}).then(() => {
      // console.log('tableau config', configJson);
      // default tableau settings on initial entry into the extension
      // we know if we haven't done anything yet when tableauSettings state = []
      log('did mount', tableauExt.settings.get('mapboxAPIKey'));
      if (tableauExt.settings.get('mapboxAPIKey') === '') {
        log(
          'defaultSettings triggered',
          defaultSettings.length,
          defaultSettings
        );
        defaultSettings.defaultKeys.map((defaultSetting, index) => {
          log(
            'defaultSetting',
            index,
            defaultSetting,
            defaultSettings.defaults[defaultSetting]
          );
          this.configCallBack(
            defaultSetting,
            defaultSettings.defaults[defaultSetting]
          );
        });
      }

      // this is where the majority of the code is going to go for this extension I think
      log('will mount', tableauExt.settings.getAll());

      //get sheetNames and dashboard name from workbook
      const dashboardName = tableauExt.dashboardContent.dashboard.name;
      const sheetNames = tableauExt.dashboardContent.dashboard.worksheets.map(
        worksheet => worksheet.name
      );

      log('checking field in getAll()', tableauExt.settings.getAll());

      // add event listeners (this includes an initial removal)
      this.addEventListeners();

      // Initialize the current saved settings global
      TableauSettings.init();

      // default to uber's Kepler key that they requested if user does not enter
      this.setState({
        tableauKey: MAPBOX_ACCESS_TOKEN,
        isLoading: false,
        height: window.innerHeight,
        width: window.innerWidth,
        sheetNames,
        dashboardName,
        demoType: tableauExt.settings.get('ConfigType') || 'violin',
        tableauSettings: tableauExt.settings.getAll()
      });

      if (
        this.state.tableauSettings.configuration &&
        this.state.tableauSettings.configuration === 'true'
      ) {
        this.setState({
          isSplash: false,
          isConfig: false
        });
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (tableauExt.settings) {
      // get selectedSheet from Settings
      // hardcoding this for now because I know i have two possibilities
      const selectedSheet = tableauExt.settings.get('ConfigSheet');
      if (
        selectedSheet &&
        this.state.tableauSettings.ConfigSheet !==
          nextState.tableauSettings.ConfigSheet
      ) {
        this.getConfigSheetSummaryData(selectedSheet);
      }
    }
  }

  render() {
    // short cut this cause we use it ALOT
    const tableauSettingsState = this.state.tableauSettings;
    // loading screen jsx
    let isLoading = false;
    if (
      !this.state.isSplash &&
      !this.state.isConfig &&
      (this.state.isLoading || this.state.isMissingData)
    ) {
      isLoading = true;
    }

    // config screen jsx
    if (this.state.isConfig) {
      const stepNames = ['Select Sheet', 'Customize Kepler.gl'];

      if (this.state.stepIndex === 1) {
        // Placeholder sheet names. TODO: Bind to worksheet data
        return (
          <React.Fragment>
            <Stepper stepIndex={this.state.stepIndex} steps={stepNames} />
            <PickSheets
              sheetNames={this.state.sheetNames}
              configCallBack={this.configCallBack}
              field={'ConfigSheet'}
              ConfigSheet={tableauSettingsState.ConfigSheet || ''}
            />
            <StepButtons
              onNextClick={this.onNextStep}
              onPrevClick={this.onPrevStep}
              stepIndex={this.state.stepIndex}
              maxStepCount={stepNames.length}
              nextText={
                this.state.stepIndex !== stepNames.length ? 'Next' : 'Save'
              }
              backText="Back"
            />
          </React.Fragment>
        );
      }

      if (this.state.stepIndex === 2) {
        return (
          <React.Fragment>
            <Stepper stepIndex={this.state.stepIndex} steps={stepNames} />
            <CustomizeViolin
              handleChange={this.handleChange}
              customCallBack={this.customCallBack}
              field={'configuration'}
              tableauSettings={tableauSettingsState}
              configSheetColumns={this.state.ConfigSheetStringColumns || []}
            />
            <StepButtons
              onNextClick={this.onNextStep}
              onPrevClick={this.onPrevStep}
              stepIndex={this.state.stepIndex}
              maxStepCount={stepNames.length}
              nextText={
                this.state.stepIndex !== stepNames.length ? 'Next' : 'Save'
              }
              backText="Back"
            />
          </React.Fragment>
        );
      }
    }

    // splash screen jsx
    if (this.state.isSplash) {
      log(`%c this.state.isSplash=true}`, 'color: purple');

      return (
        <div className="splashScreen" style={{padding: 5}}>
          <SplashScreen
            configure={this.configure}
            title="Kepler.gl within Tableau"
            desc="Leverage the brilliance of Kepler.gl functionality, directly within Tableau!"
            ctaText="Configure"
            poweredBy={
              <React.Fragment>
                <p className="info">
                  For information on how to use this extension check out the{' '}
                  <a
                    href="https://github.com/uber/kepler.gl-tableau/tree/feat/docs/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    user guide
                  </a>
                  <br /> Tableau Requirements: Tableau Desktop (Mac Only) 2018.3
                  or >= 2019.1.2 or Tableau Server >= 2018.3
                </p>
                <p className="info">Brought to you by: </p>
                <a
                  href="http://www.datablick.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={dbLogo} />
                </a>{' '}
                <a
                  href="https://starschema.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={ssLogo} />
                </a>
                <p className="info">Powered by: </p>
                <a
                  href="https://github.com/uber/kepler.gl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={kepLogo} />
                </a>
              </React.Fragment>
            }
          />
        </div>
      );
    }

    const readOnly = tableauSettingsState.readOnly === 'true';
    log(`readOnly============== ${readOnly}`);

    return (
      <KeplerGlComponent
        className={'tableau-kepler-gl'}
        width={this.state.width}
        height={this.state.height}
        data={this.state.ConfigSheetData}
        selectedSheet={this.state.selectedSheet}
        tableauSettings={tableauSettingsState}
        theme={tableauSettingsState.theme}
        readOnly={readOnly}
        keplerConfig={tableauSettingsState.keplerConfig}
        mapboxAPIKey={
          tableauSettingsState.mapboxAPIKey
            ? tableauSettingsState.mapboxAPIKey
            : this.state.tableauKey
        }
        isLoading={isLoading}
        // persist state to tableau
        configCallBack={readOnly ? null : this.configCallBack}
        // interactivity
        clickCallBack={this.clickCallBack}
        hoverCallBack={this.hoverCallBack}
        dispatch={this.props.dispatch}
      />
    );
  }
}

App.propTypes = {};

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

const ConnectedApp = connect(mapStateToProps, dispatchToProps)(App);

export default withStyles(styles)(ConnectedApp);
