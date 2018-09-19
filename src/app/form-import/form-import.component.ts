import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CvsParse } from '../components/parse-data/csv-parse.component';
import {FormEditComponent} from '../form-edit/form-edit.component';


@Component({
  selector: 'app-form-import',
  templateUrl: './form-import.component.html',
  styleUrls: ['./form-import.component.css']
})
export class FormImportComponent implements OnInit {

  constructor(public _cvsParse: CvsParse,
              public dialogRef: MatDialogRef<FormImportComponent>,
              @Inject(MAT_DIALOG_DATA)    public data: any
  ) { }

  regFieldf: any;
  resultData: Observable<{}>;
  targetFile: FileList;

  tableSettings = {
    pageStt: {
      // pageSizeOptions: [1, 3, 9],
      showFirstLastButtons: false,
      pageSize: 6,
    },
    checkColumn: {
      name: 'check',
      multiselect: false
    },
    cells: [{name: 'id', label: 'id'}, {name: 'orig', label: 'orig' }, {name: 'transl', label: 'transl'}], //
    sort: {
      active: 'orig', direction: 'desc'
    },
    sellVisible: ['orig', 'transl'] //
  };


  ngOnInit() {
    this.regFieldf = this.data;
  }

  public changeListener(files: FileList) {
    this.targetFile = files;
  }

  public createData() {
    this.getFileData()
      .subscribe( data => {
          // del from array ???
        this.resultData = this.convertData(data);
        }
      );
  }

  public convertData(inData: string): Observable<any> {
    const tmpData =  this._cvsParse.getConvertData( inData, {headerDef: ['orig', 'transl'],
                                                             cellDef: ['orig', 'transl']});
    return Observable.of(tmpData);
}

  public getFileData(): Observable<string> {
    if (this.targetFile && this.targetFile.length > 0) {
      const file: File = this.targetFile.item(0);
      return Observable.create((observable) => {
        const fileReader = new FileReader;
        fileReader.readAsText(file, 'windows-1251'); //'UTF-8' !!!!!!!!!!!!!!!!!!!!!
        fileReader.onload = (() => {
          observable.next(fileReader.result);
          observable.complete();
        });
      });
    }
  }

  onNoClick(): void { this.dialogRef.close(); }
}
