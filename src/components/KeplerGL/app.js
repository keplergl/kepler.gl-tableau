// Copyright (c) 2018 Uber Technologies, Inc.
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

import React, {Component} from 'react';
import {connect} from 'react-redux';
import KeplerGl from 'kepler.gl';

// Kepler.gl actions
import {addDataToMap} from 'kepler.gl/actions';
import Processors from 'kepler.gl/processors';

// Kepler.gl Schema APIs
import KeplerGlSchema from 'kepler.gl/schemas';

// Component and helpers
import Button from './button';
import downloadJsonFile from "./file-download";

// Sample data
import nycTrips from './data/nyc-trips.csv.js';
// import keplerConfig from './data/kepler-config';

class App extends Component {
  componentDidMount() {
    // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
    // const data1 = Processors.processCsvData(nycTrips);
    const data = this.props.data;
    console.log('checking data on mount', data, this.props);
    // Create dataset structure
    const dataset = {
      data,
      info: {
        // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
        // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
        id: 'my_data'
      }
    };
    // addDataToMap action to inject dataset into kepler.gl instance
    // this.props.dispatch(addDataToMap({datasets: dataset, config: keplerConfig}));
    this.props.dispatch(addDataToMap({
      datasets: dataset,
      options: {readOnly: this.props.readOnly},
      config: this.props.keplerConfig ? JSON.parse(this.props.keplerConfig) : undefined}));
  }

  // this method is used to persist state into tableau settings
  setKeplerConfig = () => {
    const map = this.getMapConfig();

    console.log('saving the kepler gl settings', map);
    this.props.configCallBack('keplerConfig', map);
  }


  // This method is used as reference to show how to export the current kepler.gl instance configuration
  // Once exported the configuration can be imported using parseSavedConfig or load method from KeplerGlSchema
  getMapConfig() {
    // retrieve kepler.gl store
    const {keplerGl} = this.props;
    // retrieve current kepler.gl instance store
    const {map} = keplerGl;

    // create the config object
    return KeplerGlSchema.getConfigToSave(map);
  }

  // This method is used as reference to show how to export the current kepler.gl instance configuration
  // Once exported the configuration can be imported using parseSavedConfig or load method from KeplerGlSchema
  exportMapConfig = () => {
    // create the config object
    const mapConfig = this.getMapConfig();
    // save it as a json file
    downloadJsonFile(mapConfig, 'kepler.gl.json');
  };

  // Created to show how to replace dataset with new data and keeping the same configuration
  replaceData = () => {
  // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
    const data = this.props.data;
    // Create dataset structure
    const dataset = {
      data,
      info: {
        // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
        // It is paramount that this id mathces your configuration otherwise the configuration file will be ignored.
        id: 'my_data'
      }
    };

    // read the current configuration
    const config = this.getMapConfig();

    // addDataToMap action to inject dataset into kepler.gl instance
    this.props.dispatch(addDataToMap({datasets: dataset, options: {readOnly: this.props.readOnly}, config: this.props.keplerConfig ? JSON.parse(this.props.keplerConfig) : config}));
  };

  render() {
    let buttonJSX;
    if (!this.props.readOnly) {
      buttonJSX = <Button onClick={this.setKeplerConfig}>Save Config</Button>
    }

    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', minHeight: '70vh'}}>
          {buttonJSX}
          <KeplerGl
            mapboxApiAccessToken={this.props.mapboxAPIKey}
            id="map"
            width={this.props.width}
            height={this.props.height}
          />
      </div>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(App);
// export default App;
