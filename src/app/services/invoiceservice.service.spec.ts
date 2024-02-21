import { TestBed } from '@angular/core/testing';

import { InvoiceserviceService } from './invoiceservice.service';

describe('InvoiceserviceService', () => {
  let service: InvoiceserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
