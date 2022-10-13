import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';
import { CloseButtonModule } from '../app-close-button/close-button.module';


@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, CloseButtonModule],
  exports: [AlertComponent]
})
export class AlertModule { }
