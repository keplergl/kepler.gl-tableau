import React from 'react';
import PropTypes from 'prop-types';

// kepler example wrapper
import {Provider} from 'react-redux';
import store from './store';
import App from './app';
// import './styles/superfine.css';

//lodash
import _ from 'lodash';
  
//material ui
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// hierarchyDataPreped
// (the original code contained a bug which would result
// in worldDataMissing always being an empty array)
function buildKeplerData(keplerData) {
    //now that we are in here we can rename fields as we need to in order avoid errors

    return keplerData;
}

// Create a memoized version of each call which will (hopefully) cache the calls.
// NOTE: passing the whole "props" to these functions will make them sub-optimal as
// the memoize depends on passing an equal object to get the cached result.
let memoized = {
    buildKeplerData: _.memoize(buildKeplerData),
};

class KeplerGlComponent extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        keplerData: undefined,
      }  
    }
    preprocessData() {
        const {
            data,
            tableauSettings,
        } = this.props;

        let keplerData = memoized.buildKeplerData(data);

        return ({
            keplerData: keplerData
        });
    }

    componentDidMount() {
        console.log('in kepler component mount', this.props.data);
    }
  
    render() {
        console.log('kepler component render', this.props);
        const {
            height,
            width,
            data,
            tableauSettings,
            readOnly, 
            keplerConfig
        } = this.props;

        // pull in memoized stuff for use in render function
        let {
            keplerData, 
        } = this.preprocessData();

        console.log('kepler Data in sub component', data, keplerData); //, JSON.stringify(data));

        // need to see if we can enable both summary and point hover on this
        // coding for summary only below
        const popOver = (d) => {
            console.log('in tooltip', d);
            return (
                <Paper style={{'padding': '5px'}}>
                    <Typography> Placeholder tooltip </Typography>
                </Paper>
            );
        }

        console.log('kepler call', keplerData, data, tableauSettings);
        if ( !keplerData ) {
            return null;
        } else {
            return (
                // <div className="kepler-gl" style={{ padding: '1%', height: height, width: width, float: 'none', margin: '0 auto' }}>
                    <Provider store={store}>
                        <App 
                            height={height}
                            width={width}
                            data={keplerData}
                            readOnly={readOnly}
                            keplerConfig={keplerConfig}

                            configCallBack={this.props.configCallBack}

                            tooltipContent={d => popOver(d)}
                            customClickBehavior={(d) => this.props.clickCallBack(d)}
                            customHoverBehavior={(d) => this.props.hoverCallBack(d)}
                        />
                    </Provider>
                // </div>
            );
        }
    }
}

// KeplerGlComponent.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
  
export default KeplerGlComponent;
  