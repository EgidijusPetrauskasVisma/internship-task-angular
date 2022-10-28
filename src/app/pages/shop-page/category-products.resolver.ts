import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from '../../core/types/product';
import { ProductsService } from '../../core/services/products.service';


@Injectable({ providedIn: 'root' })
export class CategoryProductResolver implements Resolve<Product[]> {

    constructor(private productsService: ProductsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
        const categoryId = Number(route.queryParamMap.get('categoryId'))
        return this.productsService.getProductsByCategory(categoryId);
    }
}