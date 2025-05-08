import { Component, inject, signal } from '@angular/core';
import { DayCardComponent } from './day-card/day-card.component';
import { DataService } from '../../services/data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-calendar-strip',
  imports: [DayCardComponent, NgFor],
  templateUrl: './calendar-strip.component.html',
  styleUrl: './calendar-strip.component.css',
})
export class CalendarStripComponent {
  data: DataService = inject(DataService);

  todayNumber() {
    return new Date().getDate();
  }

  current_day_selected = signal(this.todayNumber());

  sendSelectedDay(day: any) {
    this.current_day_selected.set(day);

    // console.log(day);
    // console.log(this.todayNumber());
  }
}
