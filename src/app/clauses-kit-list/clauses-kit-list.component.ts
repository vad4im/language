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

  formFields: string[] = ['clausesKitId', 'clausesName', 'origLang', 'translLang', 'sourceUrl'];
  tableFields: string[] = ['id', 'clausesName', 'origLang', 'translLang', 'sourceUrl' ];

  settingsToChild: any;

  constructor(private clausesKitService: ClausesKitService,
              private share: ClausesKitService,
              public dialog: MatDialog){
  }

  ngOnInit() {
    this.settingsToChild = ClausesKit.createTableViewConf(this.tableFields, false );
    // this.settingsToChild.sellVisible.unshift(this.settingsToChild.checkColumn.name);
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

  addClausesKit(orig: ClausesKit): Observable<any>{
    // console.log('clauses.component.add : ' +  orig + ' - ' + this.clausesKit._id );
    return this.clausesKitService.addClausesKit(orig);
  }

  deleteClausesKit(rec : ClausesKit): Observable<any>{
    return this.clausesKitService.deleteClausesKit(rec);
  }
  updateClausesKit(rec : ClausesKit): Observable<any> {
    return this.clausesKitService.updateClausesKit(rec);
  }
  openDelDialog(): void {
    this.deleteClausesKit(this.currentClausesKit)
      .subscribe( data => {
        // del from array ???
        this.getClausesKit();
      }
    );
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(FormEditComponent, {
      width: '320px',
      data: ClausesKit.createFieldsEditListConf(this.newClausesKit, this.formFields)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addClausesKit(ClausesKit.getEditedFieldsList(this.newClausesKit, result))
          .subscribe(
            data => {
              // add to array ???
              this.getClausesKit();
            }
          )
      }
    });
  }
  openEditDialog(): void {
    const dialogRef = this.dialog.open(FormEditComponent, {
      width: '320px',
      data: ClausesKit.createFieldsEditListConf(this.currentClausesKit, this.formFields)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateClausesKit(ClausesKit.getEditedFieldsList(this.currentClausesKit, result))
          .subscribe(
            data => {ClausesKit.serialize(this.currentClausesKit, data);}
          );
      }
    });
  }

  setKitCurrent(data) : void {
    this.selectedClausesKit = this.currentClausesKit;
    this.share.setCurrentKitName(this.selectedClausesKit);
    console.log('ClauaesKITList.setKitCurrent');
  }

}
