import { Component, inject, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TemperatureTrendComponent } from './temperature-trend/temperature-trend.component';
import { HourlyForecastComponent } from './hourly-forecast/hourly-forecast.component';
import { PrecipitationChanceComponent } from './precipitation-chance/precipitation-chance.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

@Component({
  selector: 'app-day-detail',
  imports: [
    TemperatureTrendComponent,
    HourlyForecastComponent,
    PrecipitationChanceComponent,
    WeatherDetailsComponent,
  ],
  templateUrl: './day-detail.component.html',
  styleUrl: './day-detail.component.css',
})
export class DayDetailComponent {
  data: DataService = inject(DataService);
  dateConstructor: any = new Date(this.data.getSelectedDayData().dt * 1000);
  calendarDay = signal('');
  day = signal('');
  currentYear: number = new Date().getFullYear();
  today = new Date().getDate();
  // firstDayData = this.data.getTwoWeeks().hourly.slice(0, 24);
  // secondDayData = this.data.getTwoWeeks().hourly.slice(24, 48);
  panel: string = 'temperature_trend';

  transformDateParts(unixTimestamp: number): {
    day: number;
    month: string;
    weekday: string;
  } {
    // Create a new Date object from the Unix timestamp (milliseconds)
    const date = new Date(unixTimestamp * 1000);
    // Extract the formatted date parts
    const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' }); // "Monday"
    const month = date.toLocaleDateString('en-GB', { month: 'long' }); // "July"
    const day = date.getDate(); // "25"

    // Return an object with day, month, and weekday
    return { day, month, weekday };
  }

  getFormattedDateParts(): { day: number; month: string; weekday: string } {
    // if (this.data.getSelectedDayData().dt != undefined) {
    //   //console.log(this.data.getSelectedDayData().dt);
    //   return this.transformDateParts(this.data.getCurrentWeather().dt);
    // }
    const uniXstamp = this.data.getSelectedDayData().dt;
    //console.log(uniXstamp);
    return this.transformDateParts(uniXstamp);
  }

  getIcon(icon: string) {
    return 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
  }

  floorTemp(temp: number) {
    return Math.floor(temp);
  }

  scrollToSection(id: string) {
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: 'smooth', inline: 'start' });
    this.panel = id;
  }
}
