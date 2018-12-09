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
  
  export const convertRowToObject = (row, attrs_map, attrs_types) => {
    let o = {};
    let name = "";
    for (name in attrs_map) {
      let id = attrs_map[name];
      o[name] = row[id].value === "%null%" ? null : attrs_types[attrs_map[name]] === "int" ? parseInt(row[id].value) : attrs_types[attrs_map[name]] === "float" ? parseFloat(row[id].value) : row[id].value;
    }
    return o;
  };
  
  export const convertToKepler = (row, attrs_map, attrs_types) => {
    let o = [];
    let name = "";
    for (name in attrs_map) {
      let id = attrs_map[name];
      o[id] = row[id].value === "%null%" ? null : attrs_types[attrs_map[name]] === "int" ? parseInt(row[id].value) : attrs_types[attrs_map[name]] === "float" ? parseFloat(row[id].value) : row[id].value;
    }
    return o;
  };

  export const log = (...msgs) => {
    if (process.env.NODE_ENV === 'development') console.log(...msgs)
  }