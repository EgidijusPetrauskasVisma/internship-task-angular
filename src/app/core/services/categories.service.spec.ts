import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CategoriesService]
    });
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // getProductCategories
  it('should return array of product categories', (done: DoneFn) => {
    const result = { id: 1, title: 'cars' }

    spyOn(service, 'getProductCategories').and.returnValue(of([result]));

    service.getProductCategories().subscribe(response => {
      expect(response).toEqual([result]);
    })
    done();
  })

  it('should return error while getting array product categories', (done: DoneFn) => {
    const message = 'error while getting product categories';
    const alertServiceSpy = jasmine.createSpyObj('AlertService', ['setErrorMessage']);

    spyOn(service, 'getProductCategories').and.returnValue(throwError(() => {
      alertServiceSpy.setErrorMessage(message);
      return new Error(message)
    }));

    service.getProductCategories().subscribe({
      error: error => {
        expect(error.message)
          .toContain('error while getting product categories');
        expect(alertServiceSpy.setErrorMessage.calls.count())
          .withContext('alertService was called once')
          .toBe(1);
      }
    })
    done();
  })
});
