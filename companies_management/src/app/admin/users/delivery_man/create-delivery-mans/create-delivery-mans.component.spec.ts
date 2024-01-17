import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeliveryMansComponent } from './create-delivery-mans.component';

describe('CreateDeliveryMansComponent', () => {
  let component: CreateDeliveryMansComponent;
  let fixture: ComponentFixture<CreateDeliveryMansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDeliveryMansComponent]
    });
    fixture = TestBed.createComponent(CreateDeliveryMansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
