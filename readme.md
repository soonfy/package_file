# filer

## file operator.  

  >read and write file.  
  >support csv/xlsx file format. default csv.  
  >support gbk/utf-8 file encoding. default utf-8.  

## api  

  * read file.  
  >pass absolute file path and file encoding.  

  ```
  const operator = require('file_operator_sf');
  let data = operator.read(path.join(__dirname, <filepath>), [encoding='utf-8']);
  ```

  * write file.  
  >pass absolute file path, data and file encoding.  

  ```
  const operator = require('file_operator_sf');
  operator.write(path.join(__dirname, <filepath>), data, [encoding='utf-8']);
  ```

## data format to write.  

  ```
  String
  'this is the data to write.'

  Object
  {
    attr1: value1,
    attr2: value2
  }

  Array
  ['this is another word.', 'this is a word.']
  [['attr1', 'attr2'], [value1, value2]]
  [{
    attr1: value1,
    attr2: value2
  },
  {
    attr1: value1,
    attr2: value2
  }]
  ```