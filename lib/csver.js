const fs = require('fs');
const iconv = require('iconv-lite');

const Csver = {
  /**
   * 
   * read csv file, file => data;
   * 
   * @param {any} filepath
   * @param {string} [encode='urf-8']
   * @returns
   */
  readCSV(filepath, encode = 'utf-8') {
    let result;
    switch (encode) {
      case 'utf-8':
        result = fs.readFileSync(filepath, encode);
        break;
      case 'gbk':
        result = fs.readFileSync(filepath);
        result = iconv.decode(result, 'gbk');
        break;
      default:
        console.info('csv reader不识别的编码%s，转为utf-8编码。', encode);
        break;
    }
    return result;
  },
  // write
  /**
   * write csv file, data => file;
   * 
   * @param {any} filepath
   * @param {any} data
   * @param {string} [encode='utf-8']
   * @returns
   */
  writeCSV(filepath, data, encode = 'utf-8') {
    let type = Object.prototype.toString.call(data).slice(8, -1);
    if (type === 'String') {
      // ''
    } else if (type === 'Array') {
      // []
      if (Object.prototype.toString.call(data[0]).slice(8, -1) === 'String') {
        // ['', '']
        data = data.map(function (str) {
          str = ('' + str).replace(/"/g, '""');
          str = ['"', '"'].join(str);
          return str;
        }).join('\r\n')
      } else if (Object.prototype.toString.call(data[0]).slice(8, -1) === 'Array') {
        // [[], []]
        data = data.map(function (_arr) {
          return _arr.map(function (str) {
            str = ('' + str).replace(/"/g, '""')
            str = ['"', '"'].join(str)
            return str;
          }).join(',')
        }).join('\r\n')
      } else {
        console.error('csv writer不识别的数据格式，请传入字符串或者二维数组。');
      }
    } else {
      console.error('csv writer不识别的数据格式，请传入字符串或者二维数组。');
    }
    switch (encode) {
      case 'utf-8':
        break;
      case 'gbk':
        data = iconv.encode(data, 'gbk');
        break;
      default:
        console.info('csv writer不识别的编码%s，转为utf-8编码。', encode);
        break;
    }
    fs.writeFileSync(filepath, data);
  }
}

module.exports = Csver;