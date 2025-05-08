import { Component, inject } from '@angular/core';
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
}
