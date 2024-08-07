import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyPriceInputComponent } from './currency-price-input.component';

describe('CurrencyPriceInputComponent', () => {
  let component: CurrencyPriceInputComponent;
  let fixture: ComponentFixture<CurrencyPriceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyPriceInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyPriceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
