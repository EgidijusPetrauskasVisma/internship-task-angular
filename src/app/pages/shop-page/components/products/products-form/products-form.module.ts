import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsFormComponent } from './products-form.component';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [ProductsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [ProductsFormComponent]
})
export class ProductsFormModule { }
