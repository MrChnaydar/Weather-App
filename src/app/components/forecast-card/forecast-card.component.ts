import { Component, inject, input, OnInit, signal } from '@angular/core';
import { WeekCardsComponent } from './week-cards/week-cards.component';
import { TwoWeeksType } from '../../model/two-weeks-type.data';
import { formatDate } from '@angular/common';
import { NgFor } from '@angular/common';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-forecast-card',
  imports: [WeekCardsComponent, NgFor],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.scss',
})
export class ForecastCardComponent {
  data: DataService = inject(DataService);

  // data = input<TwoWeeksType>();

  // trackDay() {
  //   return this.data()?.daily[0].dt;
  // }
  // calendarDay = signal();
  // day = signal();

  // getCalendarDate(dt : number){
  //   const formattedDate = formatDate(new Date(dt*1000), '')
  // }
}
