import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageModule } from './pages/home-page/home-page.module';
import { ShopPageModule } from './pages/shop-page/shop-page.module';
import { HeaderModule } from './core/components/header/header.module';
import { FooterModule } from './core/components/footer/footer.module';
import { AlertModule } from './shared/alert/alert.module';
import { InfoHeadingModule } from './core/components/info-heading/info-heading.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomePageModule,
    ShopPageModule,
    HeaderModule,
    InfoHeadingModule,
    FooterModule,
    AlertModule
  ],
  exports: [],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
