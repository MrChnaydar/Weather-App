import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { solarWindBold } from '@ng-icons/solar-icons/bold';

@Component({
  selector: 'app-precipitation-chance',
  imports: [],
  viewProviders: [provideIcons({ solarWindBold })],
  templateUrl: './precipitation-chance.component.html',
  styleUrl: './precipitation-chance.component.css',
})
export class PrecipitationChanceComponent {}
