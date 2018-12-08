import React from 'react';

import { CustomScreen } from '.';
import { OptionColumn } from './CustomizeUIElements';

const CustomizeViolin = (props) => (
  <React.Fragment>
    <div class="content-container">
      <h4 style={{color: "#BDBDBD"}}>{props.title}</h4>
      <div className="clearfix">
        <OptionColumn className="grid--6">
          <CustomScreen 
            configTitle={"Customize your swarm and summary chart"}
            handleChange={props.handleChange}
            customCallBack={props.customCallBack}
            field={props.field}
            d3Projections={props.d3Projections}
            projectionName={props.projectionName}
            color={props.color}
            tableauSettings={props.tableauSettings}
          />
        </OptionColumn>
      </div>
    </div>
  </React.Fragment>
);

export default CustomizeViolin;