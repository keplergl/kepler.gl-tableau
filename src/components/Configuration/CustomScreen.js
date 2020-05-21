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
import PropTypes from 'prop-types';
import classNames from 'classnames';

//material ui
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


//tableau ui
import { TextField } from '@tableau/tableau-ui';

import { InputLabelWithTooltip, OptionWrapper, OptionTitle, SectionTitle } from './CustomizeUIElements';
import styled from 'styled-components';
import '../../styles/ConfigScreen.css';

const styles = theme => ({
  formControl: {
    fontSize: '12px',
    minWidth: 120,
    display: 'inherit'
  }
});

const Grid6 = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom:16px;

  & > div {
    width: 200px;
    margin-right: 16px;
  }

  & > div > div:nth-child(2) {
    border: 1px solid #ccc;

    & > div {
      padding-left: 8px;
    }
  }
`;

const Grid12 = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom:8px;

  & > div {
    width: 416px;
    margin-right: 16px;
  }
`;

// the example on material ui has this function statement
class CustomScreen extends React.Component {
  constructor (props) {
    super(props);
  }

  // for call back to work with field included
  handleClick = event => {
    console.log('handleClick', this.props);
    // update this if to include the minimum required fields
    // if (this.props.tableauSettings.ChoroFillScale && this.props.tableauSettings.ChoroFillScaleColors) {
      this.props.customCallBack(this.props.field)
    // }
  }

