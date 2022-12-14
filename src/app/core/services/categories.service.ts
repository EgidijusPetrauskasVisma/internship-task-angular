import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';

import { AlertService } from './alert.service';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private productsUrl: string = 'http://localhost:8400';

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }


  getProductCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.productsUrl}/categories`).pipe(
      catchError(this.alertService.handleError<Category[]>('getCategories'))
    )
  }
}
