import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let footerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    footerElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <h6> element with text "Copyright"', () => {
    const h6 = footerElement.querySelector('h6');
    expect(h6?.textContent).toContain('Copyright');
  })

  it('should have <article> element with <a> element inside', () => {
    const article = footerElement.querySelector('article');
    const a = footerElement.querySelector('a');
    expect(article).toBeDefined();
    expect(a).toBeDefined();
  })
});
