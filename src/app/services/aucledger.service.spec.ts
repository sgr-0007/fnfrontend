import { TestBed } from '@angular/core/testing';

import { AucledgerService } from './aucledger.service';

describe('AucledgerService', () => {
  let service: AucledgerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AucledgerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
