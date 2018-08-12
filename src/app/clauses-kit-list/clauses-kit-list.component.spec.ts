import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClausesKitListComponent } from './clauses-kit-list.component';

describe('ClausesKitListComponent', () => {
  let component: ClausesKitListComponent;
  let fixture: ComponentFixture<ClausesKitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClausesKitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClausesKitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
