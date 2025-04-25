import {
  Component,
  input,
  output,
  EventEmitter,
  signal,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';

import {
  hugeSearch01,
  hugeLocation01,
  hugeCalendar03,
} from '@ng-icons/huge-icons';
import { solarCloudStormBold } from '@ng-icons/solar-icons/bold';
import { solarCloudStormBoldDuotone } from '@ng-icons/solar-icons/bold-duotone';
import { CitiesType } from '../../model/cities-type.data';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { WeatherType } from '../../model/weather-type.data';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-weather-card',
  imports: [NgIcon, CommonModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
  // providers:[DataService],
  viewProviders: [
    provideIcons({
      hugeSearch01,
      solarCloudStormBold,
      hugeLocation01,
      hugeCalendar03,
      solarCloudStormBoldDuotone,
    }),
  ],
})
export class WeatherCardComponent {
  active = false;

  data: DataService = inject(DataService);
  settings: SettingsService = inject(SettingsService);

  dateConstructor = new Date();
  datetime = signal(this.dateConstructor.toLocaleDateString());

  unit() {
    if (this.settings.getSettings().units == 'metric') {
      return 'C';
    } else {
      return 'F';
    }
  }

  // temperature: any = input();
  // weather: any = input();
  // location = input<string>();
  //datetime: any = input();
  // icon: any = input();
  // listOfCities = input<Array<CitiesType>>();

  // searched = output<string>();
  // citySelected = output<CitiesType>();

  // onSearch(searchInput: string) {
  //   // console.log(searchInput);
  //   this.searched.emit(searchInput);
  // }

  // onSelect(city: CitiesType) {
  //   // console.log(city);
  //   // this.citySelected.emit(city);
  //   //this.data.setSearch(city);
  // }
}
