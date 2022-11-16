import { createReducer, on } from '@ngrx/store';
import { Product } from '../../core/types/product';
import {
    loadProducts,
    loadProductsSuccess,
    addProductSuccess,
    editProductSuccess,
    deleteProductSuccess,
} from './products.actions';

export interface ProductsState {
    products: Product[],
    status: 'pending' | 'loading' | 'error' | 'success'
}

const initialState: ProductsState = {
    products: [],
    status: 'pending'
}


export const productsReducer = createReducer(
    initialState,

    on(loadProducts, (state) => ({ ...state, status: 'loading' })),

    on(loadProductsSuccess, (state, { products }) => ({
        ...state,
        products,
        status: 'success'
    })),

    on(addProductSuccess, (state, { product }) => ({
        ...state,
        products: [...state.products, product],
    })),

    on(editProductSuccess, (state, { product }) => ({
        ...state,
        products: state.products.map(p => p.id === product.id ? product : p),
    })),

    on(deleteProductSuccess, (state, { id }) => ({
        ...state,
        products: state.products.filter(p => p.id != id),
    })),
)