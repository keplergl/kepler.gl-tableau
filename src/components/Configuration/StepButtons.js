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
import { Button } from '@tableau/tableau-ui';

import './../../styles/StepButtons.css';
import styled from 'styled-components';

const NUMBER_OF_STEPS = 2;
const StepDots = styled.span`
  margin-top: 12px;
`;

const Dot = styled.div`
  display: inline-block;
  background-color: #ccc;
  width: 8px;
  height: 8px;
  border-radius: 8px;

  &:not(:first-child) {
    margin-left: 4px;
  }

  &.selected {
    background-color: #333;
  }
`;

const StepButtons = (props) => {
  return (
    <div className="StepButtons">
      <Button className={"newCta"} kind={"outline"} onClick={ props.onPrevClick } disabled={ props.stepIndex === 1 }> { props.backText } </Button>
      <StepDots>
        { new Array(NUMBER_OF_STEPS).fill(0).map((value, index) => <Dot className={props.stepIndex === index + 1 && 'selected'} />)}
      </StepDots>
      <Button className={"newCta next"} kind={"outline"} onClick={props.onNextClick}> { props.nextText } </Button>
    </div>
  );
}

export default StepButtons;
