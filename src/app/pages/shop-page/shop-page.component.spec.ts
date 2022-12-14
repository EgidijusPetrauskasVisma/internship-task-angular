import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { ShopPageComponent } from './shop-page.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('ShopPageComponent', () => {
  let component: ShopPageComponent;
  let fixture: ComponentFixture<ShopPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopPageComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [provideMockStore({})]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
