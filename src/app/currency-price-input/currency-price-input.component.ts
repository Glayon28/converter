import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SharedModule } from '../shared.module';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ExchangeRate } from '../services/api.service';

@Component({
  selector: 'app-currency-price-input',
  templateUrl: './currency-price-input.component.html',
  styleUrl: './currency-price-input.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule, FormsModule],
})
export class CurrencyPriceInputComponent implements OnInit, OnDestroy {
  @Input() amount!: number;
  @Input() currency!: string;
  @Input() rates!: ExchangeRate['rates'];

  @Output() valuesChange: EventEmitter<CurrencyPriceInput> =
    new EventEmitter<CurrencyPriceInput>();

  private subscriptions = new Subscription();
  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      amount: [this.amount, [Validators.required, Validators.pattern(/\d$/)]],
      currency: [this.currency, [Validators.required]],
    });

    this.subscriptions.add(
      this.form.valueChanges.subscribe((change: CurrencyPriceInput) => {
        this.valuesChange.emit(change);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

export interface CurrencyPriceInput {
  amount: string;
  currency: string;
}
