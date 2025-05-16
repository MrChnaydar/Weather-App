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

  getTempColor(temp: number): string {
    // Clamp temperature to range
    const clamped = Math.max(-20, Math.min(40, temp));

    // Define temperature gradient stops
    const gradient = [
      { temp: -10, color: [0, 0, 128] }, // Navy
      { temp: 0, color: [0, 0, 255] }, // Blue
      { temp: 10, color: [0, 200, 255] }, // Cyan
      { temp: 13, color: [0, 255, 128] }, // Aqua-green
      { temp: 17, color: [255, 255, 0] }, // Yellow
      { temp: 20, color: [255, 165, 0] }, // Orange
      { temp: 25, color: [255, 100, 0] }, // Deep Orange
      { temp: 30, color: [255, 50, 0] }, // Reddish
      { temp: 32, color: [255, 0, 0] }, // Red
    ];

    // Find the two gradient points this temp falls between
    for (let i = 0; i < gradient.length - 1; i++) {
      const curr = gradient[i];
      const next = gradient[i + 1];

      if (clamped >= curr.temp && clamped <= next.temp) {
        const ratio = (clamped - curr.temp) / (next.temp - curr.temp);

        const r = Math.round(
          curr.color[0] + ratio * (next.color[0] - curr.color[0]),
        );
        const g = Math.round(
          curr.color[1] + ratio * (next.color[1] - curr.color[1]),
        );
        const b = Math.round(
          curr.color[2] + ratio * (next.color[2] - curr.color[2]),
        );

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      }
    }

    return '#ffffff'; // fallback (shouldn't happen)
  }
}
