const operator = require('../index.js');
const path = require('path');

// const str = operator.read(path.join(__dirname, '../assets/in_csv.csv'), 'utf-8');
// console.log(str);
// operator.write(path.join(__dirname, '../assets/out.csv'), str);
// operator.write(path.join(__dirname, '../assets/out_gbk.csv'), str, 'gbk');

// const arr = [['name','age'], ['as', '21'], ['a,s', '22']];
// operator.write(path.join(__dirname, '../assets/out1.csv'), arr);

// const _str = '123';
// operator.write(path.join(__dirname, '../assets/out2.csv'), _str);

// const _obj = {name: 'a,s"ssss', age: 20};
// operator.write(path.join(__dirname, '../assets/out3.csv'), _obj);

// const _arr = [{name: 'a"sddd\r\n', age: 20}, {name: 'asd', age: 30}];
// operator.write(path.join(__dirname, '../assets/out4.csv'), _arr);

// const gstr = operator.read(path.join(__dirname, '../assets/zn.csv'), 'gbk');
// console.log(gstr);
// operator.write(path.join(__dirname, '../assets/out5_gbk.csv'), gstr, 'gbk');

const str = operator.read(path.join(__dirname, '../assets/xlsx-in.xlsx'));
console.log(str);
// operator.write(path.join(__dirname, '../assets/xlsx-out.xlsx'))


let _str = [{name: 1, age: 2}, {name: 3, age: 4}]
_str = []
let temp = [];
let i = 0;
while(i < 30){
  temp.push(i);
  i++;
}
_str.push(temp);
// let _str = {name: 1, age: 2}
// let _str = [['name','age'], ['as', '21'], ['a,s', '22']]
// operator.write(path.join(__dirname, '../assets/out_gbk.csv'), _str, 'gbk');
operator.write(path.join(__dirname, '../assets/xlsx-out.xlsx'), _str);