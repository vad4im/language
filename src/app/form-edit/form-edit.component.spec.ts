import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClausesKitDetailComponent } from './form-edit.component';

describe('ClausesKitDetailComponent', () => {
  let component: ClausesKitDetailComponent;
  let fixture: ComponentFixture<ClausesKitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClausesKitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClausesKitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
