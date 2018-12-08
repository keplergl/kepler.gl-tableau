import React from 'react';
import PropTypes from 'prop-types';

//semiotic
import { ResponsiveOrdinalFrame } from 'semiotic';

//d3
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Interpolate from "d3-interpolate"

//lodash
import _ from 'lodash';

import { 
    DataBlick
  } from '../../variables';
  
//material ui
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Minimum and maximum fallback sizes for markers
const MIN_MARKER_RADIUS = 1;
const MAX_MARKER_RADIUS = 25;

// hierarchyDataPreped
// (the original code contained a bug which would result
// in worldDataMissing always being an empty array)
function buildSwarmData(swarmData, ConfigOrdinalField, ConfigColorField, ConfigValueField) {
    //now that we are in here we can rename fields as we need to in order avoid errors
    _.forEach(swarmData, (a) => {
        a['ConfigOrdinalField'] = ConfigOrdinalField;
        a['ConfigColorField'] = ConfigColorField;
        a['ConfigValueField'] = ConfigValueField;

        if (ConfigOrdinalField !== "ordinal") {
            a['ordinal'] = a[ConfigOrdinalField];
            delete a[ConfigOrdinalField];    
        }

        if (ConfigColorField !== "color") {
            a['color'] = a[ConfigColorField];
            delete a[ConfigColorField];
        }
        
        if (ConfigValueField !== "value") {
            a['value'] = a[ConfigValueField];
            delete a[ConfigValueField];
        }
    });
    return swarmData;
}

function buildSwarmSizeScale(swarmData, markerMinRadius, markerMaxRadius) {
    // console.log('build node size', nodeData, markerMinRadius, markerMaxRadius);
    if (!swarmData) {
      return () => {};
    }
    function remapper(d) {
      return parseFloat(d["value"] || 0) || 0;
    }
    return d3Scale.scaleSqrt()
      .domain(d3Array.extent(swarmData, remapper))
      .range([
        markerMinRadius*1 || MIN_MARKER_RADIUS*1,
        markerMaxRadius*1 || MAX_MARKER_RADIUS*1,
      ]);
}

function buildSwarmColorScale(swarmData, swarmColor) {
    if (!swarmData) {
      return () => {};
    }
    function remapper(d) {
      return parseFloat(d["value"] || 0) || 0;
    }
    return d3Scale.scaleLinear()
      .domain(d3Array.extent(swarmData, remapper))
      .range(_.split(swarmColor,','))
    ;
}

// Create a memoized version of each call which will (hopefully) cache the calls.
// NOTE: passing the whole "props" to these functions will make them sub-optimal as
// the memoize depends on passing an equal object to get the cached result.
let memoized = {
    buildSwarmData: _.memoize(buildSwarmData),
    buildSwarmSizeScale: _.memoize(buildSwarmSizeScale),
    buildSwarmColorScale: _.memoize(buildSwarmColorScale),
};

