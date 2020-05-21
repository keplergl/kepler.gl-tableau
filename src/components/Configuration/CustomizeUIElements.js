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
import styled from 'styled-components';

import '../../styles/Tooltip.css';

const InputTitle = styled.div`
  font-size: 12px;
  margin-bottom: 4px;
  display: inline-block;
`;

const Tooltip = styled.a`
  display: inline !important;
  cursor: pointer;
  color: rgb(45, 204, 151);
  margin-left: 8px;
  font-size: 12px;
`;

export const OptionTitle = styled.p`
  font-size: 12px;
`;

export const SectionTitle = styled.p`
  font-size: 12px;
  font-weight: 600;
`;

export const OptionWrapper = styled.div`

`;

export const OptionColumn = styled.div`
  overflow: auto;
`;

// export const TextField = styled.input`
//   border: none;
//   border-bottom: 1px solid rgba(0, 0, 0, 0.41);
//   padding-top: 6px;
//   padding-bottom: 6px;
// `;

export const SearchInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.41);
  border-radius: 20px;
  font-size: 12px;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
  outline: none;
  margin-bottom: 10px;
`;

const InfoIcon = styled.div`
  font-size: 10px;
  background-color: #ccc;
  color: #fff;
  border-radius: 100px;
  width: 12px;
  height: 12px;
  display: inline-block;
  text-align: center;
  ::after {
    content: "i";
  }
`;

export const InputLabelWithTooltip = (props) => (
  <div>
    <InputTitle htmlFor="markerShow-helper">{props.title}</InputTitle>
    <Tooltip className="tooltip">
      <InfoIcon></InfoIcon>
      <div class="tooltip__text">{props.tooltipText}</div>
    </Tooltip>
  </div>
)
