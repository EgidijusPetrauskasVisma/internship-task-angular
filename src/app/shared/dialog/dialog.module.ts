import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogComponent } from './dialog.component';
import { CloseButtonModule } from '../app-close-button/close-button.module';


@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, CloseButtonModule],
  exports: [DialogComponent]
})
export class DialogModule { }
