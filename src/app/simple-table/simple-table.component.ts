// https://stackblitz.com/edit/angular-material2-issue-gqmbva?file=app%2Fapp.component.ts
import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css']
})

export class SimpleTableComponent implements OnInit, AfterViewInit  {
  @Input() parentSettings;
  @Input() state;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<any>();

  selection = new SelectionModel<any>(true, []);

  @Output()choiseRequest = new EventEmitter<any>();

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  selectionToggle(row) {
    console.log('Simple-Table_component row 1 Selected id: ' + row._id + ' selected ' + this.selection.isSelected(row) + ' multiSelection count ' + this.selection.selected.length );
    if (!this.parentSettings.checkColumn.multiselect) {
      this.selection.clear();
    }
    this.selection.toggle(row);
    this.choiseRequest.emit(
      {isSel: this.selection.isSelected(row),
             cnt: this.selection.selected.length,
             ow: row}
       );
    console.log('Simple-Table_component row 1 Selected id: ' + row._id + ' selected ' + this.selection.isSelected(row) + ' multiSelection count ' + this.selection.selected.length );
    console.log(' Child !!choise event!! isSelect - ' + this.selection.isSelected(row));
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    console.log('Simple-Table_component header Selected count: ' + this.selection.selected.length );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.dataSource.data = this.state;
    this.dataSource.sort = this.sort;
  }
}
