import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let rootElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    rootElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //currentSlidesIndex
  it('should begin as 0', () => {
    expect(component.currentSlideIndex).toBe(0);
  })

  //prevSlide 
  it('should decease component.currentSlideIndex by 1', () => {
    component.currentSlideIndex = 2;
    component.prevSlide();

    expect(component.currentSlideIndex).toBe(1);
  })

  it('should NOT decrease currentSlideIndex if its the first slide', () => {
    component.currentSlideIndex = 0;

    component.prevSlide();

    expect(component.currentSlideIndex).not.toBe(-1);
  })

  //nextSlide
  it('should increase component.currentSlideIndex by 1', () => {
    const totalSlides = 4;
    component.currentSlideIndex = 2;

    component.nextSlide(totalSlides);

    expect(component.currentSlideIndex).toBe(3);
  })

  it('should NOT increase currentSlideIndex if its the last slide', () => {
    const totalSlides = 4;
    component.currentSlideIndex = totalSlides - 1;

    component.nextSlide(totalSlides);

    expect(component.currentSlideIndex).not.toBe(4);
  })

  //ul
  it('should have as many <li> elements as component.slides.length', () => {
    const result = component.slides.length;

    const liElements = rootElement.querySelectorAll('li');

    expect(liElements.length).toBe(result);
  })
});
