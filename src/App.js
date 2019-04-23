import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
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
import LoadingIndicatorComponent from './components/LoadingIndicatorComponent';
import KeplerGlComponent from './components/KeplerGL';

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
import {columnToKeplerField, dataToKeplerRow, dataTableToKepler, log} from './utils';

//logos
import dbLogo from './assets/dblogo.png';
import ssLogo from './assets/sslogo.jpg';
import kepLogo from './assets/kepler.gl-logo.png';

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

function findColumnIndex(state, fieldType) {
  return (state.ConfigSheetColumns || [])
    .findIndex(f => f.fieldName === state.tableauSettings[fieldType]);
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
    this.unregisterEventFn = undefined;
  }

  addEventListeners = () => {
    // Whenever we restore the filters table, remove all save handling functions,
    // since we add them back later in this function.
    // provided by tableau extension samples
    this.removeEventListeners();
    // let localUnregisterHandlerFunctions = Object.assign([], ...this.state.unregisterHandlerFunctions);
    // localUnregisterHandlerFunctions.forEach(unregisterHandlerFunction => {
    //   console.log('removing existing listener', unregisterHandlerFunction);
    //   unregisterHandlerFunction();
    // });
    let localUnregisterHandlerFunctions = [];

    //add filter change event listener with callback to re-query data after change
    // go through each worksheet and then add a filter change event listner
    // need to check whether this is being applied more than once
    tableauExt.dashboardContent.dashboard.worksheets.map((worksheet) => {

      // add event listner
      let unregisterHandlerFunction = worksheet.addEventListener(
          window.tableau.TableauEventType.FilterChanged,
          this.filterChanged
      );
      // provided by tableau extension samples, may need to push this to state for react
      localUnregisterHandlerFunctions.push(unregisterHandlerFunction);

      unregisterHandlerFunction = worksheet.addEventListener(
        window.tableau.TableauEventType.MarkSelectionChanged,
        this.marksSelected
      );

      // provided by tableau extension samples, may need to push this to state for react
      localUnregisterHandlerFunctions.push(unregisterHandlerFunction);
    });
    this.setState({unregisterHandlerFunctions: localUnregisterHandlerFunctions }
      , () => console.log('event listeners added', this.state)
    );
  }

  removeEventListeners = () => {
    let localUnregisterHandlerFunctions = [ ...this.state.unregisterHandlerFunctions ];
    console.log('removing event listener', localUnregisterHandlerFunctions);
    localUnregisterHandlerFunctions.forEach(unregisterHandlerFunction => {
      unregisterHandlerFunction();
    });
    localUnregisterHandlerFunctions = [];
    this.setState({ unregisterHandlerFunctions: []}
      , () => console.log('event listeners removed', this.state)
    );
  }


  onNextStep = () => {
    if ( this.state.stepIndex === 2 ) {
      this.customCallBack('configuration');
    } else {
      this.setState((previousState, currentProps) => {
        return {stepIndex: previousState.stepIndex + 1};
      });
    }
  }

  onPrevStep = () => {
    this.setState((previousState, currentProps) => {
      return {stepIndex: previousState.stepIndex - 1};
    });
  }

  clickCallBack = d => {
    log(
      'in on click callback',
      d,
      findColumnIndex(this.state, 'clickField'),
      this.state.tableauSettings.clickAction
    );

    // remove event listeners
    this.removeEventListeners();

    // check which action we are supposed to take
    if (
      (this.state.tableauSettings.clickAction || 'No Action') === 'Highlight' &&
      (this.state.tableauSettings.clickField || 'None') !== 'None'
    ) {
      if (d) {
        // if clicked is a single object, d is an array of all column values of that object
        // if clicked is a hexbin or grid, d is an array of all object that falls into that hexbin
        tableauExt.dashboardContent.dashboard.worksheets.map(worksheet => {
          if (worksheet.name !== this.state.tableauSettings.ConfigSheet) {
            log(
              `clicked ${typeof d[0] === 'object'} and ${d.map(
                childD =>
                  childD[findColumnIndex(this.state, 'clickField')]
              )}: in sheet loop`,
              worksheet.name,
              worksheet,
              tableauExt.settings.get('ConfigChildField')
            );

            if (typeof d[0] === 'object') {
              worksheet
                .selectMarksByValueAsync(
                  [
                    {
                      fieldName: this.state.tableauSettings.clickField,
                      value: d.map(
                        childD =>
                          childD[findColumnIndex(this.state, 'clickField')]
                      )
                    }
                  ],
                  window.tableau.SelectionUpdateType.Replace
                )
                .then(e => {
                  this.addEventListeners();
                  log('select marks response: ' + worksheet.name, e)
                }); // response is void per tableau-extensions.js
            } else {
              worksheet
                .selectMarksByValueAsync(
                  [
                    {
                      fieldName: this.state.tableauSettings.clickField,
                      value: d[findColumnIndex(this.state, 'clickField')]
                    }
                  ],
                  window.tableau.SelectionUpdateType.Replace
                )
                .then(e => {
                  this.addEventListeners();
                  log('select marks response: ' + worksheet.name, e)
                }); // response is void per tableau-extensions.js
            }
          }
        });
      }
    } else if (
      (this.state.tableauSettings.clickAction || 'No Action') === 'Filter' &&
      (this.state.tableauSettings.clickField || 'None') !== 'None'
    ) {
      if (d) {
        // if clicked is a single object, d is an array of all column values of that object
        // if clicked is a hexbin or grid, d is an array of all object that falls into that hexbin
        tableauExt.dashboardContent.dashboard.worksheets.map(worksheet => {
          if (worksheet.name !== this.state.tableauSettings.ConfigSheet) {
            log(
              `clicked ${typeof d[0] === 'object'} and ${d.map(
                childD => childD[findColumnIndex(this.state, 'clickField')]
              )}: in sheet loop`,
              worksheet.name,
              worksheet,
              tableauExt.settings.get('ConfigChildField')
            );

            if (typeof d[0] === 'object') {
              worksheet
                .applyFilterAsync(
                  this.state.tableauSettings.clickField,
                  d.map(
                    childD => childD[findColumnIndex(this.state, 'clickField')]
                  ),
                  window.tableau.FilterUpdateType.Replace
                )
                .then(e => {
                  this.addEventListeners();
                  log('filter applied response', e)
                }); // response is void per tableau-extensions.js
            } else {
              worksheet
                .applyFilterAsync(
                this.state.tableauSettings.clickField,
                [d[findColumnIndex(this.state, 'clickField')]],
                window.tableau.FilterUpdateType.Replace
              )
              .then(e => {
                this.addEventListeners();
                log('filter applied response', e)
              }); // response is void per tableau-extensions.js
            }
          }
        });
      } else {
        tableauExt.dashboardContent.dashboard.worksheets.map(worksheet => {
          if (worksheet.name !== this.state.tableauSettings.ConfigSheet) {
            worksheet.clearFilterAsync(this.state.tableauSettings.clickField)
            .then(e => {
              worksheet.selectMarksByValueAsync(
                [
                  {
                    fieldName: this.state.tableauSettings.clickField,
                    value: []
                  }
                ],
                window.tableau.SelectionUpdateType.Replace
              )
              .then(e => {
                this.addEventListeners();
                log('clear filter response', worksheet.name, e)
              }); // response is void per tableau-extensions.js
            }); // response is void per tableau-extensions.js
          }
        });
      }
    }
    // go through each worksheet and select marks
  };

  hoverCallBack = d => {
    log(
      'in on hover callback',
      d,
      findColumnIndex(this.state, 'hoverField'),
      this.state.tableauSettings.hoverAction
    );

    // remove event listeners
    this.removeEventListeners();

    // check which action we are supposed to take
    if (
      (this.state.tableauSettings.hoverAction || 'No Action') === 'Highlight' &&
      (this.state.tableauSettings.hoverField || 'None') !== 'None'
    ) {
      if (d) {
        // if clicked is a single object, d is an array of all column values of that object
        // if clicked is a hexbin or grid, d is an array of all object that falls into that hexbin
        tableauExt.dashboardContent.dashboard.worksheets.map(worksheet => {
          // if (worksheet.name !== this.state.tableauSettings.ConfigSheet) {
            log(
              `hovered ${typeof d[0] === 'object'} and ${d[findColumnIndex(this.state, 'hoverField')]}: in sheet loop`,
              worksheet.name,
              worksheet,
              this.state.tableauSettings.hoverField
            );

            if (typeof d[0] === 'object') {
              worksheet
                .selectMarksByValueAsync(
                  [
                    {
                      'fieldName': this.state.tableauSettings.hoverField,
                      'value': d.map(
                        childD => childD[findColumnIndex(this.state, 'hoverField')]
                      )
                    }
                  ],
                  window.tableau.SelectionUpdateType.Replace
                )
                .then(e => {
                  this.addEventListeners();
                  log('select marks response: ' + worksheet.name, e)
                }); // response is void per tableau-extensions.js
            } else {
              worksheet
                .selectMarksByValueAsync(
                  [
                    {
                      fieldName: this.state.tableauSettings.hoverField,
                      value: d[findColumnIndex(this.state, 'hoverField')]
                    }
                  ],
                  window.tableau.SelectionUpdateType.Replace
                )
                .then(e => {
                  this.addEventListeners();
                  log('select marks response: ' + worksheet.name, e)
                }); // response is void per tableau-extensions.js
            }
          // }
        });
      }
    } else if (
      (this.state.tableauSettings.hoverAction || 'No Action') === 'Filter' &&
      (this.state.tableauSettings.hoverField || 'None') !== 'None'
    ) {
      if (d) {
        // if clicked is a single object, d is an array of all column values of that object
        // if clicked is a hexbin or grid, d is an array of all object that falls into that hexbin
        tableauExt.dashboardContent.dashboard.worksheets.map(worksheet => {
          if (worksheet.name !== this.state.tableauSettings.ConfigSheet) {
            log(
              `hovered ${typeof d[0] === 'object'} and ${d.map(
                childD => childD[findColumnIndex(this.state, 'hoverField')]
              )}: in sheet loop`,
              worksheet.name,
              worksheet,
              tableauExt.settings.get('ConfigChildField')
            );

            if (typeof d[0] === 'object') {
              worksheet
                .applyFilterAsync(
                  this.state.tableauSettings.hoverField,
                  d.map(childD => childD[findColumnIndex(this.state, 'hoverField')]),
                  window.tableau.FilterUpdateType.Replace
                )
                .then(e => {
                  this.addEventListeners();
                  log('filter applied response', e)
                }); // response is void per tableau-extensions.js
            } else {
              worksheet.applyFilterAsync(
                this.state.tableauSettings.hoverField,
                [d[findColumnIndex(this.state, 'hoverField')]],
                window.tableau.FilterUpdateType.Replace
                )
                .then(e => {
                  this.addEventListeners();
                  log('filter applied response', e)
                }); // response is void per tableau-extensions.js
            }
          }
        });
      } else {
        tableauExt.dashboardContent.dashboard.worksheets.map(worksheet => {
          if (worksheet.name !== this.state.tableauSettings.ConfigSheet) {
            worksheet.clearFilterAsync(this.state.tableauSettings.clickField)
            .then(e => {
              worksheet.selectMarksByValueAsync(
                [
                  {
                    fieldName: this.state.tableauSettings.clickField,
                    value: []
                  }
                ],
                window.tableau.SelectionUpdateType.Replace
              )
              .then(e => {
                this.addEventListeners();
                log('clear filter response', worksheet.name, e)
              }); // response is void per tableau-extensions.js
            }); // response is void per tableau-extensions.js
          }
        });
      }
    }
    // go through each worksheet and select marks
  };

  demoChange = event => {
    this.setState({demoType: event.target.value});
    log('in demo change', event.target.value, this.state.demoType);
  };

  handleChange = event => {
    log('event', event);
    if (TableauSettings.ShouldUse) {
      // create a single k/v pair
      let kv = {};
      kv[event.target.name] = event.target.value;
      // update the settings
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
  }

  configCallBack = (field, columnName) => {
    // field = ChoroSheet, sheet = Data
    console.log('configCallBack', field);

    // if we are in config call back from a sheet selection, go get the data
    // this only works in the #true instance, must use update lifecycle method to catch both
    // if (field.indexOf("Sheet") >= 0) {
    //   this.getSummaryData(columnName, field);
    // }

    if (TableauSettings.ShouldUse) {
      console.log('TableauSettings.ShouldUse: ', TableauSettings.ShouldUse);
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
      //tableauExt.settings.set('is' + field, true);
      tableauExt.settings.set(field, columnName);
      tableauExt.settings.saveAsync().then(() => {
        this.setState({
          // ['is' + field]: true,
          tableauSettings: tableauExt.settings.getAll()
        });
      });
    }
  }

  eraseCallBack = field => {
    log("triggered erase", field);
    if (TableauSettings.ShouldUse) {
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
  }

  customCallBack = confSetting => {
    log('in custom call back', confSetting);
    if (TableauSettings.ShouldUse) {
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
  }

  // needs to be updated to handle if more than one data set is selected
  // find all sheets in array and then call get summary, for now hardcoding
  filterChanged = e => {
    const selectedSheet = tableauExt.settings.get('ConfigSheet');
    if (selectedSheet && selectedSheet === e.worksheet.name) {
      log(
        '%c ==============App filter has changed',
        'background: #777; color: red'
      );
      this.getConfigSheetSummaryData(selectedSheet);
    }
  }

  marksSelected = e => {
    if ( this.state.tableauSettings.keplerFilterField ) {
      log(
        '%c ==============App Marker selected',
        'background: #777; color: red'
      );

      // remove event listeners
      this.removeEventListeners();

      // get selected marks and pass to kepler via state object
      e.getMarksAsync().then(marks => {

        console.log('marks', marks);
        // loop through marks table and adjust the class for opacity
        let marksDataTable = marks.data[0];
        let col_indexes = {};
        let keplerFields = [];


        //write column names to array
        for (let k = 0; k < marksDataTable.columns.length; k++) {
            col_indexes[marksDataTable.columns[k].fieldName] = k;
            keplerFields.push(columnToKeplerField(marksDataTable.columns[k], k));
          }

        const keplerData = dataToKeplerRow(marksDataTable.data, keplerFields);
        //console.log('zzz mark do we see data', marksDataTable.data.length, marksDataTable.data, keplerData, keplerFields, col_indexes);


        const filterKeplerObject = {
          field: this.state.tableauSettings.keplerFilterField,
          values: keplerData.map(childD => childD[col_indexes[this.state.tableauSettings.keplerFilterField]])
        };

        // @shan you can remove this console once you are good with the object
        this.props.dispatch(markerSelect(filterKeplerObject))
        this.setState({ filterKeplerObject }, () => this.addEventListeners());
        //console the select marks table
        //log('marks', marksDataTable, col_indexes, data, this.state.tableauSettings.hoverField, this.state.tableauSettings.clickField);

      });
    }
  }

  getConfigSheetSummaryData = selectedSheet => {
    // clean up event listeners (taken from tableau example)
    this.removeEventListeners();

    log(selectedSheet, 'ConfigSheet', 'in getData');

    // get sheet information this.state.selectedSheet should be syncronized with settings
    // can possibly remove the || in the sheetName part

    const sheetName = selectedSheet;
    const sheetObject = tableauExt.dashboardContent.dashboard.worksheets.find(
      worksheet => worksheet.name === sheetName
    );

    log(sheetObject);

    if (TableauSettings.ShouldUse) {
      TableauSettings.updateAndSave(
        {
          isLoading: true
        },
        settings => {
          this.setState({
            isLoading: true,
            tableauSettings: settings
          });
        }
      );
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
        log(
          '%c getConfigSheetSummaryData TableauSettings.ShouldUse',
          'color: blue'
        );
        TableauSettings.updateAndSave(
          {
            isLoading: false
          },
          settings => {
            this.setState({
              ...newDataState,
              tableauSettings: settings,
              isLoading: false,
              isMissingData: false
            });
          },
          true
        );
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
      log('getData() state', this.state);
    });
  }

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
  }

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
    }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize, true);
  }

  resize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  componentDidMount() {
    const _this = this;
    window.addEventListener('resize', this.resize, true);
    this.resize();

    tableauExt
      .initializeAsync({configure: this.configure})
      .then(() => {
        return fetch('https://mapsconfig.tableau.com/v1/config.json');
      })
      .then(response => {
        return response.json();
      }).then((configJson) => {
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

        this.setState({
          tableauKey: (configJson.access_token || []).token,
          isLoading: false,
          height: window.innerHeight,
          width: window.innerWidth,
          sheetNames: sheetNames,
          dashboardName: dashboardName,
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
    // console log settings to check current status
    if (tableauExt.settings) {
      log('will update', this.state, nextState, tableauExt.settings.getAll());

      //get selectedSheet from Settings
      //hardcoding this for now because I know i have two possibilities
      let selectedSheet = tableauExt.settings.get('ConfigSheet');
      if (
        selectedSheet &&
        this.state.tableauSettings.ConfigSheet !==
          nextState.tableauSettings.ConfigSheet
      ) {
        log('%c ===========App ConfigSheet has changed', 'color: green');
        this.getConfigSheetSummaryData(selectedSheet);
      } //get field3 from Settings
    } else {
      log(
        'will update',
        this.state,
        nextState,
        'tableauExt.settings not ready yet'
      );
    }
  }

  // just logging this for now, may be able to remove later
  componentDidUpdate() {
    if (tableauExt.settings) {
      log('did update', this.state, tableauExt.settings.getAll());
    } else {
      log('did update', this.state, 'tableauExt.settings not ready yet');
    }
  }

  render() {
    //short cut this cause we use it ALOT
    const tableauSettingsState = this.state.tableauSettings;

    // log some stuff to see what is going on
    log(
      'in render',
      this.state.width,
      this.state.height,
      this.state.configuration,
      tableauSettingsState,
      this.state
    );

    //loading screen jsx
    let isLoading = false;
    if (
      !this.state.isSplash &&
      !this.state.isConfig &&
      (this.state.isLoading ||
        tableauSettingsState.isLoading === 'true' ||
        this.state.isMissingData)
    ) {
      log('============APP.state isLoading');
      isLoading = true;
    }

    // config screen jsx
    if (this.state.isConfig) {
      let stepNames = ['Select Sheet', 'Customize Kepler.gl'];

      log(this.state.stepIndex);

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
              configSheetColumns={this.state.ConfigSheetColumns}
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
      return (
        <div className="splashScreen" style={{padding: 5}}>
          <SplashScreen
            configure={this.configure}
            title="Kepler.gl within Tableau"
            desc="Leverage the brilliance of Kepler.gl functionality, directly within Tableau!"
            ctaText="Configure"
            poweredBy={
              <React.Fragment>
                <p className="info">Brought to you by: </p>
                <a href="http://www.datablick.com/" target="_blank">
                  <img src={dbLogo} />
                </a>{' '}
                <a href="https://starschema.com/" target="_blank">
                  <img src={ssLogo} />
                </a>
                <p className="info">Powered by: </p>
                <a href="https://github.com/uber/kepler.gl" target="_blank">
                  <img src={kepLogo} />
                </a>
              </React.Fragment>
            }
          />
        </div>
      );
    }

    return (
      <KeplerGlComponent
        className={'tableau-kepler-gl'}
        width={this.state.width}
        height={this.state.height}
        data={this.state.ConfigSheetData}
        tableauSettings={tableauSettingsState}
        theme={tableauSettingsState.theme}
        readOnly={tableauSettingsState.readOnly === 'true'}
        keplerConfig={tableauSettingsState.keplerConfig}
        mapboxAPIKey={
          tableauSettingsState.mapboxAPIKey
            ? tableauSettingsState.mapboxAPIKey
            : this.state.tableauKey
        }
        isLoading={isLoading}
        // persist state to tableau
        configCallBack={this.configCallBack}
        // interactivity
        clickCallBack={this.clickCallBack}
        hoverCallBack={this.hoverCallBack}
      />
    );
  }
}

App.propTypes = {};

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

const ConnectedApp = connect(
  mapStateToProps,
  dispatchToProps
)(App);

export default withStyles(styles)(ConnectedApp);
