import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable} from 'rxjs';
import {MatDialog} from '@angular/material';

import {ClausesKit} from '../clausesKit';
import { ClausesKitService } from '../clauses-kit.service';
import {FormEditComponent} from '../form-edit/form-edit.component';


@Component({
  selector: 'app-clauses-kit-list',
  templateUrl: './clauses-kit-list.component.html'
  // , styleUrls: ['./clauses-kit-list.component.css']
})
export class ClausesKitListComponent implements OnInit {
  selectedClausesKit: ClausesKit;
  newClausesKit: ClausesKit = new ClausesKit;
  currentClausesKit: ClausesKit;
  clausesKit: Observable<{}>;
  settingsToChild = {  pageStt: {pageSizeOptions: [1, 3, 9]
                     , showFirstLastButtons: true
                     , pageSize: 3
                     },
    checkColumn: { name: 'check',
                   multiselect: false
                  },
    sort: {active: 'id', direction: 'desc' },
    cells:
      [ {name: '_id', label: '_ID'},
            {name: 'id', label: 'ID'},
            {name: 'clausesName', label: 'Name'},
            {name: 'origLang', label: 'sLang'},
            {name: 'translLang', label: 'dLang'},
            {name: 'sourceUrl', label: 'URL'},
           ],
    sellVisible:  ['id', 'clausesName', 'origLang', 'translLang', 'sourceUrl' ]
  };
  constructor(private clausesKitService: ClausesKitService,
              private share: ClausesKitService,
              public dialog: MatDialog){
  }

  ngOnInit() {
    this.settingsToChild.sellVisible.unshift(this.settingsToChild.checkColumn.name);
    this.getClausesKit();
  }

  choiseEvent(data){
    if (data.isSelect) {
      this.currentClausesKit = data.row;
      this.currentClausesKit.id = data.cnt + 1;
    } else {
      this.currentClausesKit = null;
    }
  }

  getClausesKit() {
    this.currentClausesKit = null;
    this.newClausesKit = new ClausesKit;
    this.clausesKit =  this.clausesKitService.getClausesKit();
  }

  addClausesKit(orig: ClausesKit): void {
    // console.log('clauses.component.add : ' +  orig + ' - ' + this.clausesKit._id );
    this.clausesKitService.addClausesKit(orig)
      .subscribe(data => {
        this.getClausesKit();
      });
  }

  deleteClausesKit(rec : ClausesKit){
    this.clausesKitService.deleteClausesKit(rec)
      .subscribe( data => {
         this.getClausesKit();
      });
  }

  openDelDialog(): void {
    this.deleteClausesKit(this.currentClausesKit);
    this.getClausesKit();
  }

  openAddDialog(): void {
    // console.log('Start dialog opening');
    const dialogRef = this.dialog.open(FormEditComponent, {
      width: '320px',
      data: this.newClausesKit
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        // this.currentClausesKit = result;
        this.addClausesKit(result);
      }
    });
  }

  openEditDialog(): void {
    // console.log('Start dialog opening');
    const dialogRef = this.dialog.open(FormEditComponent, {
      width: '320px',
      data: this.currentClausesKit
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.currentClausesKit = result;
      }
    });
  }

  setKitCurrent(data) : void {
    this.selectedClausesKit = this.currentClausesKit;
    this.share.setCurrentKitName(this.selectedClausesKit);
    console.log('ClauaesKITList.setKitCurrent');
  }

}
