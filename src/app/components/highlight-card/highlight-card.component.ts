import { Component, inject, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { WeatherType } from '../../model/weather-type.data';
import {
  hugeDroplet,
  hugeEye,
  hugeThermometerWarm,
  hugeSunset,
  hugeSunrise,
} from '@ng-icons/huge-icons';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-highlight-card',
  imports: [NgIcon],
  templateUrl: './highlight-card.component.html',
  styleUrl: './highlight-card.component.scss',
  viewProviders: [
    provideIcons({
      hugeDroplet,
      hugeEye,
      hugeThermometerWarm,
      hugeSunset,
      hugeSunrise,
    }),
  ],
})
export class HighlightCardComponent {
  data: DataService = inject(DataService);

  //data = input<WeatherType | null>();
  sunriseTime() {
    const dateConstructor = new Date(
      this.data.getCurrentWeather()?.sys.sunrise ?? 0 * 1000
    ).getUTCHours();
    return dateConstructor;
  }
  sunsetTime() {
    const dateConstructor = new Date(
      this.data.getCurrentWeather()?.sys.sunset ?? 0 * 1000
    ).getUTCHours();
    return dateConstructor;
  }

  humidityStatus() {}

  visibilityStatus() {}

  windSpeedUnit() {
    return 'Km/h';
  }

  dewPoint() {
    let feelslike = this.data.getCurrentWeather()?.main?.feels_like;
    let humidity = this.data.getCurrentWeather()?.main?.humidity;

    let result =
      feelslike !== undefined && humidity !== undefined
        ? feelslike - (100 - humidity) / 5
        : undefined;
    return Math.floor(result ?? 0);
  }

  date = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  currentTime = signal(this.date);
}
