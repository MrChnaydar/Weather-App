import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';

import {
  hugeDroplet,
  hugeEye,
  hugeThermometerWarm,
  hugeSunset,
  hugeSunrise,
} from '@ng-icons/huge-icons';
import { solarWindBoldDuotone } from '@ng-icons/solar-icons/bold-duotone';

import { DataService } from '../../services/data.service';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subject } from 'rxjs';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-highlight-card',
  imports: [NgIcon, NgxChartsModule],
  standalone: true,
  templateUrl: './highlight-card.component.html',
  styleUrl: './highlight-card.component.scss',
  viewProviders: [
    provideIcons({
      hugeDroplet,
      hugeEye,
      hugeThermometerWarm,
      hugeSunset,
      hugeSunrise,
      solarWindBoldDuotone,
    }),
  ],
})
export class HighlightCardComponent {
  data: DataService = inject(DataService);
  private setting: SettingsService = inject(SettingsService);

  windGraphData() {
    // if (this.windSpeedObject[0].value != this.windSpeedData) {
    //   this.windSpeedData = this.data.getCurrentWeather().wind.speed;
    //   this.windSpeedObject = [
    //     { name: 'Velocity', value: this.data.getCurrentWeather().wind.speed },
    //   ];
    //   return this.windSpeedObject;
    // }
    return [
      { name: 'Velocity', value: this.data.getCurrentWeather().wind.speed },
    ];
  }

  uvGraphColor() {
    if (this.data.getTwoWeeks().current.uvi <= 4) {
      return 'air';
    } else if (this.data.getTwoWeeks().current.uvi <= 7) {
      return 'solar';
    } else {
      return 'fire';
    }
  }

  //data = input<WeatherType | null>();
  sunriseTime() {
    //console.log('sunrise :' + this.data.getCurrentWeather().sys.sunrise);
    return new Date(
      this.data.getCurrentWeather().sys.sunrise * 1000
    ).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: this.setting.getSettings().timeFormat == 12 ? true : false, // Set to true for 12-hour format (AM/PM)
    });
    // const dateConstructor = new Date(
    //   this.data.getCurrentWeather()?.sys.sunrise ?? 0 * 1000
    // ).getUTCHours();
    // return dateConstructor;
  }

  sunsetTime() {
    //console.log('sunset :' + this.data.getCurrentWeather().sys.sunset);
    return new Date(
      this.data.getCurrentWeather().sys.sunset * 1000
    ).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: this.setting.getSettings().timeFormat == 12 ? true : false, // Set to true for 12-hour format (AM/PM)
    });
    // const dateConstructor = new Date(
    //   this.data.getCurrentWeather()?.sys.sunset ?? 0 * 1000
    // ).getUTCHours();
    // return dateConstructor;
  }

  // convertToCelcius(temp: number) {
  //   if (this.setting.getSettings().units == 'imperial') {
  //     return (5 / 9) * (temp - 32);
  //   }
  // }

  humidityStatus(feelsLike: number, humidity: number): string {
    let temp = feelsLike;
    if (this.setting.getSettings().units == 'imperial') {
      temp = (5 / 9) * (temp - 32);
    }
    if (temp <= 0) {
      if (humidity <= 30)
        return 'Feels even colder due to dry air, risk of frostbite ❄️';
      if (humidity <= 60)
        return 'Still freezing, but moisture helps slightly 🌫️';
      if (humidity <= 80) return 'Cold, but damp air makes it feel heavier 🌧️';
      return 'Icy and damp, risk of hypothermia ⚠️';
    } else if (temp <= 10) {
      if (humidity <= 30) return 'Dry cold, sharp air but tolerable 🌬️';
      if (humidity <= 60)
        return 'Cool and fresh, comfortable for most people 🍃';
      if (humidity <= 80) return 'Feels a little colder due to moisture ❄️';
      return 'Cold and damp, can feel bone-chilling 🌫️';
    } else if (temp <= 20) {
      if (humidity <= 30) return 'Crisp and fresh, ideal weather ☀️';
      if (humidity <= 60) return 'Comfortable warmth with slight humidity 🌤️';
      if (humidity <= 80) return 'Slightly humid but still pleasant 🌥️';
      return 'Sticky coolness, moisture makes it feel cooler 🌧️';
    } else if (temp <= 25) {
      if (humidity <= 30) return 'Dry and warm, comfortable for most people ☀️';
      if (humidity <= 60) return 'Warm with mild humidity, still pleasant 🌤️';
      if (humidity <= 80) return 'Humidity makes it feel a bit warmer 🌥️';
      return 'Sticky warmth, slight discomfort starts 🌆';
    } else if (temp <= 30) {
      if (humidity <= 30) return 'Dry heat, tolerable but warm 🌞';
      if (humidity <= 60) return 'Warm and slightly sweaty, but bearable 🌤️';
      if (humidity <= 80)
        return 'Feels hotter due to humidity, sweat struggles to evaporate 🌆';
      return 'Muggy and heavy air, discomfort rising 🥵';
    } else if (temp <= 35) {
      if (humidity <= 30) return 'Hot but breathable, stay hydrated 🔥';
      if (humidity <= 60) return 'Feels hotter, noticeable discomfort 🌇';
      if (humidity <= 80) return 'Heavy heat, sweating a lot 🌆';
      return 'Feels oppressive, risk of heat exhaustion 🫠';
    } else if (temp <= 40) {
      if (humidity <= 30) return 'Intense dry heat, like a desert 🏜️';
      if (humidity <= 60) return 'Very hot, uncomfortable for long exposure 🌞';
      if (humidity <= 80) return 'Dangerous humidity, feels suffocating 🥵';
      return 'Feels like a sauna, extreme caution needed ⚠️';
    } else {
      if (humidity <= 30) return 'Extremely dry heat, risk of dehydration 🚨';
      if (humidity <= 60) return 'Feels like a furnace, heatstroke risk 🚑';
      if (humidity <= 80) return 'Almost unbearable, heat stress likely 🫠';
      return 'Deadly combination, avoid outdoor exposure 🚨';
    }
  }

  visibilityStatus(): string {
    let visibility = this.data.getVisKm();
    if (visibility >= 10) {
      return 'Clear visibility';
    } else if (visibility >= 6) {
      return 'Slightly reduced, light mist';
    } else if (visibility >= 3) {
      return 'Haze is affecting visibility';
    } else if (visibility >= 1) {
      return 'Moderate fog, significant visibility reduction';
    } else if (visibility >= 0.5) {
      return 'Heavy fog, very limited visibility';
    } else if (visibility >= 0.1) {
      return 'Dense fog, extreme visibility reduction';
    } else {
      return 'Almost no visibility, dangerous conditions';
    }
  }

  windSpeedUnit() {
    if (this.setting.getSettings().units === 'imperial') {
      return 'mph';
    }
    return 'm/s';
  }

  maxWindSpeed() {
    if (this.windSpeedUnit() == 'mph') {
      return 200;
    }
    return 100;
  }

  visibilityUnits() {
    return this.setting.getSettings().distanceUnits;
  }

  dewPoint() {
    let feelslike = this.data.getCurrentWeather()?.main?.feels_like;
    let humidity = this.data.getCurrentWeather()?.main?.humidity;
    if (this.setting.getSettings().units == 'imperial') {
      feelslike = (5 / 9) * (feelslike - 32);
    }

    let result =
      feelslike !== undefined && humidity !== undefined
        ? feelslike - (100 - humidity) / 5
        : undefined;
    return Math.floor(result ?? 0);
  }

  date = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: this.setting.getSettings().timeFormat == 12 ? true : false,
  });

  currentTime = signal(this.date);
}
