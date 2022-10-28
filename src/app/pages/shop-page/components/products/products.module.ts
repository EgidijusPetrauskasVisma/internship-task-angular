import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { DialogModule } from '../../../../shared/dialog/dialog.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductsFormModule } from './products-form/products-form.module';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipe } from './product-filter.pipe';


@NgModule({
  declarations: [ProductsComponent, ProductFilterPipe],
  imports: [
    CommonModule,
    DialogModule,
    SharedModule,
    ProductsFormModule,
    FormsModule
  ],
  exports: [ProductsComponent]
})
export class ProductsModule { }
