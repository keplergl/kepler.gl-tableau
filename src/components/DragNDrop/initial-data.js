const initialData = {
  // measures: [
  //   {id: 'measure1', content: 'Longitude'},
  //   {id: 'measure2', content: 'Latitude'},
  //   {id: 'measure3', content: 'Population'},
  //   {id: 'measure4', content: 'Mobile usage'},
  // ],
  columns: {
    measures: {
      id: 'measures',
      title: 'Fields',
      type: 'measures',
      measures: []
      //measures: ['measure1', 'measure2', 'measure3', 'measure4']
    },
    config_options: {
      id: 'config_options',
      title: 'Fields',
      type: 'options',
      areaIds: ['ConfigOrdinalField', 'ConfigValueField', 'ConfigColorField']
    }
  },
  drop_area: {
    ConfigOrdinalField: {
      id: 'ConfigOrdinalField',
      title: 'Category',
      type: 'single_drop',
      icon: 'CategoryIcon',
      measureId: null, 
      required: true
    },
    ConfigValueField: {
      id: 'ConfigValueField',
      title: 'Value',
      type: 'single_drop',
      icon: 'SizeByIcon',
      measureId: null, 
      required: true
    },
    ConfigColorField: {
      id: 'ConfigColorField',
      title: 'Color By',
      type: 'single_drop',
      icon: 'FillByIcon',
      measureId: null, 
      required: false
    },
  },
  columnOrder: ['measures', 'config_options']
}

export default initialData;