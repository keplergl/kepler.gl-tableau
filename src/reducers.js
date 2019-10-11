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

import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {routerReducer} from 'react-router-redux';
import keplerGlReducer, {visStateUpdaters} from 'kepler.gl/reducers';
import {FILTER_TYPES} from 'kepler.gl/constants';
import {MAP_ID, DATA_ID} from './constants';
import {MARKER_SELECT} from './actions';
import {log} from './utils';

// INITIAL_APP_STATE
const initialAppState = {
  appName: 'tableau-kepler-gl',
  loaded: false
};

const reducers = combineReducers({
  // mount keplerGl reducer
  keplerGl: keplerGlReducer.initialState({
    uiState: {
      currentModal: null,
      activeSidePanel: null
    }
  }),
  app: handleActions(
    {},
    initialAppState
  ),
  routing: routerReducer
});

const composedReducer = (state, action) => {
  switch (action.type) {
    case MARKER_SELECT:
      return markerSelectUpdater(state, action);
  }

  return reducers(state, action);
};

const keplerGlStateSelector = state => state.keplerGl[MAP_ID];
const visStateSelector = state => keplerGlStateSelector(state).visState;

function markerSelectUpdater(state, action) {

  log(
    '%c action markerSelect',
    'background: brown; color: white',
    action.payload
  );
  const {field, values} = action.payload;
  const visState = visStateSelector(state);
  let currentFilterIdx = visState.filters.findIndex(f => f.name === field && f.dataId === DATA_ID && f.tableauMarkerFilter);
  let nextState = visState;
  if (values.length) {
    if (currentFilterIdx < 0) {
      const filterField = getFilterField(visState, field);
      if (!filterField) {
        // field not in visState
        return state;
      }
      log('add filter based on marker')
      // add filter
      nextState = visStateUpdaters.addFilterUpdater(nextState, {dataId: DATA_ID});

      // added filter should be the last one
      const idx = nextState.filters.length - 1;
      currentFilterIdx = idx;
      // set filter dataId
      nextState = visStateUpdaters.setFilterUpdater(nextState, {idx, prop: 'dataId', value: DATA_ID});

      // set filter name and props
      const newFilter = getNewFilter(nextState, idx, filterField);
      nextState = {
        ...nextState,
        filters: nextState.filters.map((f, i) => i === idx ? newFilter : f)
      };

    }

    // set filter value
    nextState = visStateUpdaters.setFilterUpdater(nextState, {idx: currentFilterIdx, prop: 'value', value: values});
  } else if (currentFilterIdx >= 0) {
    // remove filter
    log('remove filter based on marker')
    nextState = visStateUpdaters.removeFilterUpdater(nextState, {idx: currentFilterIdx});
  }

  return updateKeplerGlState(state, {visState: nextState});
}

function updateKeplerGlState(state, newState) {
  return {
    ...state,
    keplerGl: {
      ...state.keplerGl,
      [MAP_ID]: {
        ...state.keplerGl[MAP_ID],
        ...newState
      }

    }
  };
}

function getNewFilter(state, idx, field) {
  const fieldIdx = field.tableFieldIndex - 1;
  const values = state.datasets[DATA_ID].allData.map(row => row[fieldIdx]);

  const filterProp = {
    domain: unique(values).sort(),
    fieldType: field.type,
    type: 'multiSelect',
    value: []
  };

  const newFilter = {
    ...state.filters[idx],
    ...filterProp,
    name: field.name,
    // can't edit dataId once name is selected
    freeze: true,
    fieldIdx,
    // add tableau identifier to filter
    tableauMarkerFilter: true
  };

  return newFilter;
}

function getFilterField(visState, fieldName) {
  const dataset = visState.datasets[DATA_ID];
  return dataset.fields.find(f => f.name === fieldName);
}

function unique(values) {
  const results = [];
  values.forEach(v => {
    if (!results.includes(v) && v !== null && v !== undefined) {
      results.push(v);
    }
  });

  return results;
}

export default composedReducer;
