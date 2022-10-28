import { NgModule } from '@angular/core';
import { AppButtonModule } from './app-button/app-button.module';
import { CloseButtonModule } from './app-close-button/close-button.module';


@NgModule({
  declarations: [],
  exports: [AppButtonModule, CloseButtonModule],
  imports: []
})
export class SharedModule { }

