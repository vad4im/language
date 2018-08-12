import { TestBed, inject } from '@angular/core/testing';

import { ClausesKitService } from './clauses-kit.service';

describe('ClausesKitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClausesKitService]
    });
  });

  it('should be created', inject([ClausesKitService], (service: ClausesKitService) => {
    expect(service).toBeTruthy();
  }));
});
