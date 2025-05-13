import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent {
  currentYear: number = new Date().getFullYear();
}
