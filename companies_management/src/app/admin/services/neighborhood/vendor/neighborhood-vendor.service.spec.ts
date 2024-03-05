import { TestBed } from '@angular/core/testing';

import { NeighborhoodVendorService } from './neighborhood-vendor.service';

describe('NeighborhoodVendorService', () => {
  let service: NeighborhoodVendorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeighborhoodVendorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
