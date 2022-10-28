import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add message to successMessage', () => {
    const result = 'successfully added';

    service.setSuccessMessage('successfully added')

    expect(service.successMessage).toEqual(result);
  });

  it('should add message to errorMessage', () => {
    const result = 'error while...';

    service.setErrorMessage('error while...')

    expect(service.errorMessage).toEqual(result);
  });
});
