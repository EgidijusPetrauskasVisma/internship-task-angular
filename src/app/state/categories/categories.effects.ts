import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { switchMap, map, from, of } from 'rxjs';

import { CategoriesService } from '../../core/services/categories.service';
import { loadCategories, loadCategoriesSuccess, setCurrentCategory } from './categories.actions';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../core/types/category';

@Injectable()
export class CategoriesEffects {
    constructor(
        private actions$: Actions,
        private categoriesService: CategoriesService,
        private route: ActivatedRoute
    ) { }

    init$ = createEffect(() => this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        map(() => loadCategories())
    ))

    loadCategories$ = createEffect(() => this.actions$.pipe(
        ofType(loadCategories),
        switchMap(() =>
            from(this.categoriesService.getProductCategories()).pipe(
                map(categories => loadCategoriesSuccess({ categories })),
            )
        )
    ))

    setCurrentCategory$ = createEffect(() => this.actions$.pipe(
        ofType(loadCategories),
        switchMap(() =>
            from(this.categoriesService.getProductCategories()).pipe(
                map(categories => {
                    const categoryId = Number(this.route.snapshot.queryParamMap.get('categoryId'));
                    const category = categories.find(c => c.id === categoryId)
                    return setCurrentCategory({ category: category ? category : {} as Category });
                })
            )
        )
    ))

}