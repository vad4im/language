import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-form-import',
  templateUrl: './form-import.component.html',
  styleUrls: ['./form-import.component.css']
})
export class FormImportComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormImportComponent>,
              @Inject(MAT_DIALOG_DATA)    public data: any
  ) { }

  regFieldf: any;
  resultData: Observable<{}>;
  targetFile: FileList;

  settingsToChild = {
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
  }


  ngOnInit() {
    this.regFieldf = this.data;
    // this.resultData = [{orig: 'word1', transl: 'слово1'}, {orig: 'word2', transl: 'слово2'}];
  }

  public changeListener(files: FileList) {
    this.targetFile = files;
  }

  public createData() {
    this.resultData = this.convertData(this.getFileData());
  }

  public convertData(inData: string): Observable<any> {
    const tmpData = [{orig: 'word1', transl: 'слово1'}, {orig: 'word2', transl: 'слово2'}];
    return Observable.of(tmpData);
}

  public getFileData(): string {
    let csv: string = null;
    // console.log(this.targetFile);
    if (this.targetFile && this.targetFile.length > 0) {
      const file: File = this.targetFile.item(0);
      // console.log(file.name);
      // console.log(file.size);
      // console.log(file.type);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
         csv = reader.result;
      };
    }
    return csv;
  }

  onNoClick(): void { this.dialogRef.close(); }
}
