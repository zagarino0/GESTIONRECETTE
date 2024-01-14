const getDataExcel = require('./ExcelData');
const path = require('path');
const fsPromises = require('fs').promises;

fsPromises.writeFile('./impot.json', JSON.stringify(getDataExcel(path.join(__dirname, '..', 'fixtures', 'code.xlsx'), 'impot')));