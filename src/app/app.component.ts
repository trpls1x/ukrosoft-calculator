import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CurrenciesMock } from './shared/mock-data/currencies.mock';
import { Currency } from './shared/models/currency.model';

interface CalculatorForm {
  amount: number;
  currency: Currency;
  period: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  switchValue = false;

  minAmount = 1000;
  maxAmount = 1000000;
  starsSizes = [19, 21, 23, 24, 25];
  profit = 0;
  percent = 0;

  CurrenciesMock = CurrenciesMock;

  get amountControl(): AbstractControl {
    return this.form.get('amount');
  }

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initFormChangeSubscription();
  }

  onCurrencySelected(currency): void {
    this.form.get('currency').setValue(currency);
  }

  increaseAmount(): void {
    this.amountControl.setValue(this.amountControl.value + 1000);
  }

  decreaseAmount(): void {
    this.amountControl.setValue(this.amountControl.value - 1000);
  }

  preventLiterals(event: KeyboardEvent): void {
    if (['e', 'E', '+', '-'].includes(event.key)) {
      event.preventDefault();
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      amount: [
        50000,
        [Validators.required, Validators.min(1000), Validators.max(1000000)],
      ],
      currency: null,
      period: [
        12,
        [Validators.required, Validators.pattern('^(1|3|6|12|24)$')],
      ],
    });
  }

  private initFormChangeSubscription(): void {
    this.form.valueChanges.subscribe((value: CalculatorForm) => {
      this.profit =
        value.amount * (value.currency.apr / 100) * (value.period / 12);
      this.percent = value.currency.apr * (value.period / 12);
      this.form.updateValueAndValidity({ emitEvent: false });
    });
  }
}
