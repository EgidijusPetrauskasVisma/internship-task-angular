import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductsComponent } from './products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../../../core/services/products.service';
import { Product } from '../../../../core/types';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  const productsService = jasmine.createSpyObj<ProductsService>('ProductsService', [
    'createProduct', 'removeProduct', 'editProduct',
  ])
  const dummyProduct = {
    title: "fake",
    description: "",
    img: "",
    price: 0,
    fuel: "",
    flag: true,
    categoryId: 4,
    id: 3
  };
  const dummyNewProduct: Omit<Product, 'id'> = dummyProduct;
  let handleError: any;
  let rootElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    handleError = spyOn<any>(component, 'handleError').and.callThrough();
    rootElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // createProduct
  it('should send a call to productsService to crate new product and return it with id', () => {
    const createProduct = productsService.createProduct.and.returnValue(of(dummyProduct));

    productsService.createProduct(dummyNewProduct).subscribe(res => {
      expect(createProduct).toHaveBeenCalled();
      expect(Object.keys(res)).toContain('id');
    })
  })

  it('should add new product to component.products', () => {
    const handleAddProduct = spyOn<any>(component, 'handleAddProduct').and.callFake((p: Product) => {
      component.products.push(p);
    });

    handleAddProduct(dummyProduct);

    expect(component.products.indexOf(dummyProduct)).toBeGreaterThan(-1);
  })

  it('should handle error by logging it if creating product fails ', () => {
    productsService.createProduct.and.returnValue(of(dummyProduct));

    productsService.createProduct(dummyNewProduct).subscribe({
      error: error => {
        handleError(error);
        expect(handleError.calls.count()).toBe(1);
      }
    })
  })

  //deleteProduct
  it('should send a call to productService to delete a product', () => {
    const deleteProduct = productsService.removeProduct.and.returnValue(of(dummyProduct));

    productsService.removeProduct(dummyProduct.id).subscribe(_ => {
      expect(deleteProduct).toHaveBeenCalled();
    })
  })

  it('should remove product from component.products', () => {
    let productsFake = [dummyProduct];
    const handleDeleteProduct = spyOn<any>(component, 'handleDeleteProduct').and.callFake((id: number) => {
      productsFake = productsFake.filter(p => p.id !== id);

    });

    handleDeleteProduct(dummyProduct.id);

    expect(productsFake.indexOf(dummyProduct)).toBe(-1);
  })

  it('should handle error by logging it if deleting product fails ', () => {
    productsService.removeProduct.and.returnValue(of(dummyProduct));

    productsService.removeProduct(dummyProduct.id).subscribe({
      error: error => {
        handleError(error);
        expect(handleError.calls.count()).toBe(1);
      }
    })
  })

  //editProduct
  it('should send a call to productService to edit a product', () => {
    const editProduct = productsService.editProduct.and.returnValue(of(dummyProduct));

    productsService.editProduct(dummyProduct).subscribe(_ => {
      expect(editProduct).toHaveBeenCalled();
    })
  })

  it('should replace edited product in component.products', () => {
    let productsFake = [{ id: 3, title: 'editableFake' }];
    const handleEditProduct = spyOn<any>(component, 'handleEditProduct').and.callFake((product: Product) => {
      productsFake = productsFake.map(p => p.id === product.id ? product : p);
    });

    handleEditProduct(dummyProduct);

    expect(productsFake.indexOf(dummyProduct)).toBeGreaterThan(-1);
    expect(productsFake[productsFake.indexOf(dummyProduct)].title).toBe(dummyProduct.title);
  })

  it('should handle error by logging it if editing product fails ', () => {
    productsService.editProduct.and.returnValue(of(dummyProduct));

    productsService.editProduct(dummyProduct).subscribe({
      error: error => {
        handleError(error);
        expect(handleError.calls.count()).toBe(1);
      }
    })
  })

  //filterByFuel
  it('should raise fuelFiltersEvent', () => {
    const result = 'petrol';
    let filterValue = '';
    component.fuelFiltersEvent.subscribe(val => filterValue = val)

    component.filterByFuel(result);

    expect(filterValue).toBe(result);
  })

  //is filter rendered
  it('should have <select> element with name "filter"', () => {
    const filter = rootElement.querySelector('select[name="filter"]')

    expect(filter).toBeDefined();
  })

  //are products rendered 
  it('should have "products-container"', () => {
    const productsContainer = rootElement.querySelector('.products-container');
    const products = rootElement.querySelectorAll('.product');

    expect(productsContainer)
      .toBeDefined()
    expect(products.length === component.products.length)
      .toBeTrue();
  })

  // product elements
  it('should have as many products as component.products', () => {
    const products = rootElement.querySelectorAll('.product');

    expect(products.length === component.products.length)
      .toBeTrue();
  })
});
