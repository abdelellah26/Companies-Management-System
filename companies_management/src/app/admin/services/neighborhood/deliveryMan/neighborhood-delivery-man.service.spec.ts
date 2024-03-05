import { TestBed } from '@angular/core/testing';

import { NeighborhoodDeliveryManService } from './neighborhood-delivery-man.service';

describe('NeighborhoodDeliveryManService', () => {
  let service: NeighborhoodDeliveryManService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeighborhoodDeliveryManService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
