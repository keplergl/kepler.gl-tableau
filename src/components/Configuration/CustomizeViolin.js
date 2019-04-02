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