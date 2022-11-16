import { Component } from '@angular/core';

import { Category } from 'src/app/core/types';
import { AppState } from '../../../../state/app.state';
import { Store } from '@ngrx/store';
import { setCurrentCategory } from 'src/app/state/categories/categories.actions';
import { selectAllCategories } from '../../../../state/categories/categories.selectors';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories$ = selectAllCategories();

  constructor(private store: Store<AppState>) { }

  setCurrentCategory(category: Category) {
    this.store.dispatch(setCurrentCategory({ category }));
  }
}
