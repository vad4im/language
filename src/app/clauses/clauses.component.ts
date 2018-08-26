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

   addClauses(phrase: Phrase): Observable<any> {
   console.log('clauses.component add phrase info: '  + phrase.orig + ' ' + phrase.clausesKitId );
     return this.phraseService.addPhrase(phrase);
       // .subscribe(retPhrase => {this.clauses.push(retPhrase);   });
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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(FormEditComponent, {
      width: '320px',
      data: Phrase.createFieldsEditListConf(this.newClauses, this.formFields)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addClauses(Phrase.getEditedFieldsList(this.newClauses, result))
          .subscribe(
            data => {
              // add to array ???
              this.getClauses();
            }
          )
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
        this.updateClauses(Phrase.getEditedFieldsList(this.currentClauses, result))
            .subscribe(
               data => {Phrase.serialize(this.currentClauses, data);}
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
