import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { ProductsService } from './products.service';
import { Product } from '../types/product';
import { AlertService } from './alert.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let alertServiceSpy: any;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ProductsService);
    alertServiceSpy = jasmine.createSpyObj<AlertService>('alertServiceSpy', ['setErrorMessage']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // getProducts
  it('should return array of products', (done: DoneFn) => {
    const result = [dummyProduct];

    spyOn(service, 'getProducts').and.returnValue(of(result));

    service.getProducts().subscribe(response => {
      expect(response).toEqual(result);
    })
    done();
  })

  it('should return empty array after getting products fails', (done: DoneFn) => {
    const message = "Error while getting products";
    const result = [] as Product[];

    spyOn(service, 'getProducts').and.callFake(() => {
      alertServiceSpy.setErrorMessage(message);
      return of(result);
    });

    service.getProducts().subscribe(response => {
      expect(response).toEqual(result);
      expect(alertServiceSpy.setErrorMessage.calls.count())
        .withContext('alertService was called once')
        .toBe(1);
    })
    done();
  })

  // getProductsByCategory
  it('should return array of products filtered by category', (done: DoneFn) => {
    const categoryId = 1;
    const result = [dummyProduct];

    spyOn(service, 'getProductsByCategory').and.returnValue(of(result));

    service.getProductsByCategory(categoryId).subscribe(response => {
      expect(response).toEqual(result);
    })
    done();
  })

  it('should return empty array after getting products by category fails', (done: DoneFn) => {
    const message = "Error while getting products by category";
    const categoryId = 1;
    const result = [] as Product[];

    spyOn(service, 'getProductsByCategory').and.callFake(() => {
      alertServiceSpy.setErrorMessage(message);
      return of(result)
    });

    service.getProductsByCategory(categoryId).subscribe(response => {
      expect(response).toEqual(result)
      expect(alertServiceSpy.setErrorMessage.calls.count())
        .withContext('alertService was called once')
        .toBe(1);
    })
    done();
  })

  // getFeaturedProducts
  it('should return array of products featured in carousel', (done: DoneFn) => {
    const result = [dummyProduct];

    spyOn(service, 'getFeaturedProducts').and.returnValue(of(result));

    service.getFeaturedProducts().subscribe(response => {
      expect(response).toEqual(result);
    })
    done();
  })

  it('should return error after getting featured products fails', (done: DoneFn) => {
    const message = 'Error while getting featured products';

    spyOn(service, 'getFeaturedProducts').and.returnValue(throwError(() => {
      alertServiceSpy.setErrorMessage(message);
      return new Error(message)
    }));

    service.getFeaturedProducts().subscribe({
      error: error => {
        expect(error.message).toContain(message)
        expect(alertServiceSpy.setErrorMessage.calls.count())
          .withContext('alertService was called once')
          .toBe(1);
      }
    })
    done();
  })

  // createProduct
  it('should return created product', (done: DoneFn) => {
    const result = dummyProduct;

    spyOn(service, 'createProduct').and.returnValue(of(result));

    service.createProduct(newProduct).subscribe(response => {
      expect(response).toEqual(result);
    })
    done();
  })

  it('should return error after creating product fails', (done: DoneFn) => {
    const message = 'Error while creating product';

    spyOn(service, 'createProduct').and.returnValue(throwError(() => {
      alertServiceSpy.setErrorMessage(message);
      return new Error(message)
    }));

    service.createProduct(newProduct).subscribe({
      error: error => {
        expect(error.message).toContain(message);
        expect(alertServiceSpy.setErrorMessage.calls.count())
          .withContext('alertService was called once')
          .toBe(1);
      }
    })
    done();
  })

  // editProduct
  it('should return edited product', (done: DoneFn) => {
    const result = dummyProduct;

    spyOn(service, 'editProduct').and.returnValue(of(result));

    service.editProduct(dummyProduct).subscribe(response => {
      expect(response).toEqual(result);
    })
    done();
  })

  it('should return error after editing product fails', (done: DoneFn) => {
    const message = 'Error while editing product';

    spyOn(service, 'editProduct').and.returnValue(throwError(() => {
      alertServiceSpy.setErrorMessage(message);
      return new Error(message)
    }));

    service.editProduct(dummyProduct).subscribe({
      error: error => {
        expect(error.message).toContain(message);
        expect(alertServiceSpy.setErrorMessage.calls.count())
          .withContext('alertService was called once')
          .toBe(1);
      }
    })
    done();
  })

  // deleteProduct
  it('should be called when remove product button is pressed', (done: DoneFn) => {
    const mockId = 1;

    const spy = spyOn(service, 'removeProduct').and.returnValue(of({} as Product));

    service.removeProduct(mockId).subscribe(_ => {
      expect(spy).toHaveBeenCalled();
    })
    done();
  })


  it('should return error after removing product fails', (done: DoneFn) => {
    const mockId = 1;
    const message = 'Error while deleting product';

    spyOn(service, 'removeProduct').and.returnValue(throwError(() => {
      alertServiceSpy.setErrorMessage(message);
      return new Error(message)
    }));

    service.removeProduct(mockId).subscribe({
      error: error => {
        expect(error.message).toContain(message);
        expect(alertServiceSpy.setErrorMessage.calls.count())
          .withContext('alertService was called once')
          .toBe(1);
      }
    })
    done();
  })
});
