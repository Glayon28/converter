import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberFormat]',
})
export class NumberFormatDirective {
  @Input('appNumberFormat') decimalPlaces: number = 2;

  constructor(private el: ElementRef) {}

  @HostListener('blur') onBlur() {
    this.formatNumber();
  }

  private formatNumber() {
    let value = parseFloat(this.el.nativeElement.value);
    if (!isNaN(value)) {
      this.el.nativeElement.value = value.toFixed(this.decimalPlaces);
    }
  }
}
