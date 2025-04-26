import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WeatherType } from '../model/weather-type.data';
import { LocationType } from '../model/location-type.data';
import { CitiesType } from '../model/cities-type.data';
import { TwoWeeksType } from '../model/two-weeks-type.data';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  http = inject(HttpClient);

  getWeatherDataFromApi(city: string, country: string, unit: string) {
    const url = `${environment.api.weather}/weather?type=current&city=${city}&country=${country}&unit=${unit}`;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}&units=${unit}`;
    //console.log(url);
    return this.http.get<WeatherType>(url);
  }

  //This function was first used to get the location city name with the provided lat and lon, right now we get that from the auto geo location service

  async getReverseLocationInfo(lat: number, lon: number, unit: string) {
    const url = `${environment.api.weather}/weather?type=reverse?lat=${lat}&lon=${lon}&limit=1`;
    // const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${key}`;
    //console.log(url);
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
    // const url = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${key}`;

    return this.http.get<Array<CitiesType>>(url);
  }

  getTwoWeeksForcast(lat: number, lon: number, unit: string) {
    const url = `${environment.api.weather}/weather?type=forecast&lat=${lat}&lon=${lon}&unit=${unit}`;
    // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${key}&units=${unit}`;

    return this.http.get<TwoWeeksType>(url);
  }
}
