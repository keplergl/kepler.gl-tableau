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
import {MAP_ID, DATA_ID} from '../../constants';

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

const CustomAddDataButtonFactory = () => () => <div />;
// CustomComponents
const KeplerGl = injectComponents([
  [AddDataButtonFactory, CustomAddDataButtonFactory],
  [SidebarFactory, CustomSidebarFactory],
  [PanelHeaderFactory, CustomPanelHeaderFactory]
]);

function getHoverInfo(info, allData) {
  const objectHovered = info ? info.object : null;
  if (!objectHovered) {
    // if nothing hovered
    return null;
  }

  return objectHovered.data
    ? // if hovered is a single object
      objectHovered.data
    : // if hovered is a hexbbin, or grid, kepler.gl can return all the points inside that hexagon / grid
    objectHovered.type === 'Feature'
    ? allData[objectHovered.properties.index]
    : objectHovered.points;
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
      !keplerGl[MAP_ID] ||
      !prevProps.keplerGl ||
      !prevProps.keplerGl[MAP_ID] ||
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
    const {allData} = keplerGl[MAP_ID].visState.datasets[DATA_ID];
    const hovered = getHoverInfo(keplerGl[MAP_ID].visState.hoverInfo, allData);
    const clicked = getHoverInfo(keplerGl[MAP_ID].visState.clicked, allData);
    if (getHoverInfo(prevProps.keplerGl[MAP_ID].visState.hoverInfo, allData) !== hovered) {
      // hovered object has changed
      this.props.customHoverBehavior(hovered);
    }

    if (getHoverInfo(prevProps.keplerGl[MAP_ID].visState.clicked, allData) !== clicked) {
      // clicked object has changed
      this.props.customClickBehavior(clicked);
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
      this.props.configCallBack('keplerConfig', serializedState);
      this.preValue = serializedState;
    }
  }

  hasData() {
    const {keplerGl} = this.props;

    return Object.keys(keplerGl[MAP_ID].visState.datasets).length;
  }
  // This method is used as reference to show how to export the current kepler.gl instance configuration
  // Once exported the configuration can be imported using parseSavedConfig or load method from KeplerGlSchema
  getMapConfig() {
    // retrieve kepler.gl store
    const {keplerGl} = this.props;

    // create the config object
    return KeplerGlSchema.getConfigToSave(keplerGl[MAP_ID]);
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
          theme={this.props.theme === 'light' ? 'light' : undefined}
          width={this.props.width}
          height={this.props.height}
          sidePanelWidth={260}
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
