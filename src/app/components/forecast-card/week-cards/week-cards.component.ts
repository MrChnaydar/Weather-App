import { Component, input, OnInit, signal } from '@angular/core';
import { WeatherType } from '../../../model/weather-type.data';

@Component({
  selector: 'app-week-cards',
  imports: [],
  templateUrl: './week-cards.component.html',
  styleUrl: './week-cards.component.scss',
})
export class WeekCardsComponent implements OnInit {
  minTempInput = input<number>();
  maxTempInput = input<number>();

  minTemp = signal<number>(0);
  maxTemp = signal<number>(0);
  icon = input();
  dt: any = input<number>();
  calendarDay = signal('');
  day = signal('');
  dateConstructor: any = new Date(this.dt * 1000);

  ngOnInit(): void {
    const day = this.dateConstructor.getDate();
    const month = this.dateConstructor.toLocaleDateString('en-US', {
      month: 'long',
    });
    const dayname = this.dateConstructor.toLocaleDateString('en-US', {
      weekday: 'long',
    });
    this.calendarDay.set(`${day},${month}`);
    this.day.set(dayname);
    const minTempValue = this.minTempInput();
    const maxTempValue = this.maxTempInput();
    if (minTempValue !== undefined && maxTempValue !== undefined) {
      this.minTemp.set(Math.floor(minTempValue));
      this.maxTemp.set(Math.floor(maxTempValue));
    }
  }

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
    const uniXstamp = this.dt();
    // console.log(uniXstamp);
    return this.transformDateParts(uniXstamp);
  }
}
