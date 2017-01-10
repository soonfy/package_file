const XLSX = require('xlsx');
const path = require('path');

const Xlsxer = {
  /**
   * 
   * read xlsx file, file => data;
   * 
   * @param {any} filepath
   * @param {string} [encode='urf-8']
   * @returns
   */
  readXLSX(filepath) {
    let result = {};
    let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let workbook = XLSX.readFile(filepath);
    for (let sheetName of workbook.SheetNames) {
      let worksheet = workbook.Sheets[sheetName];
      let sheets = [];
      let rows = [];
      for (let cell in worksheet) {
        console.log(cell);
        if (cell.slice(0, 1) === 'A' && cell !== 'A1' && nums.includes(cell.slice(1, 2))) {
          sheets.push(rows);
          rows = [];
          rows.push(worksheet[cell].v);
        } else if (cell.slice(0, 1) !== '!') {
          rows.push(worksheet[cell].v);
        }
      }
      sheets.push(rows);
      result[sheetName] = sheets;
    }
    return result;
  },
  /**
   * 
   * write xlsx file, data => file
   * 
   * @param {any} filepath
   * @param {any} data
   */
  writeXLSX(filepath, data) {
    let workbook,
      sheetName = path.basename(filepath, path.extname(filepath));
    data.map((sheets, j) => {
      sheets = sheets.map((v, i) => Object.assign({}, {
        v: v,
        position: String.fromCharCode(65 + i) + (j + 1)
      })).reduce((prev, next) => Object.assign({}, prev, {
        [next.position]: {
          v: next.v
        }
      }), {});
      workbook = Object.assign({}, workbook, sheets)
    })
    let position = Object.keys(workbook);
    let ref = position[0] + ':' + position[position.length - 1];
    let wb = {
      SheetNames: [sheetName],
      Sheets: {
        [sheetName]: Object.assign({}, workbook, {
          '!ref': ref
        })
      }
    }
    XLSX.writeFile(wb, filepath);
  }
}

module.exports = Xlsxer;