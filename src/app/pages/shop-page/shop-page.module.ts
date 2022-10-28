import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopPageComponent } from './shop-page.component';
import { ShopPageRoutingModule } from './shop-page-routing.module';
import { ProductsModule } from './components/products/products.module';


@NgModule({
  declarations: [
    ShopPageComponent,
  ],
  imports: [
    CommonModule,
    ShopPageRoutingModule,
    ProductsModule,
  ]
})
export class ShopPageModule { }
