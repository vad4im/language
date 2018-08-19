import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Phrase} from '../Phrase';
import { PhraseService } from '../phrase.service';
import {ClausesKit} from '../clausesKit';
import {ClausesKitService} from '../clauses-kit.service';

@Component({
  selector: 'app-clauses',
  templateUrl: './clauses.component.html',
  styleUrls: ['./clauses.component.css']
})
export class ClausesComponent implements OnInit {

  clauses: Observable<{}>;
  currentClauses: Phrase;
  clausesKit: ClausesKit;
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
              private share: ClausesKitService) {

    this.share.onClausesKitSetCurrent.subscribe(
       data  =>  this.clausesKit = data
      // console.log('clauses_component.clausesKit._id' + data._id);
    );
  }


  ngOnInit() {
    this.settingsToChild.sellVisible.unshift(this.settingsToChild.checkColumn.name);
    this.getClauses();
  }

  getClauses(): void {
    this.clauses =  this.phraseService.getClauses();
    // this.phraseService.getClauses()
    //   .subscribe(clauses => this.clauses = clauses);
  }
//
//   add(orig: string): void {
//     orig = orig.trim();
//     if (!orig) { return; }
// // console.log('clauses.component.add : ' +  orig + ' - ' + this.clausesKit._id );
//     this.phraseService.addPhrase({id: this.clauses.length +1, orig: orig, clausesKitId: this.clausesKit._id } as Phrase)
//       .subscribe(phrase => {
//         this.clauses.push(phrase);
//       });
//   }
//
//   delete(phrase: Phrase): void {
//     this.clauses = this.clauses.filter(h => h !== phrase);
//     this.phraseService.deletePhrase(phrase).subscribe();
//   }

  choiseEvent(data){
    if (data.isSelect) {
      this.currentClauses = data.row;
      this.currentClauses.id = data.cnt + 1;
    }else {
      this.currentClauses = null;
    }
  }

}