  render() {
    const {
      classes,
      theme,
      sheetNames,
      height,
      configTitle,
      listTitle,
      customCallBack,
      handleChange,
      colors,
      colorHex,
      color,
      edgeType,
      edgeRender,
      nodeRender,
      edgeColor,
      padAngle,
      hoverAnnotation,
      tableauSettings,
      configSheetColumns } = this.props;

    console.log('we are in custom', this.props);
    return (
      <div className="sheetScreen">
        <OptionWrapper>
          <div class="content-container">
            <OptionTitle>{this.props.configTitle}</OptionTitle>
            <SectionTitle>Visual</SectionTitle>
            <Grid6>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabelWithTooltip
                      title="Read only mode?"
                      tooltipText="Toggle whether or not to hide the config panel on the side (e.g., read only)"
                    />
                <Select
                  value={tableauSettings.readOnly === "true"}
                  onChange={handleChange}
                  input={<Input name="readOnly" id="readOnly-helper" />}
                >
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabelWithTooltip
                      title="Color Theme"
                      tooltipText="Select a dark or light kepler.gl UI theme"
                    />
                <Select
                  value={tableauSettings.theme || 'dark'}
                  onChange={handleChange}
                  input={<Input name="theme" id="theme-helper" />}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                </Select>
              </FormControl>
            </Grid6>
            <SectionTitle>Events</SectionTitle>
            <Grid6>
              <FormControl className={classes.formControl}>
                <InputLabelWithTooltip
                      title="Hover Action"
                      tooltipText="Toggle and select which action to take on hover"
                    />
                <Select
                  value={tableauSettings.hoverAction || "No Action"}
                  onChange={handleChange}
                  input={<Input name="hoverAction" id="hoverAction-helper" />}
                >
                  <MenuItem value={"No Action"}>No Action</MenuItem>
                  <MenuItem value={"Highlight"}>Highlight</MenuItem>
                  <MenuItem value={"Filter"}>Filter</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabelWithTooltip
                      title="Hover Identifying Field"
                      tooltipText="Select which STRING field to take action on (we require string for interaction)"
                    />
                <Select
                  value={tableauSettings.hoverField || "None"}
                  onChange={handleChange}
                  input={<Input name="hoverField" id="hoverField-helper" />}
                >
                  <MenuItem value={"None"}>None</MenuItem>
                  {
                    configSheetColumns.map(f => (
                      <MenuItem value={f.fieldName} key={f.fieldName}>{f.fieldName}</MenuItem>
                    ))
                  };
                </Select>
              </FormControl>
            </Grid6>
            <Grid6>
              <FormControl className={classes.formControl}>
                <InputLabelWithTooltip
                      title="Click Action"
                      tooltipText="Toggle and select which action to take on click"
                    />
                <Select
                  value={tableauSettings.clickAction || "No Action"}
                  onChange={handleChange}
                  input={<Input name="clickAction" id="clickAction-helper" />}
                >
                  <MenuItem value={"No Action"}>No Action</MenuItem>
                  <MenuItem value={"Highlight"}>Highlight</MenuItem>
                  <MenuItem value={"Filter"}>Filter</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabelWithTooltip
                      title="Click Identifying Field"
                      tooltipText="Select which STRING field to take action on (we require string for interaction)"
                    />
                <Select
                  value={tableauSettings.clickField || "None"}
                  onChange={handleChange}
                  input={<Input name="clickField" id="clickField-helper" />}
                >
                  <MenuItem value={"None"}>None</MenuItem>
                  {
                    configSheetColumns.map(f => (
                      <MenuItem value={f.fieldName} key={f.fieldName}>{f.fieldName}</MenuItem>
                    ))
                  };
                </Select>
              </FormControl>
            </Grid6>
            <Grid6>
              <FormControl className={classes.formControl}>
                <InputLabelWithTooltip
                      title="Tableau to Kepler Filter Field"
                      tooltipText="Select which STRING field to use when filtering Kepler (we require string for interaction)"
                    />
                <Select
                  value={tableauSettings.keplerFilterField || "None"}
                  onChange={handleChange}
                  input={<Input name="keplerFilterField" id="keplerFilterField-helper" />}
                >
                  <MenuItem value={"None"}>None</MenuItem>
                  {
                    configSheetColumns
                    .filter(col => col.dataType !== 'date-time')
                    .map(f => (
                      <MenuItem value={f.fieldName} key={f.fieldName}>{f.fieldName}</MenuItem>
                    ))
                  };
                </Select>
              </FormControl>
            </Grid6>
            <SectionTitle>Optional</SectionTitle>
            <Grid12>
              <FormControl className={classes.formControl}>
                <InputLabelWithTooltip
                  title="Mapbox API Key"
                  tooltipText="Optional: Your unique API key for utilizing mapbox"
                />
                <TextField
                  className="bordered"
                  id="mapboxAPIKey-helper"
                  kind="line"
                  name="mapboxAPIKey"
                  // label="Mapbox API Key"
                  placeholder="pk.12345..."
                  value={tableauSettings.mapboxAPIKey}
                  onChange={handleChange}
                  // margin="normal"
                />
              </FormControl>
            </Grid12>
            {/* <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                  title="Hover Configuration"
                  tooltipText="Toggle whether to show the tooltip, and at which level"
              />
              <Select
                value={tableauSettings.hoverAnnotation}
                onChange={handleChange}
                input={<Input name="hoverAnnotation" id="hoverAnnotation-helper" />}
              >
                 <MenuItem value={"none"}>No Annotation</MenuItem>
                 <MenuItem value={"hoverAnnotation"}>Hover Annotation</MenuItem>
                 <MenuItem value={"pieceHoverAnnotation"}>Piece Hover Annotation</MenuItem>
                 <MenuItem value={"summaryHoverAnnotation"}>Summary Hover Annotation</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                  title="Show Highlight"
                  tooltipText="Toggle whether to highlight based on Tableau selections"
              />
              <Select
                value={tableauSettings.highlightAnnotation === "true"}
                onChange={handleChange}
                input={<Input name="highlightAnnotation" id="highlightAnnotation-helper" />}
              >
                 <MenuItem value={false}>False</MenuItem>
                 <MenuItem value={true}>True</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                  title="Show Points?"
                  tooltipText="Toggle whether to show points/swarm"
              />
              <Select
                value={tableauSettings.showPoints === "true"}
                onChange={handleChange}
                input={<Input name="showPoints" id="showPoints-helper" />}
              >
                 <MenuItem value={false}>False</MenuItem>
                 <MenuItem value={true}>True</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                    title="Color Config"
                    tooltipText="The way color will be applied to the chart"
              />
              <Select
                value={tableauSettings.nodeColorConfig || "solid"}
                onChange={handleChange}
                input={<Input name="nodeColorConfig" id="nodeColorConfig-helper" />}
              >
                 <MenuItem value={"solid"}>Single Color</MenuItem>
                 <MenuItem value={"scale"}>Color Scale</MenuItem>
                 <MenuItem value={"field"}>Color Field</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                title="Color"
                tooltipText="For single, enter 1 hex code for scale enter two, e.g., #ccc,#ddd"
              />
              <TextField
                id="nodeColor-helper"
                name="nodeColor"
                label="Node Fill Color(s)"
                placeholder="#CCCCCC or #CCCCCC,#DDDDDD"
                className={classes.textField}
                value={tableauSettings.nodeColor}
                onChange={handleChange}
                margin="normal"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                title="Point Render Type"
                tooltipText="Select from Semoitic's Render Modes"
              />
              <Select
                value={tableauSettings.nodeRender || "normal"}
                onChange={handleChange}
                input={<Input name="nodeRender" id="nodeRender-helper" />}
              >
                 <MenuItem value={"normal"}>Normal</MenuItem>
                 <MenuItem value={"sketchy"}>Sketchy</MenuItem>
                 <MenuItem value={"painty"}>Painty</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                title="Point Fill Opacity"
                tooltipText="A decimal from 0 to 1 that will control point opacity"
              />
              <TextField
                id="nodeFillOpacity-helper"
                name="nodeFillOpacity"
                label="Point Fill Opacity"
                placeholder=".35"
                className={classes.textField}
                value={tableauSettings.nodeFillOpacity}
                onChange={handleChange}
                margin="normal"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                title="Point Stroke Opacity"
                tooltipText="A decimal from 0 to 1 that will control point stroke opacity"
              />
              <TextField
                id="nodeStrokeOpacity-helper"
                name="nodeStrokeOpacity"
                label="Point Stroke Opacity"
                placeholder=".5"
                className={classes.textField}
                value={tableauSettings.nodeStrokeOpacity}
                onChange={handleChange}
                margin="normal"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                  title="Point Size"
                  tooltipText="Toggle point size from value field"
              />
              <Select
                value={tableauSettings.nodeSize || "none"}
                onChange={handleChange}
                input={<Input name="nodeSize" id="nodeSize-helper" />}
              >
                 <MenuItem value={"none"}>None</MenuItem>
                 <MenuItem value={"value"}>Value</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                title="Minimum Point Size"
                tooltipText="Minimum radius for points (e.g., 1)"
              />
              <TextField
                id="markerMinRadius-helper"
                name="markerMinRadius"
                label="Minimum Radius for Markers"
                placeholder="1"
                className={classes.textField}
                value={tableauSettings.markerMinRadius}
                onChange={handleChange}
                margin="normal"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                title="Maximum Point Size"
                tooltipText="Maximum radius for points (e.g., 10)"
              />
              <TextField
                id="markerMaxRadius-helper"
                name="markerMaxRadius"
                label="Maximum Radius for Markers"
                placeholder="25"
                className={classes.textField}
                value={tableauSettings.markerMaxRadius}
                onChange={handleChange}
                margin="normal"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                title="Summary Render Type"
                tooltipText="Select from Semoitic's Render Modes"
              />
              <Select
                value={tableauSettings.sumRender || "normal"}
                onChange={handleChange}
                input={<Input name="sumRender" id="sumRender-helper" />}
              >
                 <MenuItem value={"normal"}>Normal</MenuItem>
                 <MenuItem value={"sketchy"}>Sketchy</MenuItem>
                 <MenuItem value={"painty"}>Painty</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                title="Summary Curve Type"
                tooltipText="Select from d3-shape curve types"
              />
              <Select
                value={tableauSettings.sumCurve || "curveCatmullRom"}
                onChange={handleChange}
                input={<Input name="sumCurve" id="sumCurve-helper" />}
              >
                 <MenuItem value={"curveCatmullRom"}>CatmullRom</MenuItem>
                 <MenuItem value={"curveBasis"}>Basis</MenuItem>
                 <MenuItem value={"curveCardinal"}>Cardinal</MenuItem>
                 <MenuItem value={"curveLinear"}>Linear</MenuItem>
                 <MenuItem value={"curveMonotoneX"}>MonotoneX</MenuItem>
                 <MenuItem value={"curveMonotoneY"}>MonotoneY</MenuItem>
                 <MenuItem value={"curveNatural"}>Natural</MenuItem>
                 <MenuItem value={"curveStep"}>Step</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                title="Summary Fill Opacity"
                tooltipText="A decimal from 0 to 1 that will control summary opacity"
              />
              <TextField
                id="sumFillOpacity-helper"
                name="sumFillOpacity"
                label="Summary Fill Opacity"
                placeholder=".35"
                className={classes.textField}
                value={tableauSettings.sumFillOpacity}
                onChange={handleChange}
                margin="normal"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                title="Summary Stroke Opacity"
                tooltipText="A decimal from 0 to 1 that will control summary stroke opacity"
              />
              <TextField
                id="sumStrokeOpacity-helper"
                name="sumStrokeOpacity"
                label="Summary Stroke Opacity"
                placeholder=".5"
                className={classes.textField}
                value={tableauSettings.sumStrokeOpacity}
                onChange={handleChange}
                margin="normal"
              />
            </FormControl> */}
          </div>
        </OptionWrapper>
      </div>
      );
    }
}

CustomScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomScreen);
