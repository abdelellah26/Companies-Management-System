import { TestBed } from '@angular/core/testing';

import { GetDeliveryManService } from './get-delivery-man.service';

describe('GetDeliveryManService', () => {
  let service: GetDeliveryManService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDeliveryManService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
