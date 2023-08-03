const xlsx = require('xlsx');


const getTableData = (wb, sheetName) => {
    const ws = wb.Sheets[sheetName];
    const json = xlsx.utils.sheet_to_json(ws);
    return json;

}

const getExcelData = (filepath, sheetName) => {
    const wb = xlsx.readFile(filepath);

    let entries = [];
    const tabData = getTableData(wb, sheetName);
    entries = entries.concat(tabData);
    return entries;
}

module.exports = getExcelData;