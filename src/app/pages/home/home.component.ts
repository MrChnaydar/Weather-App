import {
  ChangeDetectorRef,
  Component,
  importProvidersFrom,
  inject,
  input,
  Input,
  output,
} from '@angular/core';
import { WeatherCardComponent } from '../../components/weather-card/weather-card.component';
import { ForecastCardComponent } from '../../components/forecast-card/forecast-card.component';
import { MapCardComponent } from '../../components/map-card/map-card.component';
import { HighlightCardComponent } from '../../components/highlight-card/highlight-card.component';
import { trigger, transition, style, animate } from '@angular/animations';

import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [
    ForecastCardComponent,
    MapCardComponent,
    HighlightCardComponent,
    WeatherCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private cdRef!: ChangeDetectorRef;

  //data: DataService = inject(DataService);
  // temperature = input();
  // data = input<WeatherType | null>();
  // weather = input();
  // location = input<string>();
  // datetime = input();
  // icon = input();
  // listOfCities = input<CitiesType[]>();
  // // onSearchLocationSubmit = Input();
  // // searchResultClicked = Input();
  // twoWeeksData = input<TwoWeeksType>();
  //   searched = output<string>();
  //   citySelected = output<CitiesType>();
  //   onSearch(searchInput: string) {
  //     // console.log(searchInput);
  //     this.searched.emit(searchInput);
  //   }
  //   onSelect(city: CitiesType) {
  //     // console.log(city);
  //     this.citySelected.emit(city);
  //   }

  currentYear: number = new Date().getFullYear();
}
