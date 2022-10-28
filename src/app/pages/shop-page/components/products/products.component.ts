import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../../../core/services/products.service';

import { ProductsFormComponent } from './products-form/products-form.component';
import { Product, NewProduct } from '../../../../core/types';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Input() products: Product[] = [];
  currentCategoryId = Number(this.route.snapshot.queryParamMap.get('categoryId'));
  categoryTitle = this.route.snapshot.paramMap.get('category')
  filterValue: 'all' | 'petrol' | 'diesel' = 'all'
  dialogOpen: boolean = false;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
  ) { }

  get productsEmpty(): boolean {
    return this.products.length > 0;
  }

  private handleError(error: Error) {
    console.log(error.message);
  }

  private handleAddProduct(product: Product) {
    this.products.push(product);
  }

  private handleDeleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  private handleEditProduct(product: Product) {
    this.products = this.products.map(p => p.id === product.id ? product : p)
  }

  createProduct(product: NewProduct, productForm: ProductsFormComponent): void {
    const newProduct = { categoryId: this.currentCategoryId, ...product }
    this.productsService.createProduct(newProduct).subscribe({
      next: this.handleAddProduct.bind(this),
      error: this.handleError.bind(this)
    });
    this.toggleDialog(productForm);
  }

  deleteProduct(id: number): void {
    this.productsService.removeProduct(id).subscribe({
      next: () => this.handleDeleteProduct(id),
      error: this.handleError.bind(this),
    });
  }

  editProduct(product: Product, productForm: ProductsFormComponent): void {
    this.productsService.editProduct(product).subscribe({
      next: this.handleEditProduct.bind(this),
      error: this.handleError.bind(this)
    });
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