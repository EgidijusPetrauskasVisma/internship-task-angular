import { Component, Input } from '@angular/core';

import { ProductsFormComponent } from './products-form/products-form.component';
import { Product, NewProduct } from '../../../../core/types';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { Category } from '../../../../core/types/category';
import { addProduct, deleteProduct, editProduct } from '../../../../state/products/products.actions';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Input() products: Product[] = [];
  @Input() currentCategory = {} as Category;
  filterValue: 'all' | 'petrol' | 'diesel' = 'all'
  dialogOpen: boolean = false;

  get productsEmpty(): boolean {
    return this.products.length > 0;
  }

  constructor(
    private store: Store<AppState>
  ) { }

  createProduct(product: NewProduct, productForm: ProductsFormComponent): void {
    const newProduct = { categoryId: this.currentCategory.id, ...product }
    this.store.dispatch(addProduct({ product: newProduct }));
    this.toggleDialog(productForm);
  }

  deleteProduct(id: number): void {
    this.store.dispatch(deleteProduct({ id }));
  }

  editProduct(product: Product, productForm: ProductsFormComponent): void {
    this.store.dispatch(editProduct({ product }));
    this.toggleDialog(productForm);
  }

  toggleDialog(productForm: ProductsFormComponent, product?: Product): void {
    if (!productForm) return;
    productForm.reset();
    this.dialogOpen = !this.dialogOpen;
    if (product) {
      productForm.setFormValues(product);
    }
  }
}