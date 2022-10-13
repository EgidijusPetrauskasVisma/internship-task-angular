import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopPageComponent } from './shop-page.component';


const routes: Routes = [
    { path: '', redirectTo: 'cars', pathMatch: 'full' },
    { path: 'cars', component: ShopPageComponent },
    { path: 'motorcycles', component: ShopPageComponent },
    { path: 'snowmobiles', component: ShopPageComponent },
    { path: 'planes', component: ShopPageComponent },
    { path: 'boats', component: ShopPageComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopPageRoutingModule { }
