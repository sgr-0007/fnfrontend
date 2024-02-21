import { TestBed } from '@angular/core/testing';

import { CreditlimitService } from './creditlimit.service';

describe('CreditlimitService', () => {
  let service: CreditlimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditlimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
