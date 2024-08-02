import { NgModule } from '@angular/core';
import { NumberFormatDirective } from './number-format.directive';

@NgModule({
  declarations: [NumberFormatDirective],
  exports: [NumberFormatDirective],
})
export class SharedModule {}
