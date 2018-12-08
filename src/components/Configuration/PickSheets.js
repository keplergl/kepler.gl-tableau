import React from 'react';

import { ConfigScreen } from './../Configuration';
import { OptionColumn } from './CustomizeUIElements';

const PickSheets = (props) => (
  <React.Fragment>
    <div className="content-container">
      <h4 style={{color: "#BDBDBD"}}>{props.title}</h4>
      <div className="clearfix">
        <OptionColumn className="grid--6">
          <ConfigScreen
                sheetNames = {props.sheetNames}
                selectSheet = {props.configCallBack}
                configTitle = "Select a Data Sheet"
                listTitle = "Available Sheets"
                field={props.field}
                selectedValue={props.ConfigSheet || ""}
          />
        </OptionColumn>
        <OptionColumn className="grid--6" style={{border: 0}}>
        </OptionColumn>
      </div> 
    </div>
  </React.Fragment>
);

export default PickSheets;