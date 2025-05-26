import { Component, inject, input } from '@angular/core';
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
import { DataService } from '../../../services/data.service';
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
export class SidebarComponent {
  router: Router = inject(Router);
  data: DataService = inject(DataService);
  actualPage(page: string) {
    if (page == this.data.getActualPage()) {
      return 'md:border-l-1 md:border-white md:bg-gradient-to-r md:from-slate-600 md:to-transparent border-t-1 border-white bg-gradient-to-b from-slate-600 to-transparent md:border-t-0 ';
    }
    return '';
  }
}
