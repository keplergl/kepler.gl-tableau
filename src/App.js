import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

//semiotic
import { ResponsiveOrdinalFrame } from 'semiotic';

//lodash
import _ from 'lodash';

// Custom config components
import SplashScreen from './components/SplashScreen';
import { 
  PickType, 
  PickSheets, 
  CustomizeViolin, 
  Stepper, 
  StepButtons,
} from './components/Configuration'

// drag and drop 
import DragNDrop from './components/DragNDrop/DragNDrop';
import initialData from './components/DragNDrop/initial-data';

// import CustomizeOptions from './components/CustomizeOptions';
import { ConfigScreen, CustomScreen } from './components/Configuration';

// Viz components
import LoadingIndicatorComponent from './components/LoadingIndicatorComponent';
import SemioticViolin from './components/SemioticViolin';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

// Tableau Styles and Tableau
import './assets/tableau/vendor/slick.js/slick/slick.css';
import './assets/tableau/css/style.min.css';
import { tableau } from './tableau-extensions-1.latest';

// tableau settings handler
import * as TableauSettings from './TableauSettings';

// initial default settings
import defaultSettings from './components/Configuration/defaultSettings';

// utils and variables
import { 
  defaultColor, 
  DataBlick,
  semioticTypes, 
  dematrixifiedEdges, 
  dematrixifiedNodes,
  or_data,
  d3Curves,
} from './variables';
import { 
  convertRowToObject,
  log
} from './utils';

// icons
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';

//logos
import dbLogo from './assets/dblogo.png';
import ssLogo from './assets/sslogo.jpg';
import semLogo from './assets/semiotic_logo_horizontal.png'


