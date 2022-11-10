import { Component } from '@angular/core';

import { selectFeaturedProducts } from '../../state/products/products.selectors';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  slides$ = selectFeaturedProducts();
}
