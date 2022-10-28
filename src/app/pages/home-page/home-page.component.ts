import { Component } from '@angular/core';

import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  slides$ = this.productsService.getFeaturedProducts();
  categories$ = this.categoriesService.getProductCategories();

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService) { }
}
