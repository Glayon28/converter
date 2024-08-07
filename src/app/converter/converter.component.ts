import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../shared.module';
import {
  CurrencyPriceInput,
  CurrencyPriceInputComponent,
} from '../currency-price-input/currency-price-input.component';
import { ApiService, ExchangeRate } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  standalone: true,
  imports: [SharedModule, CurrencyPriceInputComponent],
})
export class ConverterComponent implements OnInit, OnDestroy {
  baseAmount: number = 1;
  convertedAmount: number = 0;
  baseCurrency: string = 'USD';
  convertedCurrency: string = 'UAH';
  rates: ExchangeRate['rates'] = {};

  private subscriptions = new Subscription();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.apiService.fetchRates().subscribe((rates: ExchangeRate['rates']) => {
        this.rates = rates;
        this.convertConvertedCurrency();
      })
    );
  }

  convertBaseCurrency() {
    if (!this.rates[this.baseCurrency] || !this.rates[this.convertedCurrency]) {
      return;
    }

    this.baseAmount = parseFloat(
      (
        (this.convertedAmount * this.rates[this.baseCurrency]) /
        this.rates[this.convertedCurrency]
      ).toFixed(2)
    );
  }

  convertConvertedCurrency() {
    if (!this.rates[this.baseCurrency] || !this.rates[this.convertedCurrency]) {
      return;
    }

    this.convertedAmount = parseFloat(
      (
        (this.baseAmount * this.rates[this.convertedCurrency]) /
        this.rates[this.baseCurrency]
      ).toFixed(2)
    );
  }

  handleValuesChange(event: CurrencyPriceInput, index: number) {
    const { currency, amount } = event;

    switch (index) {
      case 1:
        this.baseCurrency = currency;
        this.baseAmount = Number(amount);

        this.convertConvertedCurrency();
        break;
      case 2:
        this.convertedCurrency = currency;
        this.convertedAmount = Number(amount);

        this.convertBaseCurrency();
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
