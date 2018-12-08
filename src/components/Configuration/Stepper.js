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