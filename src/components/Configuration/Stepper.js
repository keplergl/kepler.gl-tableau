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

import './../../styles/Stepper.css';

const Step = (props) => (
  <div className={'step-item text--merriweather-light ' + (props.isActive ? 'active' : '')}>
      <div className="step-count">
        <span>{props.stepIndex}</span>
      </div>
      <span className="step-name">{props.stepName}</span>
  </div>
);

const Stepper = (props) => (
  <div className="step-grid" id="Stepper">
    {
      props.steps.map((item, index) => {
        let stepIndex = index + 1;
        return (
          <Step
            isActive={props.stepIndex === stepIndex}
            stepIndex={stepIndex}
            stepName={item}
          />
        );
      })
    }
  </div>
);

export default Stepper;