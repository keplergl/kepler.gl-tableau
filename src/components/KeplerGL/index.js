import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {log} from '../../utils';

// kepler example wrapper
import App from './app';
import {addDataToMap} from 'kepler.gl/actions';

//material ui
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

class KeplerGlComponent extends React.Component {
  componentDidMount() {
    log(
      '%c =======KeplerGL.componentDidMount',
      'background: #222; color: #bada55'
    );
    log(this.props.data);
    if (this.props.data) {
      this.onDataChange(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data === this.props.data) {
      log('data is the same', nextProps.data);
    } else if (!nextProps.isLoading && this.props.isLoading && nextProps.data) {
      log(
        '%c KeplerGL.componentWillReceiveProps data changed',
        'background: Aqua; color:red',
        nextProps.data
      );
      log(
        `%c this.props.isLoading = ${this.props.isLoading}`,
        `background: ${this.props.isLoading ? 'red' : 'green'}; color: black`
      );
      log(
        `%c nextProps.isLoading = ${nextProps.isLoading}`,
        `background: ${nextProps.isLoading ? 'red' : 'green'}; color: black`
      );

      this.onDataChange(nextProps);
    }
  }

  onDataChange({data, keplerConfig, readOnly}) {
    // Create dataset structure
    log('%c Calling addDataToMap', 'background: green; color:white');

    const datasets = {
      data,
      info: {
        // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
        // It is paramount that this id matches your configuration otherwise the configuration file will be ignored.
        id: 'my_data'
      }
    };

    this.props.dispatch(
      addDataToMap({
        datasets,
        options: {readOnly},
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
      mapboxAPIKey
    } = this.props;

    if (!data) {
      log('%c data is missing', 'background: red; color: white');
    }

    return (
      <App
        height={height}
        width={width}
        data={data}
        readOnly={readOnly}
        keplerConfig={keplerConfig}
        mapboxAPIKey={mapboxAPIKey}
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
