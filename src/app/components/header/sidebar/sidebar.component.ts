import { Component, input } from '@angular/core';
import {
  hugeMenuCircle,
  hugeMaps,
  hugeLocation01,
  hugeCalendar03,
  hugeSettings01,
  hugeChartRing,
} from '@ng-icons/huge-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [NgIcon, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  viewProviders: [
    provideIcons({
      hugeMenuCircle,
      hugeMaps,
      hugeLocation01,
      hugeCalendar03,
      hugeSettings01,
      hugeChartRing,
    }),
  ],
})
export class SidebarComponent {}
