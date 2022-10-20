import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { firstValueFrom, of, throwError } from 'rxjs';

import { ProductsService } from './products.service';
import { Product } from '../types/product';
import { AlertService } from './alert.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ProductsService', () => {
  let service: ProductsService;
  let alertServiceSpy: any;
  let httpMock: HttpTestingController;

  const mockError = new HttpErrorResponse({
    status: 400,
    statusText: 'Bad Request',
    error: { code: 'error', message: 'Error message' }
  })
  const serverAddress = 'http://localhost:8400';
  const dummyProduct = {
    title: "",
    description: "",
    img: "",
    price: 0,
    fuel: "",
    flag: true,
    categoryId: 4,
    id: 3
  };
  const newProduct: Omit<Product, 'id'> = dummyProduct;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    alertServiceSpy = jasmine.createSpyObj<AlertService>('alertServiceSpy', ['setErrorMessage']);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should return array of products', async () => {
      const result = [dummyProduct];
      const response = firstValueFrom(service.getProducts());

      const mock = httpMock.expectOne(`${serverAddress}/items`);
      mock.flush([dummyProduct]);

      expect(await response).toEqual(result);
    })

    it('should return empty array after getting products fail', async () => {
      const result = [] as Product[];
      const response = firstValueFrom(service.getProducts());

      const mock = httpMock.expectOne(`${serverAddress}/items`);
      mock.flush(mockError.error, mockError);

      expect(await response).toEqual(result);
    })
  })

  describe('getProductsByCategory', () => {
    it('should return array of products filtered by category', async () => {
      const categoryId = 1;
      const result = [dummyProduct];
      const response = firstValueFrom(service.getProductsByCategory(categoryId));

      const mock = httpMock.expectOne(`${serverAddress}/items?categoryId=${categoryId}`);
      mock.flush([dummyProduct]);

      expect(await response).toEqual(result);
      expect(mock.request.method).toBe('GET');
    })

    it('should return empty array after getting products by category fails', async () => {
      const categoryId = 1;
      const result = [] as Product[];
      const response = firstValueFrom(service.getProductsByCategory(categoryId));

      const mock = httpMock.expectOne(`${serverAddress}/items?categoryId=${categoryId}`);
      mock.flush(mockError.error, mockError);

      expect(await response).toEqual(result)
    })
  })

  describe('getFeaturedProducts', () => {
    it('should return array of products featured in carousel', async () => {
      const result = [dummyProduct];
      const response = firstValueFrom(service.getFeaturedProducts());

      const mock = httpMock.expectOne(`${serverAddress}/items`);
      mock.flush([dummyProduct]);

      expect(await response).toEqual(result);
    })

    it('should return error after getting featured products fails', async () => {
      const errorSpy = jasmine.createSpy('errorSpy');
      const response = firstValueFrom(service.getFeaturedProducts()).catch(errorSpy);

      const mock = httpMock.expectOne(`${serverAddress}/items`);
      mock.flush(mockError.error, mockError);
      await response;

      expect(errorSpy).toHaveBeenCalled();
    })
  })

  describe('createProduct', () => {
    it('should return created product', async () => {
      const result = dummyProduct;
      const response = firstValueFrom(service.createProduct(newProduct));

      const mock = httpMock.expectOne(`${serverAddress}/items`);
      mock.flush(newProduct);

      expect(await response).toEqual(result);
    })
  })

  describe('editProduct', () => {
    it('should return edited product', async () => {
      const result = dummyProduct;
      const response = firstValueFrom(service.editProduct(dummyProduct));

      const mock = httpMock.expectOne(`${serverAddress}/items/${dummyProduct.id}`);
      mock.flush(dummyProduct);

      expect(await response).toEqual(result);
    })
  })

  describe('deleteProduct', () => {
    it('should be called when remove product button is pressed', () => {
      firstValueFrom(service.removeProduct(1));

      const mock = httpMock.expectOne(`${serverAddress}/items/1`);
      mock.flush(null);

      expect(mock.request.method).toBe('DELETE');
    })
  })
});
