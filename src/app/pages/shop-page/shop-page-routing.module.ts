import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopPageComponent } from './shop-page.component';


const routes: Routes = [
    { path: '', redirectTo: 'cars', pathMatch: 'full' },
    { path: ':category', component: ShopPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopPageRoutingModule { }
