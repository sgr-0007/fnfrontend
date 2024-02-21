import { TestBed } from '@angular/core/testing';

import { RolemappingService } from './rolemapping.service';

describe('RolemappingService', () => {
  let service: RolemappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolemappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
