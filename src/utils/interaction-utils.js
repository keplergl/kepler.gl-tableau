const tableauExt = window.tableau.extensions;

export function selectMarksByField(fieldName, fieldValues, ConfigSheet) {
  const marksValue = [{
    fieldName,
    value: fieldValues
  }];

  // Empty promise that resolves when the selection is complete.
  return tableauExt.dashboardContent.dashboard.worksheets
    .filter(ws => ws.name !== ConfigSheet)
    .map(worksheet => worksheet
      .selectMarksByValueAsync(
        marksValue,
        window.tableau.SelectionUpdateType.Replace
      )
    );
}

export function applyFilterByField(fieldName, fieldValues, ConfigSheet) {
  // Empty promise that resolves when the selection is complete.
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
  // Empty promise that resolves when the selection is complete.
  return tableauExt.dashboardContent.dashboard.worksheets
    .filter(ws => ws.name !== ConfigSheet)
    .map(worksheet => {
      worksheet.clearFilterAsync(fieldName);
  });
}

export function clearMarksByField(fieldName, ConfigSheet) {
  return selectMarksByField(fieldName, [], ConfigSheet);
}
