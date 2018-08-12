import { Component, OnInit, Input } from '@angular/core';
import { Phrase } from '../phrase';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PhraseService } from '../phrase.service';

@Component({
  selector: 'app-phrase-detail',
  templateUrl: './phrase-detail.component.html',
  styleUrls: ['./phrase-detail.component.css']
})
export class PhraseDetailComponent implements OnInit {
  @Input() phrase: Phrase;

  constructor(  private route: ActivatedRoute,
                private phraseService: PhraseService,
                private location: Location) { }

  ngOnInit(): void {
    this.getPhrase();
  }

  save(): void {
    this.phraseService.updatePhrase(this.phrase)
      .subscribe(() => this.goBack());
  }

  getPhrase(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.phraseService.getPhrase(id)
      .subscribe(phrase => this.phrase = phrase);
  }

  goBack(): void {
    this.location.back();
  }

}
