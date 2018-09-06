import { Injectable } from '@angular/core';

@Injectable()
export class CsvConf {
  static tokenDelimeter = ',';
  static isHeaderPresentFlag = true;
  static validateHeaderAndRecordLengthFlag = true;
  static valildateFileExtenstionFlag = true;
}
