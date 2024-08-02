import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
})
export class ConverterComponent implements OnInit {
  amount1: number = 1;
  amount2: number = 1;
  currency1: string = 'USD';
  currency2: string = 'UAH';
  rates: any = {};

  ngOnInit(): void {
    this.fetchRates();
  }

  async fetchRates() {
    const response = await axios.get(
      'https://api.exchangerate-api.com/v4/latest/USD'
    );
    this.rates = response.data.rates;
    this.convert();
  }

  convert() {
    this.amount2 =
      (this.amount1 * this.rates[this.currency2]) / this.rates[this.currency1];
    this.amount1 = parseFloat(this.amount1.toFixed(2));
    this.amount2 = parseFloat(this.amount2.toFixed(2));
  }

  handleAmount1Change(amount: number) {
    this.amount1 = amount;
    this.convert();
  }

  handleCurrency1Change(currency: string) {
    this.currency1 = currency;
    this.convert();
  }

  handleAmount2Change(amount: number) {
    this.amount2 = amount;
    this.amount1 =
      (amount * this.rates[this.currency1]) / this.rates[this.currency2];
    this.amount1 = parseFloat(this.amount1.toFixed(2));
    this.amount2 = parseFloat(this.amount2.toFixed(2));
  }

  handleCurrency2Change(currency: string) {
    this.currency2 = currency;
    this.convert();
  }
}
