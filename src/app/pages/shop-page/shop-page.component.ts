import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { Product } from '../../core/types';
import { Category } from '../../core/types';


@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];

  currentCategoryRoute: string = this.router.url.replace('/shop/', '');
  currentCategory: Category = {} as Category;

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.loadCategoriesAndProducts();
  }

  loadCategoriesAndProducts() {
    this.categoriesService.getProductCategories().subscribe(resCategories => {
      this.categories = resCategories;
      const currentCategory = this.categories.find(c => c.title === this.currentCategoryRoute);
      if (!currentCategory) return;
      this.currentCategory = currentCategory;

      this.productsService.getProductsByCategory(this.currentCategory.id).subscribe(resProducts => this.products = resProducts);
    });
  }

  fuelFilter(fuel: string) {
    this.productsService.getProductsByCategory(this.currentCategory.id).subscribe(resProducts => {
      if (fuel === 'all')
        this.products = resProducts;
      else
        this.products = resProducts.filter(product => product.fuel === fuel);
    })
  }
}