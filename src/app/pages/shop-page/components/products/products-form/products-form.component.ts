import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Product, NewProduct } from 'src/app/core/types';
import { id, categoryId } from '../../../../../core/constants';

@Component({
  selector: 'products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent {
  @Output() createNewProductEvent = new EventEmitter();
  @Output() editProductEvent = new EventEmitter();

  productForm = this.fb.group({
    id: [0],
    categoryId: [0],
    title: ['', [Validators.minLength(3), Validators.required]],
    description: ['', Validators.maxLength(80)],
    img: ['', Validators.required],
    price: [0, Validators.min(1)],
    fuel: ['', Validators.required],
    flag: [false],
  })

  get title() {
    return this.productForm.get('title');
  }

  get description() {
    return this.productForm.get('description');
  }

  get img() {
    return this.productForm.get('img');
  }

  get price() {
    return this.productForm.get('price');
  }

  get fuel() {
    return this.productForm.get('fuel');
  }

  constructor(private fb: FormBuilder) { }

  submit() {
    if (!this.productForm.value.id) {
      this.createProduct(this.formatNewProduct(this.productForm.value))
    } else {
      this.editProduct(this.productForm.value as Product);
    }
  }

  formatNewProduct(product: {}): NewProduct {
    return Object.fromEntries(Object.entries(product)
      .filter(([key, value]) => value !== null && key !== id && key !== categoryId)) as NewProduct;
  }

  setFormValues(product: Product) {
    this.productForm.patchValue(product);
  }

  createProduct(product: NewProduct) {
    this.createNewProductEvent.emit(product);
  }

  editProduct(product: Product) {
    this.editProductEvent.emit(product);
  }

  reset() {
    this.productForm.reset();
    this.fuel?.setValue('');
  }
}
