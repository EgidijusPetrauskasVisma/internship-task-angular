import { Component, Host } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormControlDirective, ReactiveFormsModule } from '@angular/forms';

import { FormFieldComponent } from './form-field.component';

@Component({
  template: `
    <form-field>
        <label>Title</label>
        <input [formControl]="titleControl" minlength="3">
    </form-field>
  `
})
class HostComponent {
  titleControl = new FormControl();
}

describe('FormFieldComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldComponent, HostComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should generate an id', () => {
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input')
    const label = fixture.nativeElement.querySelector('label')

    expect(input.getAttribute('id')).toContain('fake-id');
    expect(label.getAttribute('for')).toContain('fake-id');
  })

  it('should NOT generate new id if provided', () => {
    const input = fixture.nativeElement.querySelector('input')
    const label = fixture.nativeElement.querySelector('label')

    input.setAttribute('id', 1);
    label.setAttribute('for', 1);
    fixture.detectChanges();

    expect(input.getAttribute('id')).toBe('1');
    expect(label.getAttribute('for')).toBe('1');
  })

  it('should display validation error', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('Minimum length is 3');

    component.titleControl.setValue('ab');
    component.titleControl.markAsTouched();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Minimum length is 3');
    component.titleControl.setValue('abc');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('Minimum length is 3');
  })
});
