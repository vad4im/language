import { Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ClausesKitDetailComponent} from '../clauses-kit-detail/clauses-kit-detail.component';
import {ClausesKit} from '../ClausesKit';

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

  openAddDialog(): void {
    console.log('Start dialog opening');
    const dialogRef = this.dialog.open(ClausesKitDetailComponent, {
      width: '320px',
      data: this.clausesKit = new ClausesKit
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.clausesKit = result;
    });
  }
}
