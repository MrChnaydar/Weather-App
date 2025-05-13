import { Component, inject, input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { hourly } from '../../../model/two-weeks-type.data';

@Component({
  selector: 'app-temperature-trend',
  imports: [],
  templateUrl: './temperature-trend.component.html',
  styleUrl: './temperature-trend.component.css',
})
export class TemperatureTrendComponent {
  data: DataService = inject(DataService);
  hourList = input<Array<hourly>>();

  calculateHeight() {
    const minTemp = this.hourList;
  }
}
