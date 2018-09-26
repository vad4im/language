import { Injectable } from '@angular/core';

@Injectable()

export class CellDef {name: string;
                      pos: number;
                      active: boolean;
                      constructor(name: string, pos: number, active: boolean){
                        this.name = name;
                        this.active = active;
                        this.pos = pos;
                      }
                      }

export class CsvConf {
  get csvRows(): CellDef[] {
    return this._csvRows;
  }

  set csvRows(value: CellDef[]) {
    this._csvRows = value;
    this._csvRows.sort((a, b) => a.pos - b.pos );
  }

    private _csvRows : CellDef[];
    delimiter = {
      tokenDataDelimeter: /\r\n|\n/,
      tokenRowDelimeter: null,
      tokenColDelimeter: ';',
      isEmptyRowUseFlag: false
   };
    isHeaderPresentFlag: false;
    isCanGetHeaderFlag: false;
    validateHeaderAndRecordLengthFlag: true;
    valildateFileExtenstionFlag: true;

  impCsvRows (cells: string[]) {
    this._csvRows = [];
    cells.forEach((item, i, r) => (
      this._csvRows.push(new CellDef(item, i, true))
      )
    );
    this._csvRows.sort((a, b) => a.pos - b.pos );
  }
  getCsvRowsCnt(activeFlag: boolean): number {
    const result = this._csvRows.reduce((cnt, current) => {
                    return cnt + ((current.active === activeFlag) ? 1:0);
                 }, 0
    )
    return result;
  }

}
