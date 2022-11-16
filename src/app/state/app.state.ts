import { CategoriesState, categoriesReducer } from './categories/categories.reducer';
import { productsReducer, ProductsState } from './products/products.reducer';

export interface AppState {
    categories: CategoriesState,
    products: ProductsState
}

export const appState = { categories: categoriesReducer, products: productsReducer }