import { createReducer, on } from '@ngrx/store';
import { Category } from '../../core/types/category';
import { loadCategories, loadCategoriesSuccess, setCurrentCategory } from './categories.actions';


export interface CategoriesState {
    categories: Category[],
    currentCategory: Category | undefined,
    status: 'pending' | 'loading' | 'success'
}

const initialState: CategoriesState = {
    categories: [],
    currentCategory: undefined,
    status: 'pending'
}

export const categoriesReducer = createReducer(
    initialState,

    on(loadCategories, (state) => ({ ...state, status: 'loading' })),

    on(loadCategoriesSuccess, (state, { categories }) => ({
        ...state,
        categories,
        status: 'success'
    })),

    on(setCurrentCategory, (state, { category }) => ({
        ...state,
        currentCategory: category
    }))
)