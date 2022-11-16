import { createAction, props } from '@ngrx/store';
import { Category } from '../../core/types/category';

export const loadCategories = createAction(
    '[Categories API] Load categories',
)

export const loadCategoriesSuccess = createAction(
    '[Categories API] Load categories success',
    props<{ categories: Category[] }>()
)

export const setCurrentCategory = createAction(
    '[Categories List] Set current category',
    props<{ category: Category }>()
)