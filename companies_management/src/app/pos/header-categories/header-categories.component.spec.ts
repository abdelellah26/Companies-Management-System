import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCategoriesComponent } from './header-categories.component';

describe('HeaderCategoriesComponent', () => {
  let component: HeaderCategoriesComponent;
  let fixture: ComponentFixture<HeaderCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderCategoriesComponent]
    });
    fixture = TestBed.createComponent(HeaderCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
