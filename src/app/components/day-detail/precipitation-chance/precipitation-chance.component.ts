import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { solarWindBold } from '@ng-icons/solar-icons/bold';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-precipitation-chance',
  imports: [NgFor],
  viewProviders: [provideIcons({ solarWindBold })],
  templateUrl: './precipitation-chance.component.html',
  styleUrl: './precipitation-chance.component.css',
})
export class PrecipitationChanceComponent {
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

  getFilteredHourlyData() {
    return this.data.getHourlyData().filter((_, i) => i % 2 === 0);
  }

  floorNumber(number: number) {
    return Math.floor(number);
  }
}
