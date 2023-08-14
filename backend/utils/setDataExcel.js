const XLSX = require('xlsx');

function setDataExcel(filename, sheetName, newData) {
  const workbook = XLSX.readFile(filename);
  const sheet = workbook.Sheets[sheetName];
    
  const range = XLSX.utils.decode_range(sheet['!ref']);
  const newRowStart = range.e.r + 1;
  
  newData.forEach((row, rowIndex) => {
    row.forEach((cellValue, columnIndex) => {
      const cellAddress = XLSX.utils.encode_cell({ r: newRowStart + rowIndex, c: columnIndex });
      sheet[cellAddress] = { v: cellValue };
    });
  });
  
  range.e.r += newData.length;
  sheet['!ref'] = XLSX.utils.encode_range(range);
  
  XLSX.writeFile(workbook, filename);
  
}

module.exports = setDataExcel;