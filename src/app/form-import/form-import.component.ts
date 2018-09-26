import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CvsParse } from '../components/parse-data/csv-parse.component';
import { CsvConf } from '../components/parse-data/csv-conf';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../field.interface';

@Component({
  selector: 'app-form-import',
  templateUrl: './form-import.component.html',
  styleUrls: ['./form-import.component.css']
})
export class FormImportComponent implements OnInit {

  constructor(public _cvsParse: CvsParse,
              private _csvConf: CsvConf,
              public dialogRef: MatDialogRef<FormImportComponent>,
              @Inject(MAT_DIALOG_DATA)    public data: any
  ) { }

  parentData: any;
  targetFile: FileList;
  formImportConfig: any;
  resultData: Observable<{}>;

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
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  fieldConfig: FieldConfig[] = [
      {
        type: 'select',
        label: 'Encoding',
        inputType: 'text',
        name: 'encoding',
        value: 'windows-1251',
        options: ['windows-1251', 'UTF-8']
      },
    {
      type: 'checkboxBlock',
      label: 'cellList',
      name: 'cellList',
      options : [
        'id',
        'orig',
        'transl'
      ],
      value: [
        'orig',
        'transl'
      ]
    }
    ];

  setCsvConf(data) {
    this._csvConf = data;
  }

  getCsvConf(): CsvConf {
    return this._csvConf;
  }

  ngOnInit() {
    this._csvConf.impCsvRows(['orig', 'transl']);
    this.parentData = this.data;
  }

  submit(value: any) {}

  setConfig(value: any) {
    console.log('submit setConfig -> ' + value);
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
    const tmpData =  this._cvsParse.getConvertData( inData, this._csvConf);
    return Observable.of(tmpData);
}

  public getFileData(): Observable<string> {
    if (this.targetFile && this.targetFile.length > 0) {
      const file: File = this.targetFile.item(0);
      return Observable.create((observable) => {
        const fileReader = new FileReader;
        fileReader.readAsText(file, 'windows-1251');
        fileReader.onload = (() => {
          observable.next(fileReader.result);
          observable.complete();
        });
      });
    }
  }

  onNoClick(): void { this.dialogRef.close(); }
}
