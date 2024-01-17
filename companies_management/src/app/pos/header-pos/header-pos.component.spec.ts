import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPosComponent } from './header-pos.component';

describe('HeaderPosComponent', () => {
  let component: HeaderPosComponent;
  let fixture: ComponentFixture<HeaderPosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderPosComponent]
    });
    fixture = TestBed.createComponent(HeaderPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
