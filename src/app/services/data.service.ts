import { inject, Injectable } from '@angular/core';
import { WeatherType } from '../model/weather-type.data';
import { dayly, TwoWeeksType } from '../model/two-weeks-type.data';
import { CitiesType } from '../model/cities-type.data';
import { KeyService } from './key.service';
import { WeatherService } from './weather.service';
import { SettingsService } from './settings.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private unit: SettingsService = inject(SettingsService);

  private haveData: boolean = false;

  // private apikeyservice: KeyService = inject(KeyService);

  private weatherdata: WeatherService = inject(WeatherService);

  private data!: WeatherType;
  private currentWeatherSubject = new BehaviorSubject<any>(null);
  private twoWeeksData!: TwoWeeksType;
  private listCities: CitiesType[] = [];
  private searchLocation!: string;
  private visibilityKM!: number;
  private specificDay!: dayly;

  public setCurrentWeatherData(response: WeatherType) {
    this.visibilityKM = Math.round(response.visibility / 1000);

    if (this.unit.getSettings().distanceUnits == 'mi') {
      response.visibility = Math.round(
        response.visibility * 0.0006213712121212121,
      );
    } else {
      response.visibility = Math.round(response.visibility / 1000);
    }
    // console.log(response.visibility);

    response.main.feels_like = Math.floor(response.main.feels_like);
    response.weather[0].icon =
      'https://openweathermap.org/img/wn/' +
      response.weather[0].icon +
      '@2x.png';
    response.main.temp = Math.floor(response.main.temp);
    response.name = `${response.name}, ${response.sys.country}`;
    this.data = response;
    this.currentWeatherSubject.next(response);
    this.haveData = true;
  }

  public getVisKm() {
    return this.visibilityKM;
  }

  public setTwoWeeksData(response: TwoWeeksType) {
    this.twoWeeksData = response;
    this.specificDay = response.daily[0];
  }

  public setSelectedDay(response: dayly) {
    this.specificDay = response;
  }

  public getSelectedDayData() {
    return this.specificDay;
  }

  public setSearch(cityList: CitiesType[]) {
    this.listCities = cityList;
  }

  public setSearchTerm(cityName: string) {
    this.searchLocation = cityName;
  }

  public getSearchTerm() {
    return this.searchLocation;
  }

  public clearSearch() {
    this.listCities = [];
  }

  public search(city: CitiesType) {
    this.weatherdata
      .getWeatherDataFromApi(
        city.name,
        city.country,
        this.unit.getSettings().units,
      )
      .subscribe((data) => {
        this.setCurrentWeatherData(data);
      });

    this.weatherdata
      .getTwoWeeksForcast(city.lat, city.lon, this.unit.getSettings().units)
      .subscribe((data) => {
        //console.log(data);
        // this.twoWeeksData.update(() => data);
        this.setTwoWeeksData(data);
      });

    this.clearSearch();
  }

  public onInputSubmit(value: string) {
    if (value === '') {
      this.clearSearch();
      return;
    }
    this.setSearchTerm(value);
    this.weatherdata.getLocationInfo(this.searchLocation).subscribe((city) => {
      this.setSearch(city);
    });
    console.log(this.searchLocation);
  }

  public getCurrentWeather() {
    return this.data;
    //return this.objData;
  }

  public currentWeather$() {
    return this.currentWeatherSubject.asObservable();
  }

  public getTwoWeeks() {
    return this.twoWeeksData;
  }

  public getListOfCities() {
    return this.listCities;
  }

  public responseStatus() {
    if (this.haveData) {
      return true;
    }
    return this.haveData;
  }
}
