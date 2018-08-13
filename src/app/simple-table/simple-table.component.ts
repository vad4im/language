// https://stackblitz.com/edit/angular-material2-issue-gqmbva?file=app%2Fapp.component.ts
import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { SimpleTableService } from '../Simple-Table.Service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTableComponent implements OnInit, AfterViewInit  {
  @Input() parentSettings;
  selection = new SelectionModel<any>(true, []);

  @Output() getSourceDataFlag = new EventEmitter<number>();
  @Input() parentMessage;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<any>();

  constructor(private simpleTableService: SimpleTableService) {}


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    console.log (this.getSourceDataFlag.emit(6));
    this.parentMessage()();
    this.getSourceData();
    // this.dataSource.data = this.state;
    this.dataSource.sort = this.sort;
  }
  getSourceData() {
    this.simpleTableService.getClausesKitData ( this.parentSettings.myService, this.parentSettings.myMethod.get )
      .subscribe(data => this.dataSource.data = data);
  }


}
