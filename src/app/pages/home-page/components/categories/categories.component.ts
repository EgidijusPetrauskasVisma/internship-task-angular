import { Component, Input } from '@angular/core';

import { Category } from 'src/app/core/types';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  @Input() categories: Category[] = [];
}
