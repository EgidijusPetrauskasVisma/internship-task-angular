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
  @Output() createNewProduct = new EventEmitter();
  @Output() editProduct = new EventEmitter();

  productForm = this.fb.group({
    id: [0],
    categoryId: [0],
    title: ['', [Validators.minLength(3), Validators.required]],
    description: ['', Validators.maxLength(80)],
    img: ['', Validators.required],
    price: [0, [Validators.min(1), Validators.required]],
    fuel: ['', Validators.required],
    flag: [false],
  })

  constructor(private fb: FormBuilder) { }

  submit() {
    if (!this.productForm.value.id) {
      this.createNewProduct.emit(this.formatNewProduct(this.productForm.value));
    } else {
      this.editProduct.emit(this.productForm.value as Product);
    }
  }

  formatNewProduct(product: {}): NewProduct {
    return Object.fromEntries(Object.entries(product)
      .filter(([key, value]) => value !== null && key !== id && key !== categoryId)) as NewProduct;
  }

  setFormValues(product: Product) {
    this.productForm.patchValue(product);
  }

  reset() {
    this.productForm.reset();
    this.productForm.get('fuel')?.setValue('');
  }
}
