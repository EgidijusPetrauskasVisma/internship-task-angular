import { Component } from '@angular/core';
import { selectProductsByCategory } from '../../state/products/products.selectors';
import { selectCurrentCategory } from '../../state/categories/categories.selectors';


@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent {
  products$ = selectProductsByCategory();
  currentCategory$ = selectCurrentCategory();
}