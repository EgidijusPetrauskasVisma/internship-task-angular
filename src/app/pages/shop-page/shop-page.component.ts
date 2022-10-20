import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { Product } from '../../core/types';
import { Category } from '../../core/types';
import { map, switchMap, Observable, of, filter } from 'rxjs';


@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {
  productsForCategory$: Observable<Product[]> = of([])
  categories: Category[] = [];
  currentCategoryRoute: string = '';
  currentCategory: Category = {} as Category;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(map(paramMap => paramMap.get('category'))).subscribe(res => {
      if (!res) this.currentCategoryRoute = '';
      else this.currentCategoryRoute = res;
    });
    this.loadCategoriesAndProducts();
  }

  loadCategoriesAndProducts() {
    this.productsForCategory$ = this.categoriesService.getProductCategories().pipe(
      map(categories => categories.find(c => c.title === this.currentCategoryRoute)),
      switchMap((category): Observable<Product[]> => {
        if (!category) return of();
        this.currentCategory = category;
        return this.productsService.getProductsByCategory(category.id);
      })
    )
  }
}