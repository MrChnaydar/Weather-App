import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyService {
  private APIKEY = '14165bbcf9dd417ddc8ee87ecd6fbe32';

  public getKey() {
    return this.APIKEY;
  }
}
