import React from 'react';
import { Button } from '@tableau/tableau-ui';
import Typography from '@material-ui/core/Typography';

import './../styles/SplashScreen.css';

const SplashScreen = (props) => (
  <div className="gallery-grid" id="splashScreen">
    <div className="gallery-grid__item">
      <Typography variant={"display2"} style={{color: "#000"}}>{props.title}</Typography>
    </div>
    <div className="gallery-grid__item">
      <Typography variant={"subheading"} >{props.desc}</Typography>
    </div>
    <br />
    <div className="gallery-grid__item">
      <div className="clearfix">
        <Button kind={"filledGreen"} key={"configButton"} onClick={props.configure}>{props.ctaText}</Button>
      </div>
    </div>
    <br />
    <div className="gallery-grid__item">
      <p className="info">{props.infoText}</p>
    </div>
    <div className="gallery-grid__item">
      <div className="padded-box padded-box--one">
        {props.poweredBy}
      </div>
    </div>
  </div>
);

export default SplashScreen;