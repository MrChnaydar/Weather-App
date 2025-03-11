import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WeatherType } from '../model/weather-type.data';
import { LocationType } from '../model/location-type.data';
import { CitiesType } from '../model/cities-type.data';
import { TwoWeeksType } from '../model/two-weeks-type.data';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  http = inject(HttpClient);

  getWeatherDataFromApi(key: string, city: string, country: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}&units=metric`;
    console.log(url);
    return this.http.get<WeatherType>(url);
  }

  //This function was first used to get the location city name with the provided lat and lon, right now we get that from the auto geo location service

  async getReverseLocationInfo(key: string, lat: number, lon: number) {
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${key}`;
    console.log(url);
    let cityname = '';
    let countryname = '';
    const city = await firstValueFrom(this.http.get<Array<LocationType>>(url));
    //this.http.get<Array<LocationType>>(url).subscribe((city) => {
    //console.log(city[0]?.name);
    // console.log(
    //   'api response object: ' +
    //     city +
    //     'city name: ' +
    //     city[0]?.name +
    //     'city country: ' +
    //     city[0]?.country
    // );
    //   cityname = city[0]?.name;
    //   countryname = city[0]?.country;
    // });
    // console.log('city : ' + cityname);
    // console.log('country : ' + countryname);
    cityname = city[0]?.name;
    countryname = city[0]?.country;
    return firstValueFrom(
      this.getWeatherDataFromApi(key, cityname, countryname)
    );
  }

  getLocationInfo(key: string, input: string) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${key}`;

    return this.http.get<Array<CitiesType>>(url);
  }

  getTwoWeeksForcast(key: string, lat: number, lon: number) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${key}&units=metric`;

    return this.http.get<TwoWeeksType>(url);
  }
}
