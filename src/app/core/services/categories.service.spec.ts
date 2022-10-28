import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';

import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriesService]
    });
    service = TestBed.inject(CategoriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('getProductCategories', () => {
    it('should return array of product categories', async () => {
      const result = { id: 1, title: 'cars' }
      const response = firstValueFrom(service.getProductCategories());

      const mock = httpMock.expectOne('http://localhost:8400/categories');
      mock.flush([result]);

      expect(await response).toEqual([result]);
    })
  })
});
