import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  errorMessage: string = '';
  successMessage: string = '';

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.setErrorMessage(`Operation ${operation} failed`)
      if (result)
        return of(result as T);
      else
        return throwError(() => error);
    }
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  setSuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 1200)
  }
}