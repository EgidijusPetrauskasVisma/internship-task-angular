import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CategoriesState } from './categories.reducer';
import { TestBed } from '@angular/core/testing';
import { Category } from '../../core/types/category';
import { allCategoriesSelector, categoryStatusSelector, currentCategorySelector } from './categories.selectors';


describe('Categories Selectors', () => {
    let mockStore: MockStore<CategoriesState>;
    const dummyCategory: Category = {
        id: 1,
        title: 'yas'
    }
    const initialState: CategoriesState = {
        categories: [dummyCategory],
        currentCategory: { id: 1, title: 'title' },
        status: 'pending'
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideMockStore({ initialState })]
        })
        mockStore = TestBed.inject(MockStore);
    })

    it('should select all categories ', () => {
        expect(allCategoriesSelector.projector(initialState)).toEqual(initialState.categories);
    });

    it('should select currentCategory ', () => {
        expect(currentCategorySelector.projector(initialState)).toEqual(initialState.currentCategory);
    });

    it('should  ', () => {
        expect(categoryStatusSelector.projector(initialState)).toEqual(initialState.status);
    });
});