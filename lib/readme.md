# XLSX

## data structure to write  
```
{
  SheetNames: ['mySheet'],
  Sheets: {
    'mySheet': {
      '!ref': 'A1:E4', // 必须要有这个范围才能输出，否则导出的 excel 会是一个空表
      A1: { v: 'id' },
      ...
    }
  }
}
```