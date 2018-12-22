import React from 'react';
import styled from 'styled-components';

const InputTitle = styled.span`
  font-size: 11px;
`;

const Tooltip = styled.a`
  display: inline !important;
  cursor: pointer;
  color: rgb(232, 118, 44);
  font-weight: 700;
  margin-left: 8px;
`;

export const OptionTitle = styled.p`
  font-size: 11px;
  font-weight: 700;
`;

export const OptionWrapper = styled.div`
  
`;

export const OptionColumn = styled.div`
  height: 375px;
  overflow: auto;
  border: 1px solid lightgrey;
  border-radius: 2px;
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
  font-size: 11px; 
  padding-bottom: 5px; 
  padding-top: 5px; 
  padding-left: 10px;
  padding-right: 10px;
  outline: none;
  margin-bottom: 10px;
`;

export const InputLabelWithTooltip = (props) => (
  <div>
    <InputTitle htmlFor="markerShow-helper">{props.title}</InputTitle>
    <Tooltip className="tooltip">
      ?
      <div class="tooltip__text">{props.tooltipText}</div>
    </Tooltip>
  </div>
)