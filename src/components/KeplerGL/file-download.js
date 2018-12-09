import {Blob, URL, document} from 'global/window';

function downloadJsonFile(jsonData, filename) {
  const fileBlob = new Blob([
    JSON.stringify(jsonData, null, 2),
  ], {type: 'application/json'});

  const url = URL.createObjectURL(fileBlob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default downloadJsonFile;
