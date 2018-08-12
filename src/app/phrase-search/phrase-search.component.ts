import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Phrase } from '../phrase';
import { PhraseService } from '../phrase.service';

@Component({
  selector: 'app-phrase-search',
  templateUrl: './phrase-search.component.html',
  styleUrls: ['./phrase-search.component.css']
})
export class PhraseSearchComponent implements OnInit {
  clauses$: Observable<Phrase[]>;
  private searchTerms = new Subject<string>();

  constructor(private phraseService: PhraseService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit():  void {
    this.clauses$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.phraseService.searchClauses(term)),
    );
  }

}
