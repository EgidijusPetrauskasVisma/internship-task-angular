import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFormComponent } from './products-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../../../core/types/product';
import { NewProduct } from 'src/app/core/types';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;
  const dummyProduct: Product = {
    title: "fake",
    description: "",
    img: "",
    price: 0,
    fuel: "",
    flag: true,
    categoryId: 4,
    id: 3
  };
  const dummyNewProduct: NewProduct = dummyProduct;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsFormComponent],
      imports: [ReactiveFormsModule]

    }).compileComponents();

    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct form controls', () => {
    expect(component.productForm.contains('title')).toBeTruthy();
    expect(component.productForm.contains('description')).toBeTruthy();
    expect(component.productForm.contains('img')).toBeTruthy();
    expect(component.productForm.contains('price')).toBeTruthy();
    expect(component.productForm.contains('fuel')).toBeTruthy();
  })

  describe('title', () => {
    it('should make title control required', () => {
      const control = component.productForm.get('title');

      control?.setValue('');

      expect(control!.valid).toBeFalsy();
    })

    it('should make title control of minimum 3 characters', () => {
      const control = component.productForm.get('title');

      control?.setValue('ah');

      expect(control!.valid).toBeFalsy();
    })
  })

  describe('description', () => {
    it('should make description control of maximum 80 characters', () => {
      const control = component.productForm.get('description');
      const descriptionFake = Array.from(Array(82), () => 'a').join('');

      control?.setValue(descriptionFake);

      expect(control!.valid).toBeFalsy();
    })
  })

  describe('img', () => {
    it('should make img control required', () => {
      const control = component.productForm.get('img');

      control?.setValue('');

      expect(control!.valid).toBeFalsy();
    })
  })

  describe('price', () => {
    it('should make price control required', () => {
      const control = component.productForm.get('price');

      control?.setValue(0);

      expect(control!.valid).toBeFalsy();
    })
  })

  describe('fuel', () => {
    it('should make fuel control required', () => {
      const control = component.productForm.get('fuel');

      control?.setValue('');

      expect(control!.valid).toBeFalsy();
    })
  })


  describe('setFormValues', () => {
    it('should set form values', () => {
      component.setFormValues(dummyProduct);

      expect(component.productForm.value).toEqual(dummyNewProduct);
    })
  })

  describe('reset', () => {
    it('should reset form', () => {
      component.reset();

      expect(component.productForm.value.title).toBeNull();
    })
  })
});

