// Copyright (c) 2018 Uber Technologies, Inc.
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

import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {log} from '../../utils';
import {MAP_ID} from '../../constants';

// Kepler.gl actions
import {
  SidebarFactory,
  AddDataButtonFactory,
  PanelHeaderFactory,
  injectComponents
} from 'kepler.gl/components';

import CustomPanelHeaderFactory from './components/panel-header';
import CustomSidebarFactory from './components/side-bar';

// Kepler.gl Schema APIs
import KeplerGlSchema from 'kepler.gl/schemas';

// Component and helpers
import Button from './button';
import downloadJsonFile from './file-download';

const CustomAddDataButtonFactory = () => () => <div />;
// CustomComponents
const KeplerGl = injectComponents([
  [AddDataButtonFactory, CustomAddDataButtonFactory],
  [SidebarFactory, CustomSidebarFactory],
  [PanelHeaderFactory, CustomPanelHeaderFactory]
]);

function getHoverInfo(info) {
  const objectHovered = info ? info.object : null;
  if (!objectHovered) {
    // if nothing hovered
    return null;
  }

  return objectHovered.data
    ? // if hovered is a single object
      objectHovered.data
    : // if hovered is a hexbbin, or grid, kepler.gl can return all the points inside that hexagon / grid
      objectHovered.points;
}

class App extends Component {
  preValue = null;

  /**
   * Listen on state change to update serialized map config
   */
  componentDidUpdate(prevProps) {
    const {keplerGl} = this.props;

    if (
      !keplerGl ||
      !keplerGl.map ||
      !prevProps.keplerGl ||
      !prevProps.keplerGl.map ||
      !this.hasData()
    ) {
      // component hasn't mount yet
      return;
    }

    this.handleConfigChange();
    this.handleInteractionEvent(prevProps);
  }

  handleInteractionEvent(prevProps) {
    const {keplerGl} = this.props;

    if (
      prevProps.keplerGl.map.visState.hoverInfo !==
      keplerGl.map.visState.hoverInfo
    ) {
      // hovered object has changed
      this.props.customHoverBehavior(
        getHoverInfo(keplerGl.map.visState.hoverInfo)
      );
    }

    if (
      prevProps.keplerGl.map.visState.clicked !== keplerGl.map.visState.clicked
    ) {
      // clicked object has changed
      this.props.customClickBehavior(
        getHoverInfo(keplerGl.map.visState.clicked)
      );
    }
  }

  handleConfigChange() {
    const currentState = this.getMapConfig();
    if (!currentState) {
      return;
    }

    const serializedState = JSON.stringify(currentState);

    if (this.preValue !== serializedState) {
      // keplerGl State has changed

      log(
        '%c KeplerGL.app config has changed',
        'background: yellow; color:red',
        serializedState
      );

      this.props.configCallBack('keplerConfig', serializedState);
      this.preValue = serializedState;
    } else {
      console.log('%c config looks the same', 'background: teal');
    }
  }

  hasData() {
    const {keplerGl} = this.props;
    const {map} = keplerGl;

    return Object.keys(map.visState.datasets).length;
  }
  // This method is used as reference to show how to export the current kepler.gl instance configuration
  // Once exported the configuration can be imported using parseSavedConfig or load method from KeplerGlSchema
  getMapConfig() {
    // retrieve kepler.gl store
    const {keplerGl} = this.props;
    // retrieve current kepler.gl instance store
    const {map} = keplerGl;

    // create the config object
    return KeplerGlSchema.getConfigToSave(map);
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          minHeight: '70vh'
        }}
      >
        <KeplerGl
          mapboxApiAccessToken={this.props.mapboxAPIKey}
          id={MAP_ID}
          appName="Kepler.gl in Tableau!"
          version="v0.1"
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    );
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(
  mapStateToProps,
  dispatchToProps
)(App);
