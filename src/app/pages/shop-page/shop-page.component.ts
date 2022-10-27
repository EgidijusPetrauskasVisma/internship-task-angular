import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, } from 'rxjs';


@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent {
  products$ = this.route.data.pipe(map(data => data['products']))

  constructor(
    private route: ActivatedRoute,
  ) { }
}