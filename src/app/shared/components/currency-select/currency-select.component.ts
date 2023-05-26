import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Currency } from 'src/app/shared/models/currency.model';

@Component({
  selector: 'ukr-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.scss'],
})
export class CurrencySelectComponent implements OnInit {
  control = new FormControl<Currency>(null);
  searchControl = new FormControl<string>('');
  filteredCurrencies: Currency[];

  @Input() currencies: Currency[];
  @Output() currencySelected: EventEmitter<Currency> =
    new EventEmitter<Currency>();

  get selectedCurrency(): Currency {
    return this.control.value;
  }

  ngOnInit(): void {
    this.filteredCurrencies = this.currencies;
    if (this.filteredCurrencies.length) {
      this.control.setValue(this.filteredCurrencies[0]);
      this.handleCurrencySelect(this.filteredCurrencies[0]);
    }

    this.initSearch();
  }

  initSearch(): void {
    this.searchControl.valueChanges.subscribe((value) => {
      this.filteredCurrencies = this.currencies.filter(
        (currency) =>
          currency.fullName.toLowerCase().includes(value.toLowerCase()) ||
          currency.abbreviation.toLowerCase().includes(value.toLowerCase())
      );
    });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  handleCurrencySelect(currency: Currency): void {
    this.currencySelected.emit(currency);
  }
}
