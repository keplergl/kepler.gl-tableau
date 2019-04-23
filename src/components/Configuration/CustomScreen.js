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

import { InputLabelWithTooltip, OptionWrapper, OptionTitle } from './CustomizeUIElements';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    display: 'inherit',
  },
});

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
            <OptionTitle style={{paddingLeft: "8px"}}>{this.props.configTitle}</OptionTitle>
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                title="Mapbox API Key"
                tooltipText="Your unique API key for utilizing mapbox"
              />
              <TextField
                // className={classes.textField}
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
            <FormControl className={classes.formControl}>
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
                    tooltipText="Select which field to take action on"
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
                    tooltipText="Select which field to take action on"
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
            <FormControl className={classes.formControl}>
              <InputLabelWithTooltip
                    title="Tableau to Kepler Filter Field"
                    tooltipText="Select which field to use when filtering Kepler"
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
