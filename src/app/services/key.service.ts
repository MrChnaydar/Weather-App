import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyService {
  private APIKEY = '14165bbcf9dd417ddc8ee87ecd6fbe32';
  private MAPKEY = 'AIzaSyAdiHr0_CgGrNgq2M6_vvjG4kw85H8Kii8';
  public getKey() {
    return this.APIKEY;
  }

  public getMapKey() {
    return this.MAPKEY;
  }
}
