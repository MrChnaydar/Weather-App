import {
  AfterViewInit,
  Component,
  inject,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';

import { KeyService } from '../../services/key.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import * as L from 'leaflet';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-map-card',
  imports: [],
  templateUrl: './map-card.component.html',
  styleUrl: './map-card.component.scss',
})
export class MapCardComponent implements AfterViewInit {
  private data: DataService = inject(DataService);
  private key: KeyService = inject(KeyService);

  isBlurred = true;
  toggleBlur() {
    this.isBlurred = !this.isBlurred;
  }

  private map: any;
  private weatherLayer: any;

  private lyr_streets = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  );

  private lyr_satellite = L.layerGroup([
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      },
    ),
    L.tileLayer(
      'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '© Esri',
      },
    ),
  ]);

  private lyr_labels = L.tileLayer(
    'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: '© Esri',
    },
  );

  // our map initializer with the first coord given andwith the default layer
  private initMap(lat: number, lon: number): void {
    //Create the map variable with the base deafult layer and the lat and lon of the first instance and with the zoom value
    this.map = L.map('map', {
      layers: [this.lyr_streets],
    }).setView([lat, lon], 9);
    //Create a empty group of layers and add it to the map
    this.weatherLayer = L.layerGroup().addTo(this.map);
    //Create a satellite with labels standalone layer group to add it to the map layers
    // const satelliteWithLabels = L.layerGroup([
    //   this.lyr_satellite,
    //   this.lyr_labels,
    // ]);
    //Create a obj with the 2 layers we made
    const baseLayers = {
      streets: this.lyr_streets,
      satellite: this.lyr_satellite,
    };
    //Adds the layer controls button and uses the base layer obj that has multiple layers
    L.control.layers(baseLayers).addTo(this.map);
    //Call the updateMapLocation function that adds the weather layers to the weatherLayer
    this.updateMapLocation(
      this.data.getCurrentWeather().coord.lat,
      this.data.getCurrentWeather().coord.lon,
    );
  }

  loadMap() {}

  updateMapLocation(lat: number, lon: number) {
    this.weatherLayer.clearLayers();
    const precipitationLayer = L.tileLayer(
      `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${this.key.api}`,
      { attribution: '© OpenWeatherMap' },
    );

    const cloudsLayer = L.tileLayer(
      `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${this.key.api}`,
      {
        attribution: '© OpenWeatherMap',
      },
    );

    precipitationLayer.addTo(this.weatherLayer);
    cloudsLayer.addTo(this.weatherLayer);
  }

  ngAfterViewInit(): void {
    this.initMap(
      this.data.getCurrentWeather().coord.lat,
      this.data.getCurrentWeather().coord.lon,
    );
  }

  // constructor(
  //   private sanitizer: DomSanitizer,
  //   private key: KeyService,
  //   private data: DataService,
  // ) {}

  // mapUrl!: SafeResourceUrl;
  // ngOnInit(): void {
  //   // Example: assuming dataService has an observable for current weather
  //   this.data.currentWeather$().subscribe((weather) => {
  //     if (weather?.name) {
  //       const rawUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAdiHr0_CgGrNgq2M6_vvjG4kw85H8Kii8&q=${weather.name}&zoom=17&maptype=satellite`;
  //       this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  //     }
  //   });
  // }

  // // const rawUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAdiHr0_CgGrNgq2M6_vvjG4kw85H8Kii8&q=${
  // //   this.data.getCurrentWeather().name
  // // }&zoom=17&maptype=satellite`;
  // // this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);

  // getURL(): SafeResourceUrl {
  //   return this.mapUrl;
  // }
}
