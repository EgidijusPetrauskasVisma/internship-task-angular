import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from '../../shared/carousel/carousel.module';
import { CategoriesModule } from './components/categories/categories.module';
import { HomePageComponent } from './home-page.component';


@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    CategoriesModule,
  ]
})
export class HomePageModule { }
