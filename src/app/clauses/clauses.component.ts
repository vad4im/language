import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import {Phrase} from '../Phrase';
import { PhraseService } from '../phrase.service';
import {ClausesKit} from '../clausesKit';
import {ClausesKitService} from '../clauses-kit.service';

import { FormEditComponent } from '../form-edit/form-edit.component';
import { FormImportComponent } from '../form-import/form-import.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-clauses',
  templateUrl: './clauses.component.html',
  styleUrls: ['./clauses.component.css']
})
export class ClausesComponent implements OnInit {
  allTypeKitClausesSelect: boolean;
  clauses: Observable<{}>;
  currentClauses: Phrase;
  newClauses: Phrase;
  clausesKit: ClausesKit;

  formFields: string[] = ['clausesKitId', 'id', 'orig', 'origTr', 'transl', 'translTr'];
  tableFields: string[] = ['id', 'orig', 'origTr', 'transl', 'translTr' ];
  settingsToChild: any;

  constructor(private phraseService: PhraseService,
              private share: ClausesKitService
               , public dialog: MatDialog
  ) {

    this.share.onClausesKitSetCurrent.subscribe(
       data  =>  this.onRefChange(data)
   );
  }


  ngOnInit() {
    this.settingsToChild = Phrase.createTableViewConf(this.tableFields, false );
    this.allTypeKitClausesSelect = false;

    // this.getClauses();
    //  for (const key in this.settingsToChild) {
    //      console.log( "Ключ: " + key + " значение: " + this.settingsToChild[key] );
    //      for (const key2 in this.settingsToChild[key]){
    //        console.log( "Ключ: " + key2 + " значение: " + this.settingsToChild[key][key2] );
    //      };
    //  };

  }

  onRefChange(parClausesKit: ClausesKit): void {
    console.log('Clauses KIT ref change id:' + parClausesKit._id + ' load data ..');
    this.clausesKit = parClausesKit;
    this.currentClauses = null;
    this.newClauses = new Phrase(this.clausesKit._id);
    this.getClauses();
  }

  getClauses() {
    if (this.allTypeKitClausesSelect) {
      this.clauses = this.phraseService.getClauses();
    } else {
      this.clauses = this.phraseService.getClausesOfRef(this.clausesKit._id);
    }
  }

   addClausesList(clauses): Observable<Phrase[]> {
   // console.log('clauses.component add phrase info: '  + phrase.orig + ' ' + phrase.clausesKitId );
     const resultObservables = [];
     for (let i = 0; i < clauses.length; i++ ) {
       const response = this.phraseService.addPhrase(this.newClauses.getEditedFieldsList(clauses[i]));
       resultObservables.push(response);
     }
     return Observable.forkJoin(resultObservables);
   }

   deleteClauses(phrase: Phrase): Observable<any> {
     return this.phraseService.deletePhrase(phrase);
       // .subscribe();
   }

   updateClauses(phrase: Phrase): Observable<any> {
     return this.phraseService.updatePhrase(phrase);
       // .subscribe();
   }

  openDelDialog(): void {
    this.deleteClauses(this.currentClauses)
      .subscribe( data => {
          // del from array ???
          this.getClauses();
        }
      );
  }

  openAddListDialog(): void {
    const dialogRef = this.dialog.open(FormImportComponent, {
      width: '700px',
      data: this.newClauses
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('open Add List Dialog result.length:' + result.length);
    });

    // const clausesList = [{orig: 'word1', transl: 'слово1'}, {orig: 'word2', transl: 'слово2'}];
    // this.addClausesList(clausesList)
    //   .subscribe( data => {
    //     this.getClauses();
    //   }
    //   );

  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(FormEditComponent, {
      width: '320px',
      data: Phrase.createFieldsEditListConf(this.newClauses, this.formFields)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.phraseService.addPhrase(this.newClauses.getEditedFieldsList(result) )
          .subscribe(
            data => {
              // add to array ???
              this.getClauses();
            }
          );
      }
    });
  }
  openEditDialog(): void {
    const dialogRef = this.dialog.open(FormEditComponent, {
      width: '320px',
      data: Phrase.createFieldsEditListConf(this.currentClauses, this.formFields)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateClauses((result as Phrase).getEditedFieldsList(this.currentClauses))
            .subscribe(
               data => {Phrase.serialize(this.currentClauses, data); }
        );
      }
    });
  }


  choiseEvent(data) {
    if (data.isSelect) {
      this.currentClauses = data.row;
      this.newClauses.id = data.cnt + 1;
    } else {
      this.currentClauses = null;
    }
  }

}
