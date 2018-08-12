// https://stackblitz.com/edit/angular-material2-issue-gqmbva?file=app%2Fapp.component.ts
import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { SimpleTableService } from '../Simple-Table.Service';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTableComponent implements OnInit, AfterViewInit  {

  @Input() state: any[];
  @Output() getSourceDataFlag = new EventEmitter<number>();

  @Input() parentSettings;
  @Input() parentMessage;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<any>();

  constructor(private simpleTableService: SimpleTableService) {}

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
  // Правило вызова функций №2: В функции, вызванной с использованием синтаксиса вызова метода,
  // например, obj.myFunction() или obj['myFunction'](), this будет иметь значение obj.

  getSourceData() {
    this.simpleTableService.getClausesKitData()
      .subscribe(data => this.dataSource.data = data);
  }

  // public getSourceData(index: number) {
  //   this.getSourceDataFlag.emit(index);
  // }
}
