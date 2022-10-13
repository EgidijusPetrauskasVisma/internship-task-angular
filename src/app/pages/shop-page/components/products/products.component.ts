import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';

import { ProductsService } from '../../../../core/services/products.service';

import { ProductsFormComponent } from './products-form/products-form.component';
import { Product, NewProduct } from '../../../../core/types';
import { Category } from '../../../../core/types';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Input() products: Product[] = [];
  @Input() currentCategory: Category = {} as Category;
  @ViewChild('productForm') productForm!: ProductsFormComponent;
  @Output() fuelFiltersEvent = new EventEmitter;
  dialogOpen: boolean = false;

  constructor(private productsService: ProductsService) { }

  get productsEmpty(): boolean {
    return this.products.length > 0;
  }

  private handleError(error: Error) {
    console.log(error.message);
  }

  private handleAddProduct(product: Product) {
    this.products.push(product);
    this.toggleDialog();
  }

  private handleDeleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  private handleEditProduct(product: Product) {
    this.products = this.products.map(p => p.id === product.id ? product : p)
    this.toggleDialog();
  }

  createProduct(product: NewProduct): void {
    const newProduct = { categoryId: this.currentCategory.id, ...product }
    this.productsService.createProduct(newProduct).subscribe({
      next: this.handleAddProduct.bind(this),
      error: this.handleError.bind(this)
    });
  }

  deleteProduct(id: number): void {
    this.productsService.removeProduct(id).subscribe({
      next: () => this.handleDeleteProduct(id),
      error: this.handleError.bind(this),
    });
  }

  editProduct(product: Product): void {
    this.productsService.editProduct(product).subscribe({
      next: this.handleEditProduct.bind(this),
      error: this.handleError.bind(this)
    });
  }

  toggleDialog(product?: Product): void {
    if (!this.productForm) return;
    this.productForm.reset();
    this.dialogOpen = !this.dialogOpen;
    if (product) {
      this.productForm.setFormValues(product);
    }
  }

  filterByFuel(value: string) {
    this.fuelFiltersEvent.emit(value);
  }
}