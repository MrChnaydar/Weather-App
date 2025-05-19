import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { solarWindBold, solarUmbrellaBold } from '@ng-icons/solar-icons/bold';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-hour-card',
  imports: [NgIf, NgIcon],
  viewProviders: [provideIcons({ solarWindBold, solarUmbrellaBold })],
  templateUrl: './hour-card.component.html',
  styleUrl: './hour-card.component.css',
})
export class HourCardComponent {
  hour = input();
  icon = input();
  temp = input();
  wind = input();
  chances = input();
  pop = input();
}
