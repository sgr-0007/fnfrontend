import { TestBed } from '@angular/core/testing';

import { LastloginserviceService } from './lastloginservice.service';

describe('LastloginserviceService', () => {
  let service: LastloginserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastloginserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
