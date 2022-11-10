import { createAction, props } from '@ngrx/store';
import { Product } from '../../core/types/product';


export const loadProducts = createAction(
    '[Products API] Load products',
)

export const loadProductsSuccess = createAction(
    '[Products API] Load products success',
    props<{ products: Product[] }>()
)

export const addProduct = createAction(
    '[Products List] Add product',
    props<{ product: Omit<Product, 'id'> }>()
)

export const addProductSuccess = createAction(
    '[Products List] Add product success',
    props<{ product: Product }>()
)

export const editProduct = createAction(
    '[Products List] Edit product',
    props<{ product: Product }>()
)

export const editProductSuccess = createAction(
    '[Products List] Edit product success',
    props<{ product: Product }>()
)

export const deleteProduct = createAction(
    '[Products List] Delete product',
    props<{ id: number }>()
)

export const deleteProductSuccess = createAction(
    '[Products List] Delete product success',
    props<{ id: number }>()
)