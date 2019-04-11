import './polyfills.js';
import React from 'react';
import document from 'global/document';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';

// render(<AppWrapper />, document.getElementById('root'));
import AppWrapper from './AppWrapper';

const Root = () => (
  <Provider store={store}>
    <AppWrapper/>
  </Provider>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
