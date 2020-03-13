/*global it, expect*/

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
import reducer from '../reducers';
import dataset from './fixture';
import {MAP_ID, DATA_ID} from '../constants';

import {registerEntry, addDataToMap} from 'kepler.gl/actions';
import {markerSelect} from '../actions';

it('initial reducer', () => {
  const initialState = reducer(undefined, {});
  expect(initialState.keplerGl).toEqual({});
});

it('initial reducer with kepler', () => {
  const stateWKepler = reducer(undefined, registerEntry({id: MAP_ID}));
  expect(stateWKepler.keplerGl[MAP_ID]).toBeDefined();
  expect(stateWKepler.keplerGl[MAP_ID]).toEqual(
    expect.objectContaining({
      visState: expect.any(Object),
      uiState: expect.any(Object),
      mapState: expect.any(Object),
      mapStyle: expect.any(Object),
      providerState: expect.any(Object)
    })
  );
});

it('reducer addDataToMap', () => {
  const stateWKepler = reducer(undefined, registerEntry({id: MAP_ID}));

  const stateWData = reducer(
    stateWKepler,
    addDataToMap({
      datasets: [dataset]
    })
  );
  expect(stateWData.keplerGl.map.visState.datasets).toBeDefined();
  expect(stateWData.keplerGl.map.visState.datasets).toEqual(
    expect.objectContaining({
      [DATA_ID]: expect.any(Object)
    })
  );
});

it('reducer marketSelect', () => {
  const stateWKepler = reducer(undefined, registerEntry({id: MAP_ID}));
  const stateWData = reducer(
    stateWKepler,
    addDataToMap({
      datasets: [dataset]
    })
  );

  const payload = {
    field: 'date',
    values: ['2016-09-23']
  };

  const stateFiltered = reducer(stateWData, markerSelect(payload));

  // should add filter
  expect(stateFiltered.keplerGl.map.visState.filters.length).toBe(1);

  expect(stateFiltered.keplerGl.map.visState.filters[0].dataId).toEqual([
    DATA_ID
  ]);
  expect(stateFiltered.keplerGl.map.visState.filters[0].name).toEqual(['date']);
  expect(stateFiltered.keplerGl.map.visState.filters[0].value).toEqual([
    '2016-09-23'
  ]);
  expect(stateFiltered.keplerGl.map.visState.filters[0].domain).toEqual([
    '2016-09-23',
    '2016-09-24',
    '2016-10-10'
  ]);

  expect(
    stateFiltered.keplerGl.map.visState.datasets[DATA_ID].filteredIndex
  ).toEqual([0, 1, 2, 3]);

  // set filter again
  const payload2 = {
    field: 'date',
    values: ['2016-09-23', '2016-09-24']
  };
  const stateFiltered2 = reducer(stateFiltered, markerSelect(payload2));
  expect(
    stateFiltered2.keplerGl.map.visState.datasets[DATA_ID].filteredIndex
  ).toEqual([0, 1, 2, 3, 7, 8, 9, 10, 11, 12]);

  // set it to empty should remove filter
  const payload3 = {
    field: 'date',
    values: []
  };
  const stateFiltered3 = reducer(stateFiltered2, markerSelect(payload3));
  expect(stateFiltered3.keplerGl.map.visState.filters.length).toBe(0);
});