class SemioticViolin extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        swarmData: undefined,
        swarmSizeScale: undefined,
        swarmColorScale: undefined
      }  
    }
    preprocessData() {
        const {
            data,
            tableauSettings,
        } = this.props;

        let swarmData = memoized.buildSwarmData(
            data, 
            tableauSettings.ConfigOrdinalField,
            tableauSettings.ConfigColorField,
            tableauSettings.ConfigValueField,
        );

        let swarmSizeScale = memoized.buildSwarmSizeScale(swarmData, tableauSettings.markerMinRadius, tableauSettings.markerMaxRadius);
        let swarmColorScale = memoized.buildSwarmColorScale(swarmData, tableauSettings.nodeFillColor);

        return ({
            swarmData: swarmData, 
            swarmSizeScale: swarmSizeScale, 
            swarmColorScale: swarmColorScale,
        });
    }

    componentDidMount() {
        console.log('in semiotic component mount', this.props.data);
    }
  
    render() {
        console.log('semitoic component', this.props);
        const {
            height,
            width,
            data,
            networkProjection, 

            showPoints,
            nodeSize,
            nodeRender,
            nodeColorConfig,
            nodeFillColor, 
            nodeFillOpacity, 
            nodeStrokeOpacity,

            summaryType,
            sumRender,
            sumCurve,
            sumFillOpacity,
            sumStrokeOpacity,
    
            highlightOn,
            hoverAnnotation,
            summaryHoverAnnotation, 
            pieceHoverAnnotation,
            tableauSettings,        
        } = this.props;

        // pull in memoized stuff for use in render function
        let {
            swarmData, 
            swarmSizeScale, 
            swarmColorScale,
        } = this.preprocessData();

        console.log('swarm Data in sub component', data, swarmData); //, JSON.stringify(data));

        // need to see if we can enable both summary and point hover on this
        // coding for summary only below
        const popOver = (d) => {
            console.log('in tooltip', d, hoverAnnotation, pieceHoverAnnotation, summaryHoverAnnotation);
            if ( hoverAnnotation ) {
                return (
                    <Paper style={{'padding': '5px'}}>
                        <Typography> {tableauSettings.ConfigOrdinalField}: {d.column.name} </Typography>
                        <Typography> Middle of {tableauSettings.ConfigValueField}: {d.column.middle} </Typography>
                        <Typography> Data points: {d.column.pieces.length} </Typography>
                    </Paper>
                );
            } else if ( summaryHoverAnnotation ){
                return (
                    <Paper style={{'padding': '5px'}}>
                        <Typography> {tableauSettings.ConfigOrdinalField}: {d.key || ""} </Typography>
                        <Typography> Data Points: {d.value || ""} </Typography>
                        <Typography> Data Point Average: {d.pieces ? _.sumBy(d.pieces, (o) => o.value) / d.pieces.length : "N/A" || ""} </Typography>
                        <Typography> {tableauSettings.ConfigColorField}: {d.pieces ? d.pieces[0] ? d.pieces[0].data.color : "" : "" || ""} </Typography>
                        {/* <Typography> Data points: {d.column.pieces.length} </Typography> */}
                    </Paper>
                );
            } else if ( pieceHoverAnnotation ){
                return (
                    <Paper style={{'padding': '5px'}}>
                        <Typography> {tableauSettings.ConfigOrdinalField}: {d.ordinal || ""} </Typography>
                        <Typography> {tableauSettings.ConfigColorField}: {d.color || ""} </Typography>
                        <Typography> {tableauSettings.ConfigValueField}: {d.value || ""} </Typography>
                        {/* <Typography> Data points: {d.column.pieces.length} </Typography> */}
                    </Paper>
                );
            }
        }

        // we have an issue with color from tableau, the manipulated data doesn't carry the bound data forward. 
        // wonder if using nodes in addition to edges can help solve this. 
        // it should be assign color to node and pick either source or target color
        // or value basis, or solid color
        console.log('semiotic call', swarmData, data, tableauSettings);
        if ( !swarmData ) {
            return null;
        } else {
            return (
                <div className="semiotic-swarm" style={{ padding: '1%', height: height, width: width, float: 'none', margin: '0 auto' }}>
                    <ResponsiveOrdinalFrame
                        //sizing 
                        responsiveHeight
                        responsiveWidth
                        margin={{ left: 50, bottom: 50, right: 10, top: 10 }}

                        // data
                        data={swarmData}

                        // projection
                        projection={networkProjection}

                        // accessors
                        oAccessor={d => d.ordinal}
                        rAccessor={d => d.value}

                        // labels
                        oLabel={true}

                        // axis
                        axis={d => ({ orient: networkProjection === "vertical" ? "left" : networkProjection === "horiztonal" ? "bottom" : "", label: d.ConfigValueField })}

                        // point props
                        type={ showPoints ? "swarm" : "bar"}
                        renderMode={nodeRender}
                        style={d => {return { 
                            fill: d.color, 
                            fillOpacity: nodeFillOpacity || .25, 
                            stroke: d.color, 
                            strokeOpacity: nodeStrokeOpacity || 1,
                        }}}
                        // nodeSize={nodeSize}
                
                        // summary props
                        summaryType={{ type: summaryType, curve: sumCurve }}
                        summaryRenderMode={sumRender}
                        summaryStyle={d => {return { 
                            fill: d.color, 
                            fillOpacity: sumFillOpacity || .25, 
                            stroke: d.color, 
                            strokeOpacity: sumStrokeOpacity || 1,
                        }}}
                
                        // interactivity
                        hoverAnnotation={hoverAnnotation}
                        summaryHoverAnnotation={summaryHoverAnnotation}
                        pieceHoverAnnotation={pieceHoverAnnotation}
                        pieceHoverAnnotation={pieceHoverAnnotation}
                        tooltipContent={d => popOver(d)}
                        customClickBehavior={(d) => this.props.clickCallBack(d)}
                        customHoverBehavior={(d) => this.props.hoverCallBack(d)}
                    />
                </div>
            );
        }
    }
}

// SemioticViolin.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
  
export default SemioticViolin;
  