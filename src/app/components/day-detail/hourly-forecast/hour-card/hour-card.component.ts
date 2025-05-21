import { NgIf } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { solarWindBold, solarUmbrellaBold } from '@ng-icons/solar-icons/bold';
import { NgIcon } from '@ng-icons/core';
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-hour-card',
  imports: [NgIf, NgIcon],
  viewProviders: [provideIcons({ solarWindBold, solarUmbrellaBold })],
  templateUrl: './hour-card.component.html',
  styleUrl: './hour-card.component.css',
})
export class HourCardComponent {
  setting: SettingsService = inject(SettingsService);
  hour = input();
  icon = input();
  temp = input();
  wind = input();
  chances = input();
  pop = input();
  getMetricSystem() {
    if (this.setting.getSettings().units == 'metric') {
      return 'm/s';
    } else {
      return 'mph';
    }
  }
}
