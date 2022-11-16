import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { ProductsService } from '../../core/services/products.service';
import {
    deleteProduct,
    loadProducts,
    loadProductsSuccess,
    addProduct,
    deleteProductSuccess,
    addProductSuccess,
    editProduct,
    editProductSuccess
} from './products.actions';
import { switchMap, from, map, exhaustMap } from 'rxjs';


@Injectable()
export class ProductsEffects {
    constructor(
        private actions$: Actions,
        private productsService: ProductsService,
    ) { }

    init$ = createEffect(() => this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        map(() => loadProducts())
    ))

    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(loadProducts),
        switchMap(() => this.productsService.getProducts()),
        map(products => loadProductsSuccess({ products })),
    ))

    deleteProduct$ = createEffect(() => this.actions$.pipe(
        ofType(deleteProduct),
        exhaustMap(({ id }) =>
            this.productsService.removeProduct(id).pipe(
                map(product => deleteProductSuccess({ id: product.id })),
            )
        )
    ))

    addProduct$ = createEffect(() => this.actions$.pipe(
        ofType(addProduct),
        exhaustMap(({ product }) =>
            this.productsService.createProduct(product).pipe(
                map(product => addProductSuccess({ product })),
            )
        )
    ))

    editProduct$ = createEffect(() => this.actions$.pipe(
        ofType(editProduct),
        exhaustMap(({ product }) =>
            this.productsService.editProduct(product).pipe(
                map(product => editProductSuccess({ product })),
            )
        )
    ))

}