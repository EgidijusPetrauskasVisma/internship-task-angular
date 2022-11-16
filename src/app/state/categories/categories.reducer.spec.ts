import { loadCategoriesSuccess } from './categories.actions';
import { CategoriesState, categoriesReducer } from './categories.reducer';
import { Category } from '../../core/types/category';


describe('categoriesReducer', () => {
    const initialState: CategoriesState = {
        categories: [],
        currentCategory: undefined,
        status: 'pending'
    }
    const dummyCategory: Category = {
        id: 1,
        title: 'title'
    }

    describe('loadCategoriesSuccess', () => {
        fit('should load categories to store', () => {
            const action = loadCategoriesSuccess({ categories: [dummyCategory] });

            const result = categoriesReducer(initialState, action);

            expect(result.categories).toEqual([dummyCategory]);
        })
    })
});