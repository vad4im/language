import { Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormEditComponent} from '../form-edit/form-edit.component'
import {ClausesKit} from '../clausesKit';

@Component({
  selector: 'app-clauses-kit',
  templateUrl: './clauses-kit.component.html',
  styleUrls: ['./clauses-kit.component.css']
})
export class ClausesKitComponent implements OnInit {
  clausesKit: ClausesKit;
  constructor(public dialog: MatDialog)  { }

  ngOnInit() {
  }

  openAddDialog(editData): void {
    console.log('Start dialog opening');
    const dialogRef = this.dialog.open(FormEditComponent, {
      width: '320px',
      data: editData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.clausesKit = result;
    });
  }
}
