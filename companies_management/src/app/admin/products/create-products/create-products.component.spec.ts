import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductsComponent } from './create-products.component';

describe('CreateProductsComponent', () => {
  let component: CreateProductsComponent;
  let fixture: ComponentFixture<CreateProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProductsComponent]
    });
    fixture = TestBed.createComponent(CreateProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
