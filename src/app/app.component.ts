import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/header/sidebar/sidebar.component';
import { AccountComponentComponent } from './components/header/account-component/account-component.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';
import { MapCardComponent } from './components/map-card/map-card.component';
import { HighlightCardComponent } from './components/highlight-card/highlight-card.component';
import { WeatherService } from './services/weather.service';
import { CurrentLocationService } from './services/current-location.service';
import { WeatherType } from './model/weather-type.data';
import { LocationType } from './model/location-type.data';
import { CitiesType } from './model/cities-type.data';
import { TwoWeeksType } from './model/two-weeks-type.data';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from './services/data.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DataService],
})
export class AppComponent implements OnInit, OnDestroy {
  private cdr!: ChangeDetectorRef;
  private destroy = new Subject<void>();

  weatherdata: WeatherService = inject(WeatherService);
  deviceLocation: CurrentLocationService = inject(CurrentLocationService);
  dataService: DataService = inject(DataService);
  autoLAT = 0;
  autoLON = 0;

  // data = signal<WeatherType | null>(null);
  // temperature = signal<number>(0);
  // location = signal<string>('');
  // icon = signal('');

  dateConstructor = new Date();
  date = signal(this.dateConstructor.toLocaleDateString());

  searchedLocation = this.dataService.getSearchTerm();
  listCities: CitiesType[] = [];

  //2weeks forcast data
  twoWeeksData = signal<TwoWeeksType | undefined>(undefined);

  title = 'Weather-App';
  key = '14165bbcf9dd417ddc8ee87ecd6fbe32';
  defaultCITY = 'London';
  defaultCountry = 'uk';
  defaultLat = 55.37;
  defaultLon = 3.43;
  active = true;

  loaded = false;

  ngOnInit(): void {
    if (this.active) {
      this.deviceLocation
        .getCurrentLocation()
        .then((coords) => {
          // console.log(coords);
          // console.log(coords.latitude);
          // console.log(coords.longitude);
          this.autoLAT = coords.latitude;
          this.autoLON = coords.longitude;
          //console.log('autolat: ' + this.autoLAT + ' autolon: ' + this.autoLON);

          this.weatherdata
            .getReverseLocationInfo(this.key, this.autoLAT, this.autoLON)
            .then((data: WeatherType) => {
              // console.log(data);
              // data.visibility = Math.round(data.visibility / 1000);
              // data.main.feels_like = Math.floor(data.main.feels_like);
              // this.data.set(data);
              // this.icon.set(
              //   'https://openweathermap.org/img/wn/' +
              //     data?.weather[0].icon +
              //     '@2x.png'
              // );
              // this.location.set(data?.name ?? '');
              // this.temperature.set(Math.floor(data?.main.temp ?? 0));
              this.dataService.setCurrentWeatherData(data);
              console.log(this.dataService.getCurrentWeather());
            });

          this.weatherdata
            .getTwoWeeksForcast(this.key, this.autoLAT, this.autoLON)
            .pipe(takeUntil(this.destroy))
            .subscribe((data) => {
              //console.log(data);
              // this.twoWeeksData.set(data);
              this.dataService.setTwoWeeksData(data);
            });
        })
        .catch((error) => {
          console.log('This is the error with the geolocation: ' + error);
        });
      // if (this.autoLAT && this.autoLON) {
      //console.log('autolat: ' + this.autoLAT + ' autolon: ' + this.autoLON);

      // } else {
      //   this.weatherdata
      //     .getWeatherDataFromApi(
      //       this.key,
      //       this.defaultCITY,
      //       this.defaultCountry
      //     )
      //     .pipe(takeUntil(this.destroy))
      //     .subscribe((data) => {
      //       this.data.set(data);
      //       this.icon.set(
      //         'https://openweathermap.org/img/wn/' +
      //           data.weather[0].icon +
      //           '@2x.png'
      //       );
      //       this.location.set(this.defaultCITY);
      //       this.temperature.set(Math.floor(data.main.temp));
      //     });
      //   }
    }

    this.loaded = true;
  }

  searchLocations() {
    this.weatherdata
      .getLocationInfo(this.key, this.searchedLocation)
      .pipe(takeUntil(this.destroy))
      .subscribe((city) => {
        //this.listCities = city;
        this.dataService.setSearch(city);
      });
  }

  onSearchLocationSubmit(searchInput: string) {
    if (searchInput === '') {
      //this.listCities = [];
      this.dataService.clearSearch();
      return;
    }
    this.dataService.setSearchTerm(searchInput);
    // this.searchedLocation = searchInput || '';
    this.searchLocations();
    //console.log(this.listCities);
  }

  UpdateWeather(key: string, city: string, country: string) {
    this.weatherdata
      .getWeatherDataFromApi(key, city, country)
      .pipe(takeUntil(this.destroy))
      .subscribe((data) => {
        // data.visibility = Math.round(data.visibility / 1000);
        // data.main.feels_like = Math.floor(data.main.feels_like);
        // this.data.set(data);
        // this.icon.set(
        //   'https://openweathermap.org/img/wn/' +
        //     data.weather[0].icon +
        //     '@2x.png'
        // );
        // this.temperature.set(Math.floor(data.main.temp));
        this.dataService.setCurrentWeatherData(data);
      });
  }

  updateForecast(key: string, lat: number, lon: number) {
    this.weatherdata
      .getTwoWeeksForcast(key, lat, lon)
      .pipe(takeUntil(this.destroy))
      .subscribe((data) => {
        //console.log(data);
        // this.twoWeeksData.update(() => data);
        this.dataService.setTwoWeeksData(data);
      });
    // this.cdr.detectChanges();
  }

  searchResultClicked(city: CitiesType) {
    //const locationString = `${city.name}, ${city.country}`;
    //this.location.update(() => locationString);
    this.UpdateWeather(this.key, city.name, city.country);
    //console.log(city);
    this.updateForecast(this.key, city.lat, city.lon);
    //console.log(this.twoWeeksData());
    this.dataService.clearSearch();
    // this.listCities = [];
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
