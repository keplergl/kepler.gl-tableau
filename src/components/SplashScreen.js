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
import {Button} from '@tableau/tableau-ui';
import Typography from '@material-ui/core/Typography';

import './../styles/SplashScreen.css';

const SplashScreen = props => (
  <div className="gallery-grid" id="splashScreen">
    <div className="gallery-grid__item">
      <Typography variant={'display2'} style={{color: '#000'}}>
        {props.title}
      </Typography>
    </div>
    <div className="gallery-grid__item">
      <Typography variant={'subheading'}>{props.desc}</Typography>
    </div>
    <br />
    <div className="gallery-grid__item">
      <div className="clearfix">
        <Button
          kind={'filledGreen'}
          key={'configButton'}
          onClick={props.configure}
        >
          {props.ctaText}
        </Button>
      </div>
    </div>
    <br />
    <div className="gallery-grid__item">
      <p className="info">{props.infoText}</p>
    </div>
    <div className="gallery-grid__item">
      <div className="padded-box padded-box--one">{props.poweredBy}</div>
    </div>
  </div>
);

export default SplashScreen;
