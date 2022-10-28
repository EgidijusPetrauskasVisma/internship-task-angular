import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopPageComponent } from './shop-page.component';
import { CategoryProductResolver } from './category-products.resolver';


const routes: Routes = [
    { path: '', redirectTo: 'cars', pathMatch: 'full' },
    {
        path: ':category',
        component: ShopPageComponent,
        resolve: {
            products: CategoryProductResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopPageRoutingModule { }
