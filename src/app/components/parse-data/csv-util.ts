import { Injectable } from '@angular/core';
import {CsvConf} from './csv-conf';

@Injectable()
export class CsvUtil {

  constructor() {}

  isCSVFile(file) {
    return file.name.endsWith('.csv');
  }

  splitData(inData, csvConf: CsvConf): any[] {
    const headerLength: number = csvConf.getCsvRowsCnt(true);
    const retData = [];
    let rowData = '';
    if (csvConf.delimiter.tokenRowDelimeter !== null) {
      return inData.split(csvConf.delimiter.tokenRowDelimeter );
    } else {
      const arrData = inData.split(csvConf.delimiter.tokenDataDelimeter);
      let cnt = 1;
      for (let i = 0; i < arrData.length; i++) {
        if (csvConf.delimiter.isEmptyRowUseFlag || arrData[i].length > 0) {
          rowData = rowData + csvConf.delimiter.tokenColDelimeter + arrData[i];
          cnt++;
        }
        if (cnt >  headerLength ) {
          retData.push( rowData.substring(csvConf.delimiter.tokenColDelimeter.length)  );
          cnt = 1;
          rowData = '';
        }
      }
      if (cnt !== 1) {
        alert('last row das not hav all data');
      }
    }
    return retData;
  }

  getHeaderArray(csvRecordsArr, csvConf: CsvConf) {
    const headers = csvRecordsArr[0].split(csvConf.delimiter.tokenRowDelimeter);
    const headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  validateHeaders(origHeaders, fileHeaaders) {
    if (origHeaders.length !== fileHeaaders.length) {
      return false;
    }

    let fileHeaderMatchFlag = true;
    for (let j = 0; j < origHeaders.length; j++) {
      if (origHeaders[j] !== fileHeaaders[j]) {
        fileHeaderMatchFlag = false;
        break;
      }
    }
    return fileHeaderMatchFlag;
  }

  convertObject(desc, data): any {
    const ret = new Object();
    for (let i = 0; i < desc.length; i++) {
      ret[desc[i].name] = data[i];
    }
    return ret;
  }

  getDataJson(csvRecordsArray, csvConf: CsvConf) {
    const headerLength: number = csvConf.getCsvRowsCnt(true);
    const dataArr = [];
    for (let i = csvConf.isHeaderPresentFlag ? 1 : 0; i < csvRecordsArray.length; i++) {
      const data = (csvRecordsArray[i].split(csvConf.delimiter.tokenColDelimeter));
      if (csvConf.validateHeaderAndRecordLengthFlag && data.length !== headerLength) {
        if (data === '') {
          alert('Extra blank line is present at line number ' + i + ', please remove it.');
          return null;
        } else {
 alert('Record at line number ' + i + ' contain ' + data.length +
       ' tokens, and is not matching with header length of :' + headerLength);
          return null;
        }
      }
      dataArr.push(this.convertObject(csvConf.csvRows, data));
    }
     return dataArr;
  }

}
