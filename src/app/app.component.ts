import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ConverterComponent } from './converter/converter.component';
import { SharedModule } from './shared.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, ConverterComponent, SharedModule],
})
export class AppComponent {}
