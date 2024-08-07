import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchRates(): Observable<ExchangeRate['rates']> {
    return this.http
      .get<ExchangeRate>('https://api.exchangerate-api.com/v4/latest/UAH')
      .pipe(map((response: ExchangeRate) => response.rates));
  }
}

export interface ExchangeRate {
  provider: string;
  WARNING_UPGRADE_TO_V6: string;
  terms: string;
  base: string;
  date: string;
  time_last_updated: number;
  rates: { [key: string]: number };
}
