import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogComponent } from './dialog.component';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, SharedModule],
  exports: [DialogComponent]
})
export class DialogModule { }
