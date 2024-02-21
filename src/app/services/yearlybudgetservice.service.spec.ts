import { TestBed } from '@angular/core/testing';

import { YearlybudgetserviceService } from './yearlybudgetservice.service';

describe('YearlybudgetserviceService', () => {
  let service: YearlybudgetserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearlybudgetserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
