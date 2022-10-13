import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { DialogModule } from '../../../../shared/dialog/dialog.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductsFormModule } from './products-form/products-form.module';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    DialogModule,
    SharedModule,
    ProductsFormModule
  ],
  exports: [ProductsComponent]
})
export class ProductsModule { }
