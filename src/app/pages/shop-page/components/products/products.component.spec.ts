import { ComponentFixture, TestBed } from '@angular/core/testing';
import { skip } from 'rxjs';

import { ProductsComponent } from './products.component';
import { Product } from '../../../../core/types';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { addProduct, deleteProduct, editProduct } from 'src/app/state/products/products.actions';
import { ProductsState } from '../../../../state/products/products.reducer';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let store: MockStore<ProductsState>
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
  const initialState = {
    products: {
      products: [],
      status: 'pending'
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(MockStore)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createProduct', () => {
    it('should dispatch addProduct action', () => {
      const action = addProduct({ product: dummyNewProduct });

      store.scannedActions$
        .pipe(skip(1))
        .subscribe(scannedAction => {
          expect(scannedAction).toEqual(action)
        })

      store.dispatch(action)
    })
  })

  describe('deleteProduct', () => {
    it('should dispatch deleteProduct action', () => {
      const action = deleteProduct({ id: dummyProduct.id });

      store.scannedActions$
        .pipe(skip(1))
        .subscribe(scannedAction => {
          expect(scannedAction).toEqual(action)
        })

      store.dispatch(action)
    })
  })

  describe('editProduct', () => {
    it('should dispatch editProduct action', () => {
      const action = editProduct({ product: dummyProduct });

      store.scannedActions$
        .pipe(skip(1))
        .subscribe(scannedAction => {
          expect(scannedAction).toEqual(action)
        })

      store.dispatch(action)
    })
  })
});
