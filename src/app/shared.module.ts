import { NgModule } from '@angular/core';
import { NumberFormatDirective } from './directives/number-format.directive';

@NgModule({
  declarations: [NumberFormatDirective],
  exports: [NumberFormatDirective],
})
export class SharedModule {}
