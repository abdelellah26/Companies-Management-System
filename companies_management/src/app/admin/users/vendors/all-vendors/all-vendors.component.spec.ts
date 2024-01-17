import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVendorsComponent } from './all-vendors.component';

describe('AllVendorsComponent', () => {
  let component: AllVendorsComponent;
  let fixture: ComponentFixture<AllVendorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllVendorsComponent]
    });
    fixture = TestBed.createComponent(AllVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
