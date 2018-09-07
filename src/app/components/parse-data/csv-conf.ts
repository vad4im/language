import { Injectable } from '@angular/core';

@Injectable()

export class CsvConf {
    csvRows = {headerDef: [],
               cellDef: {},
               headerLength: -1};
    delimiter = {
      tokenDataDelimeter: /\r\n|\n/,
      tokenRowDelimeter: null,
      tokenColDelimeter: ';',
      isEmptyRowUseFlag: false
   }
    isHeaderPresentFlag: true;
    validateHeaderAndRecordLengthFlag: true;
    valildateFileExtenstionFlag: true;

}
