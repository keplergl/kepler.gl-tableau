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
import PropTypes from 'prop-types';

//material ui
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

//sheets radio
import RadioButtonsGroup from './SheetsRadio';

const styles = {
  root: {
    flexGrow: 1
  }
};

function ConfigScreen(props) {
  const {
    classes,
    selectSheet,
    sheetNames,
    configTitle,
    listTitle, 
    field,
    selectedValue } = props;

  console.log('configScreen', props);
  return (
    <React.Fragment>
      <div className="sheetScreen" style={{padding : 10, paddingBottom: 100 }}>
        <Grid
          container
          alignItems="center"
          justify="space-between"
          direction="row"
          spacing={8} >


          <Grid item xs={12} >
            <Typography
              variant="Title"
              align="left" >
              {configTitle}
            </Typography>
          </Grid>

          <Grid item xs={6} >
            <div className="SheetPicker" >
              <RadioButtonsGroup
                sheets={sheetNames}
                title={listTitle}
                sheetCallBack={selectSheet}
                field={field}
                selectedValue={selectedValue}
              />
            </div>
          </Grid>
          <Grid item xs={6} >
            <Grid
              container
              alignItems="stretch"
              justify="space-between"
              direction="column"
              spacing={8} >
              {/*
              <Grid item xs={12}>
                <Paper>
                  <Typography
                    variant="display2"
                    align="left" >
                    Data
                  </Typography>
                </Paper>
              </Grid>

              <Grid item style={{ height:'25%' }}>
                <Paper>
                  <Typography
                    variant="subheading"
                    align="center" >
                    Drop sheet with data here
                  </Typography>
                </Paper>
              </Grid>
              */}
              {/* left off here, the chord is still not sized dynamically */}
              {/* <Grid item xs={12} >
                <Paper>
                  <Typography
                    variant="subheading"
                    align="center" >
                    Placeholder for help info
                  </Typography>
                </Paper>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
    );
}

ConfigScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfigScreen);
