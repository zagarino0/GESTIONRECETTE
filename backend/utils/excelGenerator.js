const excel = require('xlsx');

const excelGenerator = (title = "", data = {}, filename = "") => {
    const wb = excel.utils.book_new();

const ws = excel.utils.json_to_sheet(data, {
    skipHeader: false
})
    excel.utils.book_append_sheet(wb, ws, title);
    excel.writeFile(wb, filename);
}

module.exports = excelGenerator;