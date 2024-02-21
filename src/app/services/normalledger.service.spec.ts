import { TestBed } from '@angular/core/testing';

import { NormalledgerService } from './normalledger.service';

describe('NormalledgerService', () => {
  let service: NormalledgerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormalledgerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
