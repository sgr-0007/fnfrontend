import { TestBed } from '@angular/core/testing';

import { SalenoteService } from './salenote.service';

describe('SalenoteService', () => {
  let service: SalenoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalenoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
