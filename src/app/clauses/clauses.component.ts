import { Component, OnInit } from '@angular/core';
import {Phrase} from '../Phrase';
import { PhraseService } from '../phrase.service';
import {ClausesKit} from '../ClausesKit';
import {ClausesKitService} from '../clauses-kit.service';

@Component({
  selector: 'app-clauses',
  templateUrl: './clauses.component.html',
  styleUrls: ['./clauses.component.css']
})
export class ClausesComponent implements OnInit {
  clauses: Phrase[];
  clausesKit: ClausesKit = new ClausesKit;

  constructor(private phraseService: PhraseService,
              private share: ClausesKitService) {
    this.share.onClausesKitSetCurrent.subscribe(
       data  =>  this.clausesKit = data
      // console.log('clauses_component.clausesKit._id' + data._id);
    );
  }
  ngOnInit() {
    this.getClauses();
  }

  getClauses(): void {
    this.phraseService.getClauses()
      .subscribe(clauses => this.clauses = clauses);
  }

  add(orig: string): void {
    orig = orig.trim();

    if (!orig) { return; }
// console.log('clauses.component.add : ' +  orig + ' - ' + this.clausesKit._id );
    this.phraseService.addPhrase({id: this.clauses.length +1, orig: orig, clausesKitId: this.clausesKit._id } as Phrase)
      .subscribe(phrase => {
        this.clauses.push(phrase);
      });
  }

  delete(phrase: Phrase): void {
    this.clauses = this.clauses.filter(h => h !== phrase);
    this.phraseService.deletePhrase(phrase).subscribe();
  }

}
