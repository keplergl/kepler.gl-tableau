import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { OptionColumn } from './CustomizeUIElements';
import RadioButtonsGroup from './SheetsRadio';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
      flexGrow: 1
    }
  };
  
const PickType = (props) => (
    <React.Fragment>
    <div class="content-container">
      <h4 style={{color: "#BDBDBD"}}>{props.title}</h4>
      <div className="clearfix">
        <OptionColumn className="grid--4">
            <div className="SheetPicker" >
                <RadioButtonsGroup
                  sheets={props.sheetNames}
                  title={props.listTitle}
                  helperText={props.helperText}
                  sheetCallBack={props.selectSheet}
                  customChange={props.customChange}
                  field={props.field}
                  selectedValue={props.selectedValue || ""}
                />
            </div>
        </OptionColumn>
        <OptionColumn className="grid--8">
            {props.helpJSX || <Typography variant="subheading" align="center" > Placeholder for help info </Typography>}
        </OptionColumn>
      </div>
    </div>
  </React.Fragment>
);

export default  withStyles(styles)(PickType);