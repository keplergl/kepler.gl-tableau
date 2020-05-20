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

import { ConfigScreen } from './../Configuration';
import { OptionColumn } from './CustomizeUIElements';

const PickSheets = (props) => (
  <React.Fragment>
    <div className="content-container">
      <h4 style={{color: "#333"}}>{props.title}</h4>
      <div className="clearfix">
        <OptionColumn className="grid--6" style={{border: 0}}>
          <ConfigScreen
                sheetNames = {props.sheetNames}
                selectSheet = {props.configCallBack}
                configTitle = "Select a Data Sheet:"
                listTitle = "Available Sheets"
                field={props.field}
                selectedValue={props.ConfigSheet || ""}
          />
        </OptionColumn>
      </div>
    </div>
  </React.Fragment>
);

export default PickSheets;
