import { TestBed } from '@angular/core/testing';

import { CreditlimitsService } from './creditlimits.service';

describe('CreditlimitsService', () => {
  let service: CreditlimitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditlimitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
