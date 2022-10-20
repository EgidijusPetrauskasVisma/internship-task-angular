import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'shop', loadChildren: () => import('./pages/shop-page/shop-page.module').then(m => m.ShopPageModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
