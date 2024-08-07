import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService, ExchangeRate } from '../services/api.service';
import { Observable, Subscription, interval, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
  usdToUah: number = 0;
  eurToUah: number = 0;

  private subscriptions = new Subscription();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscriptions.add(this.getFetchRates().subscribe());
    this.getUpdatesRates();
  }

  getUpdatesRates() {
    this.subscriptions.add(
      interval(5000)
        .pipe(
          switchMap((_) => {
            return this.getFetchRates();
          })
        )
        .subscribe()
    );
  }

  getFetchRates(): Observable<ExchangeRate['rates']> {
    return this.apiService.fetchRates().pipe(
      tap((rates: ExchangeRate['rates']) => {
        this.usdToUah = Number((rates['UAH'] / rates['USD']).toFixed(2));
        this.eurToUah = Number((rates['UAH'] / rates['EUR']).toFixed(2));
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
