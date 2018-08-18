import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClausesKitComponent } from './clauses-kit.component';

describe('ClausesKitComponent', () => {
  let component: ClausesKitComponent;
  let fixture: ComponentFixture<ClausesKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClausesKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClausesKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
