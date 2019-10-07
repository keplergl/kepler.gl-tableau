// Copyright (c) 2019 Uber Technologies, Inc.
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