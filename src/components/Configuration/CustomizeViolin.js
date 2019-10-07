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

import { CustomScreen } from '.';
import { OptionColumn } from './CustomizeUIElements';

const CustomizeViolin = (props) => (
  <React.Fragment>
    <div class="content-container">
      <h4 style={{color: "#BDBDBD"}}>{props.title}</h4>
      <div className="clearfix">
        <OptionColumn className="grid--6" style={{margin: "10px"}}>
          <CustomScreen
            configTitle={"Customize how to render kepler.gl in Tableau"}
            handleChange={props.handleChange}
            customCallBack={props.customCallBack}
            field={props.field}
            d3Projections={props.d3Projections}
            projectionName={props.projectionName}
            color={props.color}
            tableauSettings={props.tableauSettings}
            configSheetColumns={props.configSheetColumns}
          />
        </OptionColumn>
      </div>
    </div>
  </React.Fragment>
);

export default CustomizeViolin;
