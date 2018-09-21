import { Injectable} from '@angular/core';
import { CsvUtil } from './csv-util';

 // @Component({
 //    template: ``
 // })
 @Injectable()
export class CvsParse  {

  constructor(private _fileUtil: CsvUtil
  ) { }

  // METHOD CALLED WHEN CSV FILE IS IMPORTED
  getConvertData(inData, csvConf): any {
      const csvRecordsArray = this._fileUtil.splitData(inData, csvConf);

      if (csvConf.isHeaderPresentFlag && csvConf.isCanGetHeaderFlag) {
        csvConf.csvRows.impCsvRowc( this._fileUtil.getHeaderArray(csvRecordsArray, csvConf));
      }
      return this._fileUtil.getDataJson(csvRecordsArray, csvConf);
  }

}
