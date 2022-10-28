import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsFormComponent } from './products-form.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormFieldComponent } from './form-field/form-field.component';


@NgModule({
  declarations: [ProductsFormComponent, FormFieldComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [ProductsFormComponent]
})
export class ProductsFormModule { }
