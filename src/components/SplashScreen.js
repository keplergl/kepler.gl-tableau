import React from 'react';

import './../styles/SplashScreen.css';

const SplashScreen = (props) => (
  <div className="gallery-grid" id="splashScreen">
    <div className="gallery-grid__item">
      <h2>{props.title}</h2>
    </div>
    <div className="gallery-grid__item">
      <p>{props.desc}</p>
    </div>
    <div className="gallery-grid__item">
      <div className="clearfix">
        <button className="cta" onClick={props.configure}>{props.ctaText}</button>
      </div>
    </div>
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