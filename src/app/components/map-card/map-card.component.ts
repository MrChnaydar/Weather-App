import { Component, inject, OnInit, signal } from '@angular/core';

import { KeyService } from '../../services/key.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-map-card',
  imports: [RouterLink, NgIf],
  templateUrl: './map-card.component.html',
  styleUrl: './map-card.component.scss',
})
export class MapCardComponent implements OnInit {
  isBlurred = true;

  toggleBlur() {
    this.isBlurred = !this.isBlurred;
  }

  constructor(
    private sanitizer: DomSanitizer,
    private key: KeyService,
    private data: DataService
  ) {}

  mapUrl!: SafeResourceUrl;
  ngOnInit(): void {
    // Example: assuming dataService has an observable for current weather
    this.data.currentWeather$().subscribe((weather) => {
      if (weather?.name) {
        const rawUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAdiHr0_CgGrNgq2M6_vvjG4kw85H8Kii8&q=${weather.name}&zoom=17&maptype=satellite`;
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
      }
    });
  }

  // const rawUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAdiHr0_CgGrNgq2M6_vvjG4kw85H8Kii8&q=${
  //   this.data.getCurrentWeather().name
  // }&zoom=17&maptype=satellite`;
  // this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);

  getURL(): SafeResourceUrl {
    return this.mapUrl;
  }
}
