import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentLocationService {
  constructor() {}

  getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log(
            //   'current location lat:' +
            //     position.coords.latitude +
            //     ' and lon: ' +
            //     position.coords.longitude
            // );
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error.message);
          }
        );
      } else {
        reject('geolocation is not available in this browser');
      }
    });
  }
}
