import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  errorMessage: string = '';
  successMessage: string = '';

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