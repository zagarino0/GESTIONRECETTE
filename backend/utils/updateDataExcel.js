const XLSX = require('xlsx');

function updateDataExcel(filename, sheetName, idAModifier, newValues) {
  const workbook = XLSX.readFile(filename);
  const sheet = workbook.Sheets[sheetName];
  
  const range = XLSX.utils.decode_range(sheet['!ref']);
  
  let rowIndexToModify = -1;
  
  // Trouver l'indice de la ligne à modifier en fonction de l'ID
  for (let rowIndex = range.s.r + 1; rowIndex <= range.e.r; rowIndex++) {
    const idCellValue = sheet[XLSX.utils.encode_cell({ r: rowIndex, c: 0 })]?.v;
    if (idCellValue == idAModifier) {
      rowIndexToModify = rowIndex;
      break;
    }
  }
  
  if (rowIndexToModify != -1) {
    
    newValues.forEach((cellValue, columnIndex) => {
      const cellAddress = XLSX.utils.encode_cell({ r: rowIndexToModify, c: columnIndex });
      sheet[cellAddress] = { v: cellValue };
    });
    
    XLSX.writeFile(workbook, filename);
  } else {
    console.log('update failde');
  }
}

module.exports = updateDataExcel;