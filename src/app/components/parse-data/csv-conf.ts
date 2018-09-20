import { Injectable } from '@angular/core';

@Injectable()

export class CsvConf {
    csvRows = {cellDef: [],
               headerLength: -1};
    delimiter = {
      tokenDataDelimeter: /\r\n|\n/,
      tokenRowDelimeter: null,
      tokenColDelimeter: ';',
      isEmptyRowUseFlag: false
   }
    isHeaderPresentFlag: false;
    isCanGetHeaderFlag: false;
    validateHeaderAndRecordLengthFlag: true;
    valildateFileExtenstionFlag: true;

}
