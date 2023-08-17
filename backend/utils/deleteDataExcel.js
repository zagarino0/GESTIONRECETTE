const XLSX = require('xlsx');

function deleteDataExcel(filename, sheetName, idASupprimer) {
  const workbook = XLSX.readFile(filename);
  const sheet = workbook.Sheets[sheetName];
  
  const range = XLSX.utils.decode_range(sheet['!ref']);
  
  let rowIndexToDelete = -1;
  
  // Trouver l'indice de la ligne à supprimer en fonction de l'ID
  for (let rowIndex = range.s.r + 1; rowIndex <= range.e.r; rowIndex++) {
    const idCellValue = sheet[XLSX.utils.encode_cell({ r: rowIndex, c: 0 })]?.v;
    if (idCellValue == idASupprimer) {
      rowIndexToDelete = rowIndex;
      break;
    }
  }
  
  if (rowIndexToDelete != -1) {
    // Décaler les lignes suivantes vers le haut pour remplir l'espace de la ligne supprimée
    for (let rowIndex = rowIndexToDelete; rowIndex <= range.e.r - 1; rowIndex++) {
      for (let columnIndex = range.s.c; columnIndex <= range.e.c; columnIndex++) {
        const currentCellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex });
        const nextCellAddress = XLSX.utils.encode_cell({ r: rowIndex + 1, c: columnIndex });
        sheet[currentCellAddress] = sheet[nextCellAddress];
      }
    }
    
    // Mettre à jour la plage du sheet
    range.e.r -= 1;
    sheet['!ref'] = XLSX.utils.encode_range(range);
    
    XLSX.writeFile(workbook, filename);
    
  } else {
    console.log('delete failed');
  }
}

module.exports = deleteDataExcel;