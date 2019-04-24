const tableauExt = window.tableau.extensions;

export function selectMarksByField(fieldName, fieldValues, ConfigSheet) {
  console.log('%c select marks by field', 'background: OLIVE; color: white')
  const marksValue = [{
    fieldName,
    value: fieldValues
  }];

  return tableauExt.dashboardContent.dashboard.worksheets
    .filter(ws => ws.name !== ConfigSheet)
    .map(worksheet =>
      worksheet
        .selectMarksByValueAsync(
          marksValue,
          window.tableau.SelectionUpdateType.Replace
        )
    );
}

export function applyFilterByField(fieldName, fieldValues, ConfigSheet) {
  console.log('%c applyFilterByField', 'background: OLIVE; color: white')

  return tableauExt.dashboardContent.dashboard.worksheets
    .filter(ws => ws.name !== ConfigSheet)
    .map(worksheet => {
      worksheet
        .applyFilterAsync(
          fieldName,
          fieldValues,
          window.tableau.FilterUpdateType.Replace
        )
  });
}

export function clearFilterByField(fieldName, ConfigSheet) {
  console.log('%c clearFilterByField', 'background: MAROON; color: white')

  return tableauExt.dashboardContent.dashboard.worksheets
    .filter(ws => ws.name !== ConfigSheet)
    .map(worksheet => {
      worksheet.clearFilterAsync(fieldName)
  });
}

export function clearMarksByField(fieldName, ConfigSheet) {
  console.log('%c clearMarksByField', 'background: MAROON; color: white')
  return selectMarksByField(fieldName, [], ConfigSheet);
}
