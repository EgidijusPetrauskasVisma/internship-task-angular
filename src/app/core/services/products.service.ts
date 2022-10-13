import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap, catchError } from 'rxjs';

import { AlertService } from './alert.service';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl: string = 'http://localhost:8400';

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.setErrorMessage(`Operation ${operation} failed`)
      if (result)
        return of(result as T);
      else
        return error;
    }
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/items`).pipe(
      catchError(this.handleError<Product[]>('getProducts', []))
    )
  }

  getProductsByCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/items?categoryId=${id}`).pipe(
      catchError(this.handleError<Product[]>('getProductsByCategory', []))
    )
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/items`).pipe(
      map(response => response.filter(r => r.flag)),
      catchError(this.handleError<Product[]>('getFeaturedProducts'))
    )
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.productsUrl}/items`, product).pipe(
      tap((p: Product) => this.alertService.setSuccessMessage(`Created product "${p.title}"`)),
      catchError(this.handleError<Product>('createProduct'))
    )
  }

  editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productsUrl}/items/${product.id}`, product).pipe(
      tap(p => this.alertService.setSuccessMessage(`Item "${p.title}" changed`)),
      catchError(this.handleError<Product>('editProduct'))
    )
  }

  removeProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.productsUrl}/items/${id}`).pipe(
      tap(_ => this.alertService.setSuccessMessage(`Removed item id="${id}"`)),
      catchError(this.handleError<Product>('removeProduct'))
    )
  }
}