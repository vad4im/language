import { OnInit } from '@angular/core';
import { CsvUtil } from './csv-util';
import { CsvConf } from './csv-conf';

// @Component({
//   template: require('./test.component.html')
// })

export class CvsParse implements OnInit {

  csvRecords = [];

  constructor(private _fileUtil: CsvUtil
  ) { }

  ngOnInit() { }

  // METHOD CALLED WHEN CSV FILE IS IMPORTED
  fileChangeListener(inData): void {
      const csvRecordsArray = inData.split(/\r\n|\n/);

      var headerLength = -1;
      if (CsvConf.isHeaderPresentFlag){
        let headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, CsvConf.tokenDelimeter);
        headerLength = headersRow.length;
      }

      this.csvRecords = this._fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray,
        headerLength, CsvConf.validateHeaderAndRecordLengthFlag, CsvConf.tokenDelimeter);

      if (this.csvRecords === null){
        // If control reached here it means csv file contains error, reset file.
        this.fileReset();
      }
  }

  fileReset() {
    // this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
  }

}
