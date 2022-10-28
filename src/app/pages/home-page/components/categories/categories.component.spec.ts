import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let categoriesElement: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    categoriesElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have at least one <button> element', () => {
    const button = categoriesElement.querySelector('button');

    expect(button).toBeDefined();
  })
});
