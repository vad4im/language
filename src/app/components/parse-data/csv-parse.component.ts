import { Injectable} from '@angular/core';
import { CsvUtil } from './csv-util';
import { CsvConf } from './csv-conf';

 // @Component({
 //    template: ``
 // })
 @Injectable()
export class CvsParse  {

  constructor(private _fileUtil: CsvUtil,
              private _csvConf: CsvConf
  ) { }


  setCsvRows(rowsInfo) {
    this._csvConf.csvRows.cellDef = rowsInfo.cellDef;
    this._csvConf.csvRows.headerDef  = rowsInfo.headerDef;
    this._csvConf.csvRows.headerLength = this._csvConf.csvRows.headerDef.length;
  }

  setCsvConf(data) {
    this._csvConf = data;
  }

  getCsvConf(): CsvConf {
    return this._csvConf;
  }


  // METHOD CALLED WHEN CSV FILE IS IMPORTED
  getConvertData(inData, inCsvRows): any {
      this.setCsvRows(inCsvRows);

      const csvRecordsArray = this._fileUtil.splitData(inData, this._csvConf);

      if (this._csvConf.isHeaderPresentFlag) {
        this._csvConf.csvRows.headerDef = this._fileUtil.getHeaderArray(csvRecordsArray, this._csvConf);
        this._csvConf.csvRows.headerLength = this._csvConf.csvRows.headerDef.length;
      }
      // console.log( csvRecordsArray);
      return this._fileUtil.getDataJson(csvRecordsArray, this._csvConf);
  }

}
