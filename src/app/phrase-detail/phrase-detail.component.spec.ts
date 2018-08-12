import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhraseDetailComponent } from './phrase-detail.component';

describe('PhraseDetailComponent', () => {
  let component: PhraseDetailComponent;
  let fixture: ComponentFixture<PhraseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhraseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhraseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
