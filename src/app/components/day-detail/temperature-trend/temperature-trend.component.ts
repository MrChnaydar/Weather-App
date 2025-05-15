import { Component, inject, input, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-temperature-trend',
  imports: [NgFor],
  templateUrl: './temperature-trend.component.html',
  styleUrl: './temperature-trend.component.css',
})
export class TemperatureTrendComponent {
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

  calculateHeight(hora: number) {
    const minTemp = Math.min(...this.data.getHourlyData().map((t) => t.temp));
    const maxTemp = Math.max(...this.data.getHourlyData().map((t) => t.temp));
    // console.log(maxTemp, ...this.data.getHourlyData().map((t) => t.temp));
    // console.log(minTemp, ...this.data.getHourlyData().map((t) => t.temp));
    const range = maxTemp - minTemp;
    const heightPercentage =
      range > 0 ? ((hora - minTemp) / range) * (100 - 30) : 50;

    return heightPercentage + 10;
  }

  floorNumber(number: number) {
    return Math.floor(number);
  }
}
