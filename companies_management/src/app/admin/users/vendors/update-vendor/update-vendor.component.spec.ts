import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVendorComponent } from './update-vendor.component';

describe('UpdateVendorComponent', () => {
  let component: UpdateVendorComponent;
  let fixture: ComponentFixture<UpdateVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateVendorComponent]
    });
    fixture = TestBed.createComponent(UpdateVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
