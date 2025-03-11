import { inject, Injectable } from '@angular/core';
import { WeatherType } from '../model/weather-type.data';
import { TwoWeeksType } from '../model/two-weeks-type.data';
import { CitiesType } from '../model/cities-type.data';
import { KeyService } from './key.service';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apikeyservice: KeyService = inject(KeyService);
  private weatherdata: WeatherService = inject(WeatherService);

  private data!: WeatherType;
  private twoWeeksData!: TwoWeeksType;
  private listCities: CitiesType[] = [];
  private searchLocation!: string;

  public setCurrentWeatherData(response: WeatherType) {
    response.visibility = Math.round(response.visibility / 1000);
    response.main.feels_like = Math.floor(response.main.feels_like);
    response.weather[0].icon =
      'https://openweathermap.org/img/wn/' +
      response.weather[0].icon +
      '@2x.png';
    response.main.temp = Math.floor(response.main.temp);
    response.name = `${response.name}, ${response.sys.country}`;
    this.data = response;
  }

  public setTwoWeeksData(response: TwoWeeksType) {
    this.twoWeeksData = response;
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
        this.apikeyservice.getKey(),
        city.name,
        city.country
      )
      .subscribe((data) => {
        this.setCurrentWeatherData(data);
      });

    this.weatherdata
      .getTwoWeeksForcast(this.apikeyservice.getKey(), city.lat, city.lon)
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
    this.weatherdata
      .getLocationInfo(this.apikeyservice.getKey(), this.searchLocation)
      .subscribe((city) => {
        this.setSearch(city);
      });
    console.log(this.searchLocation);
  }

  public getCurrentWeather() {
    return this.data;
  }

  public getTwoWeeks() {
    return this.twoWeeksData;
  }

  public getListOfCities() {
    return this.listCities;
  }
}
