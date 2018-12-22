import React from 'react';
import { Button } from '@tableau/tableau-ui';

import './../../styles/StepButtons.css';

const StepButtons = (props) => {
  return (
    <div class="StepButtons">
      {
        props.stepIndex !== 1 
        &&
        <Button className={"newCta"} kind={"outline"} onClick={ props.onPrevClick }>{ props.backText }</Button>
      }
      <Button className={"newCta next"} kind={"filledGreen"} onClick={props.onNextClick}> { props.nextText } </Button>
    </div>
  );
}

export default StepButtons;