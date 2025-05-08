import { Component, Input, input, signal } from '@angular/core';

@Component({
  selector: 'app-day-card',
  imports: [],
  templateUrl: './day-card.component.html',
  styleUrl: './day-card.component.css',
})
export class DayCardComponent {
  dt: any = input<number>();
  icon = input();
  max_temp_input = input<number>();
  min_temp_input = input<number>();
  min_temp = signal<number>(0);
  max_temp = signal<number>(0);
  temp_comment = input();
  dateConstructor: any = new Date(this.dt * 1000);
  calendarDay = signal('');
  day = signal('');

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
    const minTempValue = this.min_temp_input();
    const maxTempValue = this.max_temp_input();
    if (minTempValue !== undefined && maxTempValue !== undefined) {
      this.min_temp.set(Math.floor(minTempValue));
      this.max_temp.set(Math.floor(maxTempValue));
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
