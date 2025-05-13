import { Component, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-temperature-trend',
  imports: [],
  templateUrl: './temperature-trend.component.html',
  styleUrl: './temperature-trend.component.css',
})
export class TemperatureTrendComponent {
  data: DataService = inject(DataService);

  calculateHeight() {
    const minTemp = this.data.getTwoWeeks().hourly;
  }
}
