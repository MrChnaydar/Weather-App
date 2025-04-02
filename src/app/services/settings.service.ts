import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settings: any = {
    units: 'metric',
    timeFormat: 12,
    distanceUnits: 'km',
    lang: 'eng',
  };

  private settingsChangedSubject = new BehaviorSubject<boolean>(false);
  settingsChanged$ = this.settingsChangedSubject.asObservable();

  public getSettings() {
    return this.settings;
  }

  public updateSetting(key: keyof typeof this.settings, value: any) {
    this.settings[key] = value;
    this.settingsChangedSubject.next(true);
  }
}
