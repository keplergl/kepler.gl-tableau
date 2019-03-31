// import { tableau } from '../../tableau-extensions-1.latest.js';
  
export default () => {
	self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
		if (!e) return;

        const sheetName = e.data.sheet;
        const fieldName = e.data.fieldName;
        const options = e.data.options;
        const columnToKeplerField = e.data.columnToKeplerField; 
        const dataToKeplerRow = e.data.dataToKeplerRow;
        const tableauExt = e.data.tableauExt;

        console.log('we are in the web worker', e.data, sheetName, fieldName, options, columnToKeplerField, dataToKeplerRow, tableauExt.dashboardContent);

        const sheetObject = tableauExt.dashboardContent.dashboard.worksheets
            .find(worksheet => worksheet.name === sheetName);
  
  
        const users = [];

		const userDetails = {
			name: 'Jane Doe',
			email: 'jane.doe@gmail.com',
			id: 1
        };
        
		for (let i = 0; i < 10000000; i++) {

			userDetails.id = i++
			userDetails.dateJoined = Date.now()

			users.push(userDetails);
		}

        // working here on pulling out summmary data
        // may want to limit to a single row when getting column names
        sheetObject.getSummaryDataAsync(options).then((t) => {
            console.log('in getData().getSummaryDataAsync', t, this.state);
    
            let col_names = [];
            let col_types = [];
            let col_names_S = [];
            let col_names_N = [];
            let col_indexes = {};
            let data = [];
            let keplerFields = [];
    
            //write column names to array
            for (let k = 0; k < t.columns.length; k++) {
                col_indexes[t.columns[k].fieldName] = k;
    
                // write named array
                col_names.push(t.columns[k].fieldName);
    
                // write type array
                col_types.push(t.columns[k].dataType);
    
                // write typed arrays as well
                if (t.columns[k].dataType === 'string') {
                col_names_S.push(t.columns[k].fieldName);
                }
                else if (t.columns[k].dataType === 'int') {
                col_names_N.push(t.columns[k].fieldName);
                }
                else if (t.columns[k].dataType === 'float') {
                col_names_N.push(t.columns[k].fieldName);
                }
    
            keplerFields.push(columnToKeplerField(t.columns[k], k));
            }
    
            console.log('zzz do we see data', t.data.length, t.data);
            const keplerData = dataToKeplerRow(t.data, keplerFields);
    
            // log flat data for testing
            console.log('flat data', data, col_names, fieldName);
            const newDataState = {
            isLoading: false,
            [fieldName + 'Columns']: col_names,
            [fieldName + 'StringColumns']: col_names_S,
            [fieldName + 'NumberColumns']: col_names_N,
            [fieldName + 'Data']: {fields: keplerFields, rows: keplerData}, //data, we need something more like tableau for kepler
            };

            postMessage(users)
        });
	})
}
