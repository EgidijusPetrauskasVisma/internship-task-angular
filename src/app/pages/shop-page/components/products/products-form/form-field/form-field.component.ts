import { Component, ContentChild, ElementRef, OnInit } from '@angular/core';
import { FormControlDirective } from '@angular/forms';

let generatedId = 0;

@Component({
  selector: 'form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {
  @ContentChild(FormControlDirective) private fc: FormControlDirective = {} as FormControlDirective;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const label = this.elementRef.nativeElement.querySelector('label');
    const input = this.elementRef.nativeElement.querySelector('input');
    const select = this.elementRef.nativeElement.querySelector('select');

    const id = input
      ? input.getAttribute('id') ?? `fake-id-${generatedId++}`
      : select.getAttribute('id') ?? `fake-id-${generatedId++}`

    label.setAttribute('for', id);
    if (input) input.setAttribute('id', id);
    else select.setAttribute('id', id);
  }

  get control() {
    return this.fc;
  }
}