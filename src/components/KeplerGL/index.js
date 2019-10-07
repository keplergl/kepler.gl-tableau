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

import React from 'react';
import {connect} from 'react-redux';
import {log} from '../../utils';
import {DATA_ID} from '../../constants';

// kepler example wrapper
import App from './app';
import {addDataToMap} from 'kepler.gl/actions';

class KeplerGlComponent extends React.Component {
  componentDidMount() {
    if (this.props.data) {
      this.onDataChange(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
   if (nextProps.data !== this.props.data && !nextProps.isLoading && this.props.isLoading && nextProps.data) {
      this.onDataChange(nextProps);
    }
  }

  onDataChange({data, keplerConfig, readOnly, selectedSheet}) {
    // Create dataset structure
    log('%c Calling addDataToMap', 'background: green; color:white');
    // log('%c with config', 'background: grey', keplerConfig ? JSON.parse(keplerConfig) : undefined);
    const datasets = {
      data,
      info: {
        // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
        // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
        id: DATA_ID,
        label: selectedSheet
      }
    };

    this.props.dispatch(
      addDataToMap({
        datasets,
        options: {readOnly, centerMap: true},
        config: keplerConfig ? JSON.parse(keplerConfig) : undefined
      })
    );
  }

  render() {
    const {
      height,
      width,
      data,
      readOnly,
      keplerConfig,
      mapboxAPIKey,
      theme
    } = this.props;

    return (
      <App
        height={height}
        width={width}
        data={data}
        readOnly={readOnly}
        keplerConfig={keplerConfig}
        mapboxAPIKey={mapboxAPIKey}
        theme={theme}
        configCallBack={this.props.configCallBack}
        customClickBehavior={this.props.clickCallBack}
        customHoverBehavior={this.props.hoverCallBack}
      />
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(
  mapStateToProps,
  dispatchToProps
)(KeplerGlComponent);
