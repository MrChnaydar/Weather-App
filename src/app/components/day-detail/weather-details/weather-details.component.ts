import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  solarTemperatureBold,
  solarUmbrellaBold,
  solarWindBold,
  solarSunBold,
  solarCloudSun2Bold,
} from '@ng-icons/solar-icons/bold';

import { DataService } from '../../../services/data.service';
import { NgIf } from '@angular/common';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-weather-details',
  imports: [NgIcon, NgIf],
  viewProviders: [
    provideIcons({
      solarTemperatureBold,
      solarUmbrellaBold,
      solarWindBold,
      solarSunBold,
      solarCloudSun2Bold,
    }),
  ],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css',
})
export class WeatherDetailsComponent {
  data: DataService = inject(DataService);
  setting: SettingsService = inject(SettingsService);

  getMetricSystem() {
    if (this.setting.getSettings().units == 'metric') {
      return 'm/s';
    } else {
      return 'mph';
    }
  }

  sunriseTime() {
    return new Date(
      this.data.getSelectedDayData().sunrise * 1000,
    ).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: this.setting.getSettings().timeFormat == 12 ? true : false,
    });
  }

  sunsetTime() {
    return new Date(
      this.data.getSelectedDayData().sunset * 1000,
    ).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: this.setting.getSettings().timeFormat == 12 ? true : false,
    });
  }

  getMoonPhase(phase: number): string {
    const rounded = Number(phase.toFixed(2));

    if (rounded === 0 || rounded === 1) return 'New Moon';
    if (rounded === 0.25) return 'First Quarter Moon';
    if (rounded === 0.5) return 'Full Moon';
    if (rounded === 0.75) return 'Last Quarter Moon';

    if (rounded > 0 && rounded < 0.25) return 'Waxing Crescent';
    if (rounded > 0.25 && rounded < 0.5) return 'Waxing Gibbous';
    if (rounded > 0.5 && rounded < 0.75) return 'Waning Gibbous';
    if (rounded > 0.75 && rounded < 1) return 'Waning Crescent';

    return 'Unknown Phase';
  }

  getWindDirection(wind: number) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((wind % 360) / 45) % 8;
    return directions[index];
  }

  getMydata() {
    return this.data.getSelectedDayData();
  }

  transformDateParts(unixTimestamp: number): {
    day: number;
    month: string;
    weekday: string;
    hour: string;
  } {
    // Create a new Date object from the Unix timestamp (milliseconds)
    const date = new Date(unixTimestamp * 1000);
    // Extract the formatted date parts
    const hour = String(date.getHours()).padStart(2, '0');
    const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' }); // "Monday"
    const month = date.toLocaleDateString('en-GB', { month: 'long' }); // "July"
    const day = date.getDate(); // "25"

    // Return an object with day, month, and weekday
    return { day, month, weekday, hour };
  }

  getFilteredHourlyData() {
    return this.data.getHourlyData().filter((_, i) => i % 2 === 0);
  }

  floorNumber(number: number) {
    return Math.floor(number);
  }

  dewPoint() {
    let feelslike = this.data.getSelectedDayData().feels_like.day;
    let humidity = this.data.getSelectedDayData().humidity;
    if (this.setting.getSettings().units == 'imperial') {
      feelslike = (5 / 9) * (feelslike - 32);
    }

    let result =
      feelslike !== undefined && humidity !== undefined
        ? feelslike - (100 - humidity) / 5
        : undefined;
    return Math.floor(result ?? 0);
  }
}
