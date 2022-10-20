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

  describe('createProduct', () => {
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
  })

  describe('deleteProduct', () => {
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
  })

  describe('editProduct', () => {
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
  })
});
