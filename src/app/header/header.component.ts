import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit {
  usdToUah: number = 0;
  eurToUah: number = 0;

  ngOnInit(): void {
    this.fetchRates();
  }

  async fetchRates() {
    const response = await axios.get(
      'https://api.exchangerate-api.com/v4/latest/USD'
    );
    const rates = response.data.rates;
    this.usdToUah = rates['UAH'];
    this.eurToUah = rates['UAH'] / rates['EUR'];
  }
}
