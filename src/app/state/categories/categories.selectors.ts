import { createSelector, Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { CategoriesState } from './categories.reducer';
import { inject } from '@angular/core';

export function selectAllCategories() {
    const store = inject(Store);
    return store.select(allCategoriesSelector);
}

export function selectCurrentCategory() {
    const store = inject(Store);
    return store.select(currentCategorySelector);
}

export function selectCategoryStatus() {
    const store = inject(Store);
    return store.select(categoryStatusSelector);
}


export const selectCategories = (state: AppState) => state.categories;

export const allCategoriesSelector = createSelector(
    selectCategories,
    (state: CategoriesState) => state.categories
)

export const currentCategorySelector = createSelector(
    selectCategories,
    (state: CategoriesState) => state.currentCategory
)

export const categoryStatusSelector = createSelector(
    selectCategories,
    (state: CategoriesState) => state.status
)