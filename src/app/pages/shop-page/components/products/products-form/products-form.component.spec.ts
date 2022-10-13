import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFormComponent } from './products-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Product, NewProduct } from '../../../../../core/types/product';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;
  const dummyProduct = {
    title: "fake",
    description: "",
    img: "",
    price: 0,
    fuel: "",
    flag: true,
    categoryId: 4,
    id: 3
  };
  const dummyNewProduct: Omit<Product, 'id'> = dummyProduct;

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

  //title
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

  //description
  it('should make description control of maximum 80 characters', () => {
    const control = component.productForm.get('description');
    const descriptionFake = Array.from(Array(82), () => 'a').join('');

    control?.setValue(descriptionFake);

    expect(control!.valid).toBeFalsy();
  })

  //img
  it('should make img control required', () => {
    const control = component.productForm.get('img');

    control?.setValue('');

    expect(control!.valid).toBeFalsy();
  })

  //price
  it('should make price control required', () => {
    const control = component.productForm.get('price');

    control?.setValue(0);

    expect(control!.valid).toBeFalsy();
  })

  //fuel
  it('should make fuel control required', () => {
    const control = component.productForm.get('fuel');

    control?.setValue('');

    expect(control!.valid).toBeFalsy();
  })

  //createNewProductEvent
  it('should raise createNewProductEvent', () => {
    let eventValue = {};
    component.createNewProductEvent.subscribe(p => eventValue = p);

    component.createProduct(dummyNewProduct);

    expect(eventValue).toBe(dummyNewProduct);
  })

  //editProductEvent
  it('should raise editProductEvent', () => {
    let eventValue = {};
    component.editProductEvent.subscribe(p => eventValue = p);

    component.editProduct(dummyProduct);

    expect(eventValue).toBe(dummyProduct);
  })

  //setFormValues
  it('should set form values', () => {
    component.setFormValues(dummyProduct);

    expect(component.productForm.value).toEqual(dummyNewProduct);
  })

  //reset
  it('should reset form', () => {
    component.reset();

    expect(component.productForm.value.title).toBeNull();
  })

  //submit
  it('should call editProduct if productForm.value.id is true', () => {
    const editProduct = spyOn(component, 'editProduct').and.callThrough();

    component.productForm.setValue(dummyProduct);
    component.submit();

    expect(component.productForm.value).toEqual(dummyProduct);
    expect(editProduct.calls.count()).toBe(1);
  })

  it('should call createProduct if productForm.value.id is NOT true', () => {
    const createProduct = spyOn(component, 'createProduct').and.callThrough();

    component.productForm.patchValue({ id: 0 });
    component.submit();

    expect(createProduct.calls.count()).toBe(1);
  })
});

