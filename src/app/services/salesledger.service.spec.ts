import { TestBed } from '@angular/core/testing';

import { SalesledgerService } from './salesledger.service';

describe('SalesledgerService', () => {
  let service: SalesledgerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesledgerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
