const Csver = require('./lib/csver.js');
const Xlsxer = require('./lib/xlsxer.js');

const fs = require('fs');
const path = require('path');

const operator = {
  /**
   * 
   * file encode;
   * gbk, utf-8;
   */
  ENCODE: {
    'GBK': ['gbk', 'GBK', 'gb2312', 'GB2312'],
    'UTF8': ['utf8', 'UTF8', 'utf-8', 'UTF-8']
  },
  /**
   * 
   * file format;
   * csv, xlsx;
   */
  FORMAT: {
    'CSV': ['csv', 'CSV'],
    'XLSX': ['xlsx', 'XLSX']
  },
  /**
   * 
   * judge filepath exists;
   * @param {any} filepath
   * @returns
   */
  exists(filepath) {
    return fs.existsSync(filepath);
  },
  /**
   * 
   * '' => '';
   * {} => [[], []];
   * [[], []];
   * ['', ''] => ['', ''];
   * [{}, {}] => [[], []];
   * @param {any} source
   */
  transform(source) {
    let result = [];
    let type = Object.prototype.toString.call(source).slice(8, -1);
    if (type === 'String') {
      // ''
      result = source;
    } else if (type === 'Object') {
      // {}
      let keys = [],
        values = [];
      for (let key in source) {
        keys.push(key);
        values.push(source[key]);
      }
      result = [keys, values];
    } else if (type === 'Array') {
      // []
      if (Object.prototype.toString.call(source[0]).slice(8, -1) === 'Array' || Object.prototype.toString.call(source[0]).slice(8, -1) === 'String') {
        // [[], []], ['', '']
        result = source;
      } else if (Object.prototype.toString.call(source[0]).slice(8, -1) === 'Object') {
        // [{}, {}]
        let keys = [];
        for (let key in source[0]) {
          keys.push(key);
        }
        result.push(keys);
        for (let obj of source) {
          let values = [];
          for (let key of keys) {
            values.push(obj[key]);
          }
          result.push(values);
        }
      }
    } else {
      // error
      console.error('transformer不识别的数据格式，请传入字符串或者二维数组。');
      result = null;
    }
    return result;
  },
  /**
   * 
   * read file by format pass interface;
   * @param {any} filepath
   * @param {string} [encode='utf-8']
   * @returns
   */
  read(filepath, encode = 'utf-8') {
    if (!path.isAbsolute(filepath)) {
      console.error('为保证正确识别文件路径，请传入绝对路径。');
      return null;
    }
    if (!this.exists(filepath)) {
      console.error('文件路径%s不存在，请传入正确的路径。', filepath);
      return null;
    }
    let data,
      format = path.extname(filepath).substring(1).toLowerCase();
    encode = encode.toLowerCase();
    if (this.ENCODE['GBK'].includes(encode)) {
      encode = 'gbk';
    } else if (this.ENCODE['UTF8'].includes(encode)) {
      encode = 'utf-8';
    } else {
      console.error('reader不识别的编码%s，转为utf-8编码。', encode);
      encode = 'utf-8';
    }
    if (this.FORMAT['CSV'].includes(format)) {
      format = 'csv';
    } else if (this.FORMAT['XLSX'].includes(format)) {
      format = 'xlsx';
    } else {
      console.error('reader不识别的文件格式%s，转为csv文件。', format);
      format = 'csv';
    }
    switch (format) {
      case 'csv':
        data = Csver.readCSV(filepath, encode);
        break;
      case 'xlsx':
        data = Xlsxer.readXLSX(filepath);
        break;
      default:
        data = 'no possible';
        break;
    }
    return data;
  },
  /**
   * 
   * write file by format pass interface;
   * @param {any} filepath
   * @param {any} data
   * @param {string} [encode='utf-8']
   * @returns
   */
  write(filepath, data, encode = 'utf-8') {
    if (!path.isAbsolute(filepath)) {
      console.error('为保证正确识别文件路径，请传入绝对路径。');
      return null;
    }
    const dir = path.dirname(filepath);
    if (!this.exists(dir)) {
      console.error('文件路径%s不存在，请传入正确的路径。', dir);
      return null;
    }
    let format = path.extname(filepath).substring(1).toLowerCase();
    encode = encode.toLowerCase();
    data = this.transform(data);
    if (this.ENCODE['GBK'].includes(encode)) {
      encode = 'gbk';
    } else if (this.ENCODE['UTF8'].includes(encode)) {
      encode = 'utf-8';
    } else {
      console.error('writer不识别的编码%s，转为utf-8编码。', encode);
      encode = 'utf-8';
    }
    if (this.FORMAT['CSV'].includes(format)) {
      format = 'csv';
    } else if (this.FORMAT['XLSX'].includes(format)) {
      format = 'xlsx';
    } else {
      console.info('writer不识别的文件格式%s，转为csv文件。', format);
      format = 'csv';
    }
    switch (format) {
      case 'csv':
        Csver.writeCSV(filepath, data, encode);
        break;
      case 'xlsx':
        Xlsxer.writeXLSX(filepath, data);
        break;
      default:
        data = 'no possible';
        break;
    }
    return;
  }
}

module.exports = operator;