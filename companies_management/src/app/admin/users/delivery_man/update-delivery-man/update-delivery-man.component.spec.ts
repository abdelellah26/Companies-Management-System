import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeliveryManComponent } from './update-delivery-man.component';

describe('UpdateDeliveryManComponent', () => {
  let component: UpdateDeliveryManComponent;
  let fixture: ComponentFixture<UpdateDeliveryManComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDeliveryManComponent]
    });
    fixture = TestBed.createComponent(UpdateDeliveryManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
