import { Component, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { NgFor, NgIf } from '@angular/common';
import { HourCardComponent } from './hour-card/hour-card.component';

@Component({
  selector: 'app-hourly-forecast',
  imports: [NgFor, HourCardComponent],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.css',
})
export class HourlyForecastComponent {
  data: DataService = inject(DataService);

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

  getFormattedDateParts(): { day: number; month: string; weekday: string } {
    // if (this.data.getSelectedDayData().dt != undefined) {
    //   //console.log(this.data.getSelectedDayData().dt);
    //   return this.transformDateParts(this.data.getCurrentWeather().dt);
    // }
    const uniXstamp = this.data.getSelectedDayData().dt;
    //console.log(uniXstamp);
    return this.transformDateParts(uniXstamp);
  }

  floorNumber(number: number) {
    return Math.floor(number);
  }

  getFilteredHourlyData() {
    return this.data.getHourlyData().filter((_, i) => i % 2 === 0);
  }

  getIcon(icon: string) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
