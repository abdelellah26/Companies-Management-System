import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientsComponent } from './all-clients.component';

describe('AllClientsComponent', () => {
  let component: AllClientsComponent;
  let fixture: ComponentFixture<AllClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllClientsComponent]
    });
    fixture = TestBed.createComponent(AllClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
