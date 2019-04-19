import {ALL_FIELD_TYPES as KeplerFieldTypes} from 'kepler.gl/constants';
import {getFieldsFromData} from 'kepler.gl/processors';

export const getColumnIndexes = (table, required_keys) => {
  let colIdxMaps = {};
  let ref = table.columns;
  for (let j = 0; j < ref.length; j++) {
    let c = ref[j];
    let fn = c.fieldName;
    for (let x = 0; x < required_keys.length; x++) {
      if (required_keys[x] === fn) {
        colIdxMaps[fn] = c.index;
      }
    }
  }
  return colIdxMaps;
};

export const dataToKeplerRow = (data, fields) =>
  data.map(row =>
    row.map((d, i) =>
      d.value === '%null%' ? null : StringToValueByType[fields[i].type](d.value)
    )
  );

export const log = (...msgs) => {
  if (process.env.NODE_ENV === 'development') console.log(...msgs);
};

export const columnToKeplerField = (col, i) => ({
  // TODO: generate time format here
  format: '',
  name: col.fieldName,
  type: DataTypeMap[col.dataType],
  tableauType: col.dataType,
  tableauIdx: i
});

// https://tableau.github.io/extensions-api/docs/enums/datatype.html
export const DataTypeMap = {
  // TODO: Shan: figure out how to parse boolean format
  bool: KeplerFieldTypes.boolean,
  date: KeplerFieldTypes.date,
  // TODO: Shan: figure out how to parse date-time format
  'date-time': KeplerFieldTypes.timestamp,
  float: KeplerFieldTypes.real,
  int: KeplerFieldTypes.integer,
  // TODO: Shan: figure out how to handle spatial data format
  spatial: KeplerFieldTypes.geojson,
  string: KeplerFieldTypes.string
};

export const StringToValueByType = {
  [KeplerFieldTypes.boolean]: d =>
    (typeof d === 'string' && d.toLowerCase() === 'true') ||
    d === '1' ||
    d.toLowerCase() === 'yes',
  [KeplerFieldTypes.date]: d => d,
  [KeplerFieldTypes.timestamp]: d => d,
  [KeplerFieldTypes.real]: d => parseFloat(d),
  [KeplerFieldTypes.integer]: d => parseInt(d),
  [KeplerFieldTypes.geojson]: d => d,
  [KeplerFieldTypes.string]: d => d
};

export function notNullorUndefined(d) {
  return d !== undefined && d !== null;
}

export function getSampleForTypeAnalyze({fields, rows, sampleCount = 50}) {
  const total = Math.min(sampleCount, rows.length);
  const sample = new Array(total).fill({})
  // collect sample data for each field
  fields.forEach(({name, tableauIdx}) => {
    // data counter
    let i = 0;
    // sample counter
    let j = 0;

    while (j < total) {
      if (i >= rows.length) {
        // if depleted data pool
        sample[j][name] = null;
        j++;
      } else if (notNullorUndefined(rows[i][tableauIdx].value)) {
        sample[j][name] = rows[i][tableauIdx].value;
        j++;
        i++;
      } else {
        i++;
      }
    }
  });

  return sample;
}

export function dataTableToKepler(table) {
  const col_names = [];
  const data = [];
  let keplerFields = [];

  //write column names to array
  for (let k = 0; k < table.columns.length; k++) {

    // write named array
    col_names.push(table.columns[k].fieldName);

    keplerFields.push(columnToKeplerField(table.columns[k], k));
  }

  // for string fields, we have to detect their types, because they
  // may contain geometry info
  keplerFields = analyzeStringFields(keplerFields, table.data);


  log('zzz do we see data', table.data.length, table.data);
  const keplerData = dataToKeplerRow(table.data, keplerFields);

  // log flat data for testing
  log('flat data', data, col_names, 'ConfigSheet');
  return {
    isLoading: false,
    ConfigSheetColumns: col_names,
    ConfigSheetData: {fields: keplerFields, rows: keplerData} //data, we need something more like tableau for kepler
  };
}

export function analyzeStringFields(fields, data) {
  const stringFields = fields.filter(f => f.type === KeplerFieldTypes.string);
  const sampleCount = 50
  const sampleData = getSampleForTypeAnalyze({fields: stringFields, rows: data, sampleCount});
  const fieldMeta = getFieldsFromData(sampleData, fields.map(f => f.name));

  // {name: 'time', format: 'YYYY-M-D H:m:s', tableFieldIndex: 1, type: 'timestamp'}
  const edited = fields.slice();
  fieldMeta.forEach(({name, type}, i) => {
    if (type === KeplerFieldTypes.geojson) {
      // update current fieldType
      const index = stringFields[i].tableauIdx;
      const geoField = {
        ...fields[index],
        type: KeplerFieldTypes.geojson
      }
      edited[index] = geoField;
    }
  });

  return edited;
}
