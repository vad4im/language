import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Phrase} from '../Phrase';
import { PhraseService } from '../phrase.service';
import {ClausesKit} from '../clausesKit';
import {ClausesKitService} from '../clauses-kit.service';

import {FormEditComponent} from '../form-edit/form-edit.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-clauses',
  templateUrl: './clauses.component.html',
  styleUrls: ['./clauses.component.css']
})
export class ClausesComponent implements OnInit {

  clauses: Observable<{}>;
  currentClauses: Phrase;
  newClauses: Phrase;
  clausesKit: ClausesKit;
  formFields: string[] = ['clausesKitId', 'id', 'orig', 'origTr', 'transl', 'translTr'];

  settingsToChild = {
    pageStt: {pageSizeOptions: [1, 3, 9],
      showFirstLastButtons: false,
      pageSize: 6,
    },
    checkColumn: { name: 'check',
      multiselect: false
    },
    sort: {active: 'id', direction: 'desc' },
    cell:[
        {name: '_id', def: '_id'},
        {name: 'clausesKitId', def: 'clausesKitId'},
        {name: 'id', def: 'id'},
        {name: 'orig', def: 'orig'},
        {name: 'origTr', def: 'origTr'},
        {name: 'transl', def: 'transl'},
        {name: 'translTr', def: 'translTr'},
        {name: 'origSound', def: 'origSound'},
        {name: 'translSound', def: 'translSound'}
      ],
    sellVisible:  ['id', 'orig', 'origTr', 'transl', 'translTr' ]
  };

  constructor(private phraseService: PhraseService,
              private share: ClausesKitService
               , public dialog: MatDialog
  ) {

    this.share.onClausesKitSetCurrent.subscribe(
       data  =>  this.getClausesOfRefChange(data)
   );
  }


  ngOnInit() {
    this.settingsToChild.sellVisible.unshift(this.settingsToChild.checkColumn.name);
    // this.getClauses();
  }

  getClauses(data): void {
    this.clauses =  this.phraseService.getClauses();
  }

  getClausesOfRefChange(parClausesKit: ClausesKit): void {
    console.log('Clauses KIT ref change id:' + parClausesKit._id + ' load data ..');
    this.clausesKit = parClausesKit;
    this.currentClauses = null;
    this.newClauses = new Phrase(this.clausesKit._id);
    this.clauses =  this.phraseService.getClausesOfRef(this.clausesKit._id);
  }
   add(phrase: Phrase): void {
   console.log('clauses.component add phrase info: '  + phrase.orig + ' ' + phrase.clausesKitId );
     this.phraseService.addPhrase(phrase)
       .subscribe(retPhrase => {
         // this.clauses.push(retPhrase);
       });
   }

   delete(phrase: Phrase): void {
     this.phraseService.deletePhrase(phrase).subscribe();
   }



  openDelDialog(): void {
    this.delete(this.currentClauses);
    // this.getClausesKit();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(FormEditComponent, {
      width: '320px',
      data: this.newClauses.getFieldConfig(this.formFields)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.add(result);
        this.newClauses = this.newClauses.deserialize(result);
        this.add(this.newClauses);
      }
    });
  }
  openEditDialog(): void {
    const dialogRef = this.dialog.open(FormEditComponent, {
      width: '320px',
      data: this.currentClauses.getFieldConfig(this.formFields)

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.currentClauses = this.currentClauses.deserialize(result);
      }
    });
  }


  choiseEvent(data){
    if (data.isSelect) {
      // console.log('clauses choise envent1 data: ' + data.row.orig + ' ' + data.row.clausesKitId)
      this.currentClauses = new Phrase(this.newClauses.clausesKitId).deserialize(data.row);
      // console.log('clauses choise envent1.5 data: ' + this.currentClauses.orig + ' ' + this.currentClauses.clausesKitId)
      this.newClauses.id = data.cnt + 1;
      // console.log('clauses choise envent2 data: ' + this.currentClauses.orig + ' ' + this.currentClauses.clausesKitId)
    } else {
      this.currentClauses = null;
    }
    // console.log('clauses choise envent3 data: ' + this.currentClauses.orig + ' ' + this.currentClauses.clausesKitId)
  }

}
