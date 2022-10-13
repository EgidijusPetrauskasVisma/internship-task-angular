import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let headerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    headerElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <img> with class logo', () => {
    const img = headerElement.querySelector('img');
    expect(img?.classList).toContain('logo')
  })

  it('should have <nav> element', () => {
    const nav = headerElement.querySelector('nav');
    expect(nav).toBeDefined();
  })
});