// begin constants to move to another file later
// material ui styles
const styles = theme => ({
  root: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

const tableauExt = window.tableau.extensions;

//tableau get summary data options
const options = {
         ignoreAliases: false,
         ignoreSelection: true,
         maxRows: 0
};

// end constants to move to another file later

class App extends Component {
  constructor (props) {
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
      tableauSettings: [],
      demoType: "Violin",
      stepIndex: 1,
      isMissingData: true,
      highlightOn: undefined
    };

    TableauSettings.setEnvName(this.props.isConfig ? "CONFIG" : "EXTENSION");
    this.unregisterEventFn = undefined;

    this.clickCallBack = this.clickCallBack.bind(this);
    this.hoverCallBack = this.hoverCallBack.bind(this);
    this.filterChanged = this.filterChanged.bind(this);
    this.getSummaryData = this.getSummaryData.bind(this);
    this.configCallBack = this.configCallBack.bind(this);
    this.eraseCallBack = this.eraseCallBack.bind(this);
    this.customCallBack = this.customCallBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.demoChange = this.demoChange.bind(this);
    this.clearSheet = this.clearSheet.bind(this);
    this.clearSplash = this.clearSplash.bind(this);
    this.configure = this.configure.bind(this);
    this.onNextStep = this.onNextStep.bind(this);
    this.onPrevStep = this.onPrevStep.bind(this);
  }

  onNextStep() {
    if ( this.state.stepIndex === 4 ) {
      this.customCallBack('configuration');
    } else {
      this.setState((previousState, currentProps) => {
        return { stepIndex: previousState.stepIndex + 1 }
      });
    }
  }
  
  onPrevStep() {
    this.setState((previousState, currentProps) => {
      return {stepIndex: previousState.stepIndex - 1}
    });
  }

  clickCallBack = d => {
    log('in on click callback', d);
      // go through each worksheet and select marks
    if ( d ) {
      tableauExt.dashboardContent.dashboard.worksheets.map((worksheet) => {
        log(`clicked ${d.id}: in sheet loop`, worksheet.name, worksheet, tableauExt.settings.get("ConfigChildField") );
        // filter
        // if ( worksheet.name !== tableauExt.settings.get("ConfigSheet") ) {
        //   worksheet.applyFilterAsync(
        //     tableauExt.settings.get("ConfigChildField"), 
        //     [d.id],
        //     window.tableau.FilterUpdateType.Replace
        //   ).then(e => log('filter applied response', e)); // response is void per tableau-extensions.js
        // }
      });
    }
  }
  
  hoverCallBack = d => {
    log('in on hover callback', d);
      // go through each worksheet and select marks
    if ( d ) {
      tableauExt.dashboardContent.dashboard.worksheets.map((worksheet) => {
      log(`hovered ${d.id}: in sheet loop`, worksheet.name, worksheet, tableauExt.settings.get("ConfigChildField") );
      
      // select marks
      // worksheet.selectMarksByValueAsync(
      //   [{
      //     'fieldName': tableauExt.settings.get("ConfigChildField"),
      //     'value': [d.id],
      //   }],
      //   window.tableau.SelectionUpdateType.Replace
      // ).then(e => log('select marks response: ' + worksheet.name, e)); // response is void per tableau-extensions.js
      });
    }
  }

  demoChange = event => {
    this.setState({ demoType: event.target.value });
    log('in demo change', event.target.value, this.state.demoType);
  };

  handleChange (event) {
    log('event', event);
    if (TableauSettings.ShouldUse) {
  
      // create a single k/v pair
      let kv = {};
      kv[event.target.name] = event.target.value;
      // update the settings
      TableauSettings.updateAndSave(kv, settings => {
        this.setState({
          tableauSettings: settings,
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

  configCallBack (field, columnName) {
    // field = ChoroSheet, sheet = Data
    log('configCallBack', field, columnName);
  
    // if we are in config call back from a sheet selection, go get the data
    // this only works in the #true instance, must use update lifecycle method to catch both
    // if (field.indexOf("Sheet") >= 0) {
    //   this.getSummaryData(columnName, field);
    // }
  
    if (TableauSettings.ShouldUse) {
      TableauSettings.updateAndSave({
        // ['is' + field]: true,
        [field]: columnName,
      }, settings => {
        this.setState({
          // ['is' + field]: true,
          tableauSettings: settings,
        });
      });
  
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
  
  eraseCallBack (field) {
    log("triggered erase", field);
    if (TableauSettings.ShouldUse) {
  
      TableauSettings.eraseAndSave([
        field,
      ], settings => {
        this.setState({
          tableauSettings: settings,
        });
      });
  
    } else {
      // erase all the settings, there has got be a better way.
      tableauExt.settings.erase(field);
  
      // save async the erased settings
      // wip - should be able to get rid of state as this is all captured in tableu settings (written to state)
      tableauExt.settings.saveAsync().then(() => {
        this.setState({
          tableauSettings: tableauExt.settings.getAll(),
        });
      });
    }
  };
  
  customCallBack (confSetting) {
    log('in custom call back', confSetting);
    if (TableauSettings.ShouldUse) {
      TableauSettings.updateAndSave({
        [confSetting]: true
      }, settings => {
  
        this.setState({
          [confSetting]: true,
          tableauSettings: settings,
        });
  
        if (confSetting === "configuration" ) {
          tableauExt.ui.closeDialog("false");
        }
      })
  
    } else {
      tableauExt.settings.set(confSetting, true);
      tableauExt.settings.saveAsync().then(() => {
        this.setState({
          [confSetting]: true,
          tableauSettings: tableauExt.settings.getAll()
        });
        if (confSetting === "configuration" ) {
          tableauExt.ui.closeDialog("false");
        }
      });
    }
  }

  // needs to be updated to handle if more than one data set is selected
  // find all sheets in array and then call get summary, for now hardcoding
  filterChanged (e) {
    log('filter changed', e.worksheet.name, e);
    let selectedSheet = tableauExt.settings.get('ConfigSheet');
    if ( selectedSheet && selectedSheet === e.worksheet.name ) {
      log('calling summary data sheet');
      this.getSummaryData(selectedSheet, "ConfigSheet");
    } //get field3 from Settings
  }
  
  getSummaryData (selectedSheet, fieldName) {
    //clean up event listeners (taken from tableau expample)
    if (this.unregisterEventFn) {
      this.unregisterEventFn();
    }
  
    log(selectedSheet, fieldName, "in getData");
  
    // get sheet information this.state.selectedSheet should be syncronized with settings
    // can possibly remove the || in the sheetName part
    let sheetName = selectedSheet;
    let sheetObject = tableauExt.dashboardContent.dashboard.worksheets.find(worksheet => worksheet.name === sheetName);
  
    if (TableauSettings.ShouldUse) {
      TableauSettings.updateAndSave({
        isLoading: true
      }, settings => {
        this.setState({
          isLoading: true,
          tableauSettings: settings,
        })
      });
  
    } else {
      this.setState({ isLoading: true });
      tableauExt.settings.set('isLoading', true);
      tableauExt.settings.saveAsync().then(() => {
        this.setState({
          tableauSettings: tableauExt.settings.getAll()
        });
      });
    }
    
    //working here on pulling out summmary data
    //may want to limit to a single row when getting column names
    sheetObject.getSummaryDataAsync(options).then((t) => {
      log('in getData()', t, this.state);
  
      let col_names = [];
      let col_types = [];
      let col_names_S = [];
      let col_names_N = [];
      let col_indexes = {};
      let data = [];
  
      //write column names to array
      for (let k = 0; k < t.columns.length; k++) {
          col_indexes[t.columns[k].fieldName] = k;
  
          // write named array
          col_names.push(t.columns[k].fieldName);

          // write type array
          col_types.push(t.columns[k].dataType);

          // write typed arrays as well
          if (t.columns[k].dataType === 'string') {
            col_names_S.push(t.columns[k].fieldName);
          }
          else if (t.columns[k].dataType === 'int') {
            col_names_N.push(t.columns[k].fieldName);
          }
          else if (t.columns[k].dataType === 'float') {
            col_names_N.push(t.columns[k].fieldName);
          }
      }
      // log('columns', col_names, col_indexes);
  
      for (let j = 0, len = t.data.length; j < len; j++) {
        data.push(convertRowToObject(t.data[j], col_indexes, col_types));
        // log('converted data', data[j]);
      }
    
      // log flat data for testing
      log('flat data', data, col_names, fieldName);
  
      if (TableauSettings.ShouldUse) {
        TableauSettings.updateAndSave({
          isLoading: false
        }, settings => {
          this.setState({
            isLoading: false,
            [fieldName + 'Columns']: col_names,
            [fieldName + 'StringColumns']: col_names_S,
            [fieldName + 'NumberColumns']: col_names_N,
            [fieldName + 'Data']: data,
            tableauSettings: settings,
            isMissingData: false,
          });
        }, true);
  
      } else {
        this.setState({ isLoading: false });
        tableauExt.settings.set('isLoading', false);
        tableauExt.settings.saveAsync().then(() => {
          this.setState({
            isLoading: false,
            [fieldName + 'Columns']: col_names,
            [fieldName + 'StringColumns']: col_names_S,
            [fieldName + 'NumberColumns']: col_names_N,
            [fieldName + 'Data']: data,
            tableauSettings: tableauExt.settings.getAll()
          });
        });
      }
      log('getData() state', this.state);
    });
    
    this.unregisterEventFn = sheetObject.addEventListener(
      window.tableau.TableauEventType.FilterChanged,
      this.filterChanged
    );

    // Bug - Adding this event listener causes the viz to continuously re-render. 
    // this.unregisterEventFn = sheetObject.addEventListener(
    //   window.tableau.TableauEventType.MarkSelectionChanged,
    //   this.marksSelected
    // );
  }
  
  clearSheet () {
    log("triggered erase");
    if (TableauSettings.ShouldUse) {
  
      TableauSettings.eraseAndSave([
        'isLoading',
        'configuration',
      ], settings => {
        this.setState({
          tableauSettings: settings,
          configuration: false,
          isSplash: true,
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
          isSplash: true,
        });
      });
    }
  };
  
  clearSplash () {
    this.setState({
      isSplash: false
    });
  };
    
  configure () {
    this.clearSheet();
    const popUpUrl = window.location.href + '#true';
    const popUpOptions = {
      height: 625,
      width: 720,
    };
  
    tableauExt.ui.displayDialogAsync(popUpUrl, "", popUpOptions).then((closePayload) => {
      log('configuring', closePayload, tableauExt.settings.getAll());
      if (closePayload === 'false') {
        this.setState({
          isSplash: false,
          isConfig: false,
          tableauSettings: tableauExt.settings.getAll()
        });
      }
    }).catch((error) => {
      // One expected error condition is when the popup is closed by the user (meaning the user
      // clicks the 'X' in the top right of the dialog).  This can be checked for like so:
      switch(error.errorCode) {
        case window.tableau.ErrorCodes.DialogClosedByUser:
          log("closed by user")
          break;
        default:
          console.error(error.message);
      }
    });
  };  

  componentWillUnmount() {
    let _this = this;
    window.removeEventListener('resize', function() {
      const thisWidth = window.innerWidth;
      const thisHeight = window.innerHeight;
      _this.setState({
        width: thisWidth,
        height: thisHeight
      });
    }, true);
  }

  componentDidMount () {
    const thisHeight = window.innerHeight;
    const thisWidth = window.innerWidth;
    //log("size", thisHeight, thisWidth);
  
    let _this = this;
    window.addEventListener('resize', function() {
      const thisWidth = window.innerWidth;
      const thisHeight = window.innerHeight;
      _this.setState({
        width: thisWidth,
        height: thisHeight
      });
    }, true);

    tableauExt.initializeAsync({'configure': this.configure}).then(() => {
      let unregisterHandlerFunctions = [];
  
    // default tableau settings on initial entry into the extension
    // we know if we haven't done anything yet when tableauSettings state = []
    log("did mount", tableauExt.settings.get("ConfigType"));
    if ( tableauExt.settings.get("ConfigType") === undefined ) {
      log('defaultSettings triggered', defaultSettings.length, defaultSettings);
      defaultSettings.defaultKeys.map((defaultSetting, index) => {
        log('defaultSetting', index, defaultSetting, defaultSettings.defaults[defaultSetting]);
        this.configCallBack(defaultSetting, defaultSettings.defaults[defaultSetting]);
      })
    }

    // this is where the majority of the code is going to go for this extension I think
      log("will mount", tableauExt.settings.getAll());
  
      //get sheetNames and dashboard name from workbook
      const dashboardName = tableauExt.dashboardContent.dashboard.name;
      const sheetNames = tableauExt.dashboardContent.dashboard.worksheets.map(worksheet => worksheet.name);
  
      // Whenever we restore the filters table, remove all save handling functions,
      // since we add them back later in this function.
      // provided by tableau extension samples
      unregisterHandlerFunctions.forEach(function (unregisterHandlerFunction) {
        unregisterHandlerFunction();
      });
  
      //add filter change event listener with callback to re-query data after change
      // go through each worksheet and then add a filter change event listner
      // need to check whether this is being applied more than once
      tableauExt.dashboardContent.dashboard.worksheets.map((worksheet) => {
        log("in sheet loop", worksheet.name, worksheet);
        // add event listner
        let unregisterHandlerFunction = worksheet.addEventListener(
            window.tableau.TableauEventType.FilterChanged,
            this.filterChanged
        );
        // provided by tableau extension samples, may need to push this to state for react
        unregisterHandlerFunctions.push(unregisterHandlerFunction);
        log(unregisterHandlerFunctions);
      });
  
      log('checking field in getAll()', tableauExt.settings.getAll());
  
      // Initialize the current saved settings global
      TableauSettings.init();

      this.setState({
        isLoading: false,
        height: thisHeight,
        width: thisWidth,
        sheetNames: sheetNames,
        dashboardName: dashboardName,
        demoType: tableauExt.settings.get("ConfigType") || "violin",
        tableauSettings: tableauExt.settings.getAll()
      });
  
      if (this.state.tableauSettings.configuration && this.state.tableauSettings.configuration === "true") {
        this.setState({
          isSplash: false,
          isConfig: false,
        });
      }
  
    });
  }
  
  componentWillUpdate(nextProps, nextState) {
    // console log settings to check current status
    log("will update", this.state, nextState, tableauExt.settings.getAll());
  
    //get selectedSheet from Settings
    //hardcoding this for now because I know i have two possibilities
    let selectedSheet = tableauExt.settings.get('ConfigSheet');
    if (selectedSheet && this.state.tableauSettings.ConfigSheet !== nextState.tableauSettings.ConfigSheet) {
      log('calling summary data sheet');
      this.getSummaryData(selectedSheet, "ConfigSheet");
    } //get field3 from Settings
  }

// just logging this for now, may be able to remove later
componentDidUpdate() {
  log('did update', this.state, tableauExt.settings.getAll());
}


render() {
  const { classes } = this.props;

  // create these variables so they are blank if not populated by user
  let configMeasuresObject = {};

  //short cut this cause we use it ALOT
  const tableauSettingsState = this.state.tableauSettings; 

  // log some stuff to see what is going on
  log('in render', this.state.width, this.state.height, this.state.configuration, tableauSettingsState,  this.state);

  //loading screen jsx
  if ( !this.state.isSplash && !this.state.isConfig && (this.state.isLoading || tableauSettingsState.isLoading === "true" || this.state.isMissingData) ) {
  //if (this.state.isLoading || tableauSettingsState.isLoading === "true") {
    return (<LoadingIndicatorComponent msg='Loading' />);
  }

  // config screen jsx
  if (this.state.isConfig) {
    let stepNames = ["Select Graph Type", "Select Sheet", "Drag & Drop Measures", "Customize the Graph"]
    
    log(this.state.stepIndex)

    if (this.state.stepIndex === 1) {
      const type = semioticTypes[this.state.demoType];
      log('configType', semioticTypes[this.state.demoType], tableauSettingsState.ConfigType, or_data);

      const semioticHelp = 
      <div style={{ fontFamily: "arial", fontSize: "small", paddingTop: 20, height: 350*.95, width: 350*.95, float: 'none', margin: '0 auto' }}>
          <ResponsiveOrdinalFrame
            responsiveWidth
            responsiveHeight
            data={or_data}
            axis={{}}
            // rExtent={{
            //   onChange: d => {
            //     this.setState({ rExtent: d })
            //   }
            // }}
            // oExtent={{
            //   onChange: d => {
            //     this.setState({ oExtent: d })
            //   }
            // }}
            projection={'vertical'}
            type={'swarm'}
            summaryType={type}
            summaryStyle={d => {return { fill: d.color, fillOpacity: type === "contour" ? .1 : .35, stroke: d.color, strokeOpacity: 1 }}}
            
            oLabel={true}
            oPadding={20}
            oAccessor={d => d.color}
            rAccessor={'value'}
            
            style={(d, type) => {return { fill: d.color, fillOpacity: type === "contour" ? .6 : .6, stroke: d.color, strokeOpacity: 1 }}}
            hoverAnnotation={true}
            
            margin={{ left: 35, top: 10, bottom: 25, right: 10 }}
          />
        </div>
        ;

      // Placeholder sheet names. TODO: Bind to worksheet data
      return (
        <React.Fragment>
          <Stepper 
            stepIndex={this.state.stepIndex} 
            steps={stepNames}
          />
          <PickType
              title = {"Select a summary data visualization"}
              sheetNames = {["Violin", "Heatmap", "Contour", "Ridgeline", "Histogram", "Boxplot", "Swarm Only"]}
              selectSheet = {this.configCallBack}
              customChange = {this.demoChange}
              field="ConfigType"
              listTitle = "Select a graph type"
              selectedValue={this.state.demoType || ""}
              helpJSX={semioticHelp}
          />
          <StepButtons
            onNextClick={this.onNextStep}
            onPrevClick={this.onPrevStep}
            stepIndex={this.state.stepIndex}
            maxStepCount={stepNames.length}
            nextText={this.state.stepIndex !== stepNames.length ? 'Next' : 'Save'}
            backText="Back"
          />
        </React.Fragment>
      );
    }

    if (this.state.stepIndex === 2) {
      // Placeholder sheet names. TODO: Bind to worksheet data
      return (
        <React.Fragment>
          <Stepper 
            stepIndex={this.state.stepIndex} 
            steps={stepNames}
          />
          <PickSheets
              sheetNames = {this.state.sheetNames}
              configCallBack = {this.configCallBack}
              field={"ConfigSheet"}
              ConfigSheet={tableauSettingsState.ConfigSheet || ""}
          />
          <StepButtons
            onNextClick={this.onNextStep}
            onPrevClick={this.onPrevStep}
            stepIndex={this.state.stepIndex}
            maxStepCount={stepNames.length}
            nextText={this.state.stepIndex !== stepNames.length ? 'Next' : 'Save'}
            backText="Back"
          />
        </React.Fragment>
      );
    }
    
    if (this.state.stepIndex === 3) {
      initialData.columns.measures.measures = this.state.ConfigSheetColumns || [];

      if ( this.state.ConfigSheetColumns ) {
        configMeasuresObject = this.state.ConfigSheetColumns.map((column) => {
          return {id: column, content: column, sheet: 'config'};
        });
      }

      let tmpMeasures = Object.assign({}, initialData, {"measures": configMeasuresObject});

      // Get stored fields
      let selectedFields = {
        ConfigOrdinalField: tableauSettingsState.ConfigOrdinalField,
        ConfigValueField: tableauSettingsState.ConfigValueField,
        ConfigColorField: tableauSettingsState.ConfigColorField,
      }

      // Assign selected fields to tmpMeasures
      Object.keys(selectedFields).forEach(fieldName => {
        if (selectedFields[fieldName]) {
          tmpMeasures.drop_area[fieldName].measureId = selectedFields[fieldName];
        } else if (selectedFields[fieldName] === undefined) {
          tmpMeasures.drop_area[fieldName].measureId = null;
        }
      });

      const requiredFieldTextStyle = {
        border: "2px solid rgba(70, 130, 180, 0.6)", 
        borderRadius: "2px",
        color: "rgba(70, 130, 180, 1)",
        paddingLeft: "6px",
        paddingRight: "6px",
        fontSize: "13px",
        float: "right",
        marginTop: "8px"
      }
      const optionalFieldTextStyle = {
        border: "2px dashed lightgrey", 
        borderRadius: "2px",
        color: "grey",
        paddingLeft: "6px",
        paddingRight: "6px",
        fontSize: "13px",
        float: "right",
        marginRight: "6%",
        marginLeft: "8px",
        marginTop: "8px"
      }

      return (
        <React.Fragment>
          <Stepper 
            stepIndex={this.state.stepIndex} 
            steps={stepNames}
          />
          <DragNDrop
            title={"Drag fields onto the marks shelves to map data to your visualization"}
            initialData={tmpMeasures}
            configCallBack={this.configCallBack}
            eraseCallBack={this.eraseCallBack}
          />
          <span style={optionalFieldTextStyle} className="text--benton-light">*optional</span>
          <span style={requiredFieldTextStyle} className="text--benton-light">*required</span>
        <StepButtons
            onNextClick={this.onNextStep}
            onPrevClick={this.onPrevStep}
            stepIndex={this.state.stepIndex}
            maxStepCount={stepNames.length}
            nextText={this.state.stepIndex !== stepNames.length ? 'Next' : 'Save'}
            backText="Back"
          />
        </React.Fragment>
      ); 
    }

    if (this.state.stepIndex === 4) {
      return (
        <React.Fragment>
          <Stepper 
            stepIndex={this.state.stepIndex} 
            steps={stepNames}
          />
          <CustomizeViolin
            handleChange={this.handleChange}
            customCallBack={this.customCallBack}
            field={'configuration'}
            tableauSettings={tableauSettingsState}
          />
          <StepButtons
            onNextClick={this.onNextStep}
            onPrevClick={this.onPrevStep}
            stepIndex={this.state.stepIndex}
            maxStepCount={stepNames.length}
            nextText={this.state.stepIndex !== stepNames.length ? 'Next' : 'Save'}
            backText="Back"
          />
        </React.Fragment>
      ); 
    }
  }

  // splash screen jsx
  if (this.state.isSplash) {
    return (
      <div className="splashScreen" style={{padding : 5 }}>
        <SplashScreen 
          configure={this.configure} 
          title="Semiotic Swarm and Summary Charts in Tableau"
          desc="Leverage the brilliance of Semiotic's ordinal swarm and summary chart library, directly within Tableau!"
          ctaText="Configure"
          poweredBy={
            <React.Fragment>
              <p className="info">Brought to you by: </p>
              <a href="http://www.datablick.com/" target="_blank"><img src={dbLogo} /></a> <a href="https://starschema.com/" target="_blank"><img src={ssLogo} /></a>
              <p className="info">Powered by: </p>
              <a href="https://emeeks.github.io/semiotic/#/" target="_blank"><img src={semLogo} /></a>
          </React.Fragment>
        }
        />
      </div>
    );
  }

  // configuration for hover annotation
  let hoverJSXProps = {};
  if ( tableauSettingsState.hoverAnnotation === "hoverAnnotation" ) {
    hoverJSXProps = {
      hoverAnnotation: true, 
      summaryHoverAnnotation: false,
      pieceHoverAnnotation: false,
    };
  } else if ( tableauSettingsState.hoverAnnotation === "summaryHoverAnnotation" ) {
    hoverJSXProps = {
      hoverAnnotation: false, 
      summaryHoverAnnotation: true,
      pieceHoverAnnotation: false,
    };
  } else if ( tableauSettingsState.hoverAnnotation === "pieceHoverAnnotation" ) {
    hoverJSXProps = {
      hoverAnnotation: false, 
      summaryHoverAnnotation: false,
      pieceHoverAnnotation: true,
    };
  } else {
    hoverJSXProps = {
      hoverAnnotation: false, 
      summaryHoverAnnotation: false,
      pieceHoverAnnotation: false,
    };
  }


  // left off here config should be good, now we need to get component working from new config
  return (
      <SemioticViolin
        className={'semiotic-network-chart'}
        width={this.state.width * .925}
        height={this.state.height * .925}
        data={this.state.ConfigSheetData}
        tableauSettings={tableauSettingsState}

        networkProjection={tableauSettingsState.networkProjection}

        // color props
        nodeColorConfig={tableauSettingsState.nodeColorConfig}
        nodeFillColor={tableauSettingsState.nodeColor}

        //point props
        showPoints={tableauSettingsState.showPoints}
        nodeRender={tableauSettingsState.nodeRender}
        nodeFillOpacity={tableauSettingsState.nodeFillOpacity || .35}
        nodeStrokeColor={tableauSettingsState.nodeColor}
        nodeStrokeOpacity={tableauSettingsState.nodeStrokeOpacity || .5}
        nodeSize={tableauSettingsState.nodeSize}

        //summary props
        summaryType={semioticTypes[tableauSettingsState.ConfigType]}
        sumCurve={d3Curves[tableauSettingsState.sumCurve]}
        sumRender={tableauSettingsState.sumRender}
        sumFillOpacity={tableauSettingsState.sumFillOpacity || .35}
        sumStrokeOpacity={tableauSettingsState.sumStrokeOpacity || .5}

      //interactivity props
        highlightOn={this.state.highlightOn}
        // hoverAnnotation={tableauSettingsState.hoverAnnotation === "true"}
        {...hoverJSXProps}
        clickCallBack={this.clickCallBack}
        hoverCallBack={this.hoverCallBack}
      />
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
