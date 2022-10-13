import { Component, Input } from '@angular/core';

import { Product } from '../../core/types/product';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() slides: Product[] = [];

  currentSlideIndex: number = 0;

  prevSlide(): void {
    if (this.currentSlideIndex === 0) return
    this.currentSlideIndex--;
  }

  nextSlide(totalSlides: number): void {
    if (totalSlides === (this.currentSlideIndex + 1)) return;
    this.currentSlideIndex++;
  }
}