import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WeatherType } from '../model/weather-type.data';
import { LocationType } from '../model/location-type.data';
import { CitiesType } from '../model/cities-type.data';
import { TwoWeeksType } from '../model/two-weeks-type.data';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { KeyService } from './key.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  key = inject(KeyService);
  http = inject(HttpClient);

  getWeatherDataFromApi(city: string, country: string, unit: string) {
    // console.log('Before constructing the url');
    // const url = `${environment.api.weather}/weather?type=current&city=${city}&country=${country}&unit=${unit}`;
    // console.log('in weather service and this is the url constructed ' + url);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${this.key.api}&units=${unit}`;
    //console.log(url);
    return this.http.get<WeatherType>(url);
  }

  //This function was first used to get the location city name with the provided lat and lon, right now we get that from the auto geo location service

  async getReverseLocationInfo(lat: number, lon: number, unit: string) {
    // console.log('at getting reverseLocation info');
    // console.log(environment.api.weather);
    // console.log(
    //   `${environment.api.weather}/weather?type=reverse?lat=${lat}&lon=${lon}&limit=1`,
    // );

    // const url = `${environment.api.weather}/weather?type=reverse&lat=${lat}&lon=${lon}&limit=1`;
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this.key.api}`;
    // console.log(url);
    let cityname = '';
    let countryname = '';
    const city = await firstValueFrom(this.http.get<Array<LocationType>>(url));
    cityname = city[0]?.name;
    countryname = city[0]?.country;
    return firstValueFrom(
      this.getWeatherDataFromApi(cityname, countryname, unit),
    );
  }

  getLocationInfo(input: string) {
    // const url = `${environment.api.weather}/weather?type=direct&input=${input}`;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${this.key.api}`;

    return this.http.get<Array<CitiesType>>(url);
  }

  getTwoWeeksForcast(lat: number, lon: number, unit: string) {
    // const url = `${environment.api.weather}/weather?type=forecast&lat=${lat}&lon=${lon}&unit=${unit}`;
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${this.key.api}&units=${unit}`;

    return this.http.get<TwoWeeksType>(url);
  }

  //Code for using vercel enviroments

  /*
    getWeatherDataFromApi(city: string, country: string, unit: string) {
    // console.log('Before constructing the url');
    const url = `${environment.api.weather}/weather?type=current&city=${city}&country=${country}&unit=${unit}`;
    // console.log('in weather service and this is the url constructed ' + url);
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${this.key}&units=${unit}`;
    //console.log(url);
    return this.http.get<WeatherType>(url);
  }

  //This function was first used to get the location city name with the provided lat and lon, right now we get that from the auto geo location service

  async getReverseLocationInfo(lat: number, lon: number, unit: string) {
    // console.log('at getting reverseLocation info');
    // console.log(environment.api.weather);
    // console.log(
    //   `${environment.api.weather}/weather?type=reverse?lat=${lat}&lon=${lon}&limit=1`,
    // );

    const url = `${environment.api.weather}/weather?type=reverse&lat=${lat}&lon=${lon}&limit=1`;
    // const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this.key}`;
    console.log(url);
    let cityname = '';
    let countryname = '';
    const city = await firstValueFrom(this.http.get<Array<LocationType>>(url));
    cityname = city[0]?.name;
    countryname = city[0]?.country;
    return firstValueFrom(
      this.getWeatherDataFromApi(cityname, countryname, unit),
    );
  }

  getLocationInfo(input: string) {
    const url = `${environment.api.weather}/weather?type=direct&input=${input}`;
    // const url = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${this.key}`;

    return this.http.get<Array<CitiesType>>(url);
  }

  getTwoWeeksForcast(lat: number, lon: number, unit: string) {
    const url = `${environment.api.weather}/weather?type=forecast&lat=${lat}&lon=${lon}&unit=${unit}`;
    // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${this.key}&units=${unit}`;

    return this.http.get<TwoWeeksType>(url);
  }
  */
}
