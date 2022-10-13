import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'shop', loadChildren: () => import('./pages/shop-page/shop-page.module').then(m => m.ShopPageModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
