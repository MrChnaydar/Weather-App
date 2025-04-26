import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { WeatherService } from './services/weather.service';
import { CurrentLocationService } from './services/current-location.service';
import { WeatherType } from './model/weather-type.data';
import { CitiesType } from './model/cities-type.data';
import { TwoWeeksType } from './model/two-weeks-type.data';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DataService } from './services/data.service';
import { SettingsService } from './services/settings.service';

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
  private settingsChangedSubscription!: Subscription;

  //Services
  weatherdata: WeatherService = inject(WeatherService);
  deviceLocation: CurrentLocationService = inject(CurrentLocationService);
  dataService: DataService = inject(DataService);
  settings: SettingsService = inject(SettingsService);

  autoLAT!: number;
  autoLON!: number;

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
            .getReverseLocationInfo(
              this.autoLAT || this.defaultLat,
              this.autoLON || this.defaultLon,
              this.settings.getSettings().units,
            )
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
              //console.log(this.dataService.getCurrentWeather());
            });

          this.weatherdata
            .getTwoWeeksForcast(
              this.autoLAT || this.defaultLat,
              this.autoLON || this.defaultLon,
              this.settings.getSettings().units,
            )
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
      //
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
    this.settingsChangedSubscription = this.settings.settingsChanged$.subscribe(
      (changed) => {
        if (changed) {
          this.refreshApp();
        }
      },
    );
    this.loaded = true;
  }

  searchLocations() {
    this.weatherdata
      .getLocationInfo(this.searchedLocation)
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

  UpdateWeather(city: string, country: string, unit: string) {
    this.weatherdata
      .getWeatherDataFromApi(city, country, unit)
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

  updateForecast(lat: number, lon: number, unit: string) {
    this.weatherdata
      .getTwoWeeksForcast(lat, lon, unit)
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
    this.UpdateWeather(
      city.name,
      city.country,
      this.settings.getSettings().units,
    );
    //console.log(city);
    this.updateForecast(city.lat, city.lon, this.settings.getSettings().units);
    //console.log(this.twoWeeksData());
    this.dataService.clearSearch();
    // this.listCities = [];
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  refreshApp() {
    if (this.active) {
      this.deviceLocation
        .getCurrentLocation()
        .then((coords) => {
          this.autoLAT = coords.latitude;
          this.autoLON = coords.longitude;

          this.weatherdata
            .getReverseLocationInfo(
              this.autoLAT,
              this.autoLON,
              this.settings.getSettings().units,
            )
            .then((data: WeatherType) => {
              this.dataService.setCurrentWeatherData(data);
              //console.log(this.dataService.getCurrentWeather());
            });

          this.weatherdata
            .getTwoWeeksForcast(
              this.autoLAT,
              this.autoLON,
              this.settings.getSettings().units,
            )
            .pipe(takeUntil(this.destroy))
            .subscribe((data) => {
              this.dataService.setTwoWeeksData(data);
            });
        })
        .catch((error) => {
          console.log('This is the error with the geolocation: ' + error);
        });
    }
  }
}
