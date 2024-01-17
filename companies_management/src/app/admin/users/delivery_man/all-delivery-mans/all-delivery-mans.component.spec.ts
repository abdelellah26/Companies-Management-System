import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDeliveryMansComponent } from './all-delivery-mans.component';

describe('AllDeliveryMansComponent', () => {
  let component: AllDeliveryMansComponent;
  let fixture: ComponentFixture<AllDeliveryMansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDeliveryMansComponent]
    });
    fixture = TestBed.createComponent(AllDeliveryMansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
