import { AfterViewInit, Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'ukr-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss'],
})
export class FormFieldErrorComponent implements AfterViewInit {
  private control: NgControl;
  private error: any;

  @Input() controlName;

  constructor(private controlContainer: MatFormField) {}

  get message(): string {
    if (!this.control || !this.control.errors) {
      return;
    }

    const firstKey = Object.keys(this.control.errors)[0];
    this.error = this.control.getError(firstKey);

    return this[firstKey];
  }

  get required(): string {
    return 'This field is required';
  }

  get min(): string {
    return `Minimum amount is $${this.error.min}`;
  }

  get max(): string {
    return `Maximum amount is $${this.error.max}`;
  }

  get pattern(): string {
    return 'Only 1, 3, 6, 12, 24 months allowed';
  }

  ngAfterViewInit(): void {
    this.control = <NgControl>this.controlContainer._formFieldControl.ngControl;
  }
}
