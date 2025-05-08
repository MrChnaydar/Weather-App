import { Component } from '@angular/core';
import { CalendarStripComponent } from '../../components/calendar-strip/calendar-strip.component';
import { DayDetailComponent } from '../../components/day-detail/day-detail.component';

@Component({
  selector: 'app-calendar',
  imports: [CalendarStripComponent, DayDetailComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  currentYear: any;
}
