import { AppState } from '../app.state';
import { createSelector, Store } from '@ngrx/store';
import { ProductsState } from './products.reducer';
import { Category } from '../../core/types/category';
import { inject } from '@angular/core';

export function selectAllProducts() {
    const store = inject(Store)
    return store.select(allProductsSelector)
}

export function selectFeaturedProducts() {
    const store = inject(Store)
    return store.select(featuredProductsSelector)
}

export function selectProductsByCategory() {
    const store = inject(Store)
    return store.select(productsByCategorySelector)
}

const currentCategory = (state: AppState) => state.categories.currentCategory ? state.categories.currentCategory : state.categories.categories[0];

const selectProducts = (state: AppState) => state.products;

export const allProductsSelector = createSelector(
    selectProducts,
    (state: ProductsState) => state.products
)

const featuredProductsSelector = createSelector(
    selectProducts,
    (state: ProductsState) => state.products.filter(p => p.flag)
)

export const productsByCategorySelector = createSelector(
    currentCategory,
    selectProducts,
    (category: Category, state: ProductsState) => state.products.filter(p => p.categoryId === category.id)
)