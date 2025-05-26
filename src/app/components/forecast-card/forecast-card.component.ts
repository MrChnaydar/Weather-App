import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { WeekCardsComponent } from './week-cards/week-cards.component';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-forecast-card',
  imports: [WeekCardsComponent, NgFor, NgIf],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.scss',
})
export class ForecastCardComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  showScrollDown = true;

  checkScroll() {
    const el = this.scrollContainer.nativeElement;
    this.showScrollDown = el.scrollTop === 0;
  }

  scrollToBottom() {
    const el = this.scrollContainer.nativeElement;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }

  scrollToTop() {
    const el = this.scrollContainer.nativeElement;
    el.scrollTo({ top: 0, behavior: 'smooth' });
  }
  data: DataService = inject(DataService);
}
