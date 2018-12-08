import React, { Component } from 'react';
import App from './App';
import parse from 'url-parse';

class AppWrapper extends Component {

  render() {
    const configState = parse(window.location.href).hash === '#true';

    return(
      <App
        isConfig = {configState}
      >
      </App>
    );
  }

}

export default (AppWrapper);
