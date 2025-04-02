import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-card',
  imports: [],
  templateUrl: './map-card.component.html',
  styleUrl: './map-card.component.scss',
})
export class MapCardComponent {
  // private map!: L.Map;
  // initMap() {
  //   L.map('map', {
  //     center: [40.4168, -3.7038],
  //     zoom: 10,
  //   });
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; OpenStreetMap contributors',
  //   }).addTo(this.map);
  // }
  // ngAfterViewInit(): void {
  //   this.initMap();
  // }
}
