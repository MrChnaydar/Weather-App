import { Component, inject, signal } from '@angular/core';
import * as L from 'leaflet';
import { KeyService } from '../../services/key.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-map-card',
  imports: [],
  templateUrl: './map-card.component.html',
  styleUrl: './map-card.component.scss',
})
export class MapCardComponent {
  // private sanitizer!: DomSanitizer;
  // key: KeyService = inject(KeyService);
  // url = `https://www.google.com/maps/embed/v1/place?key=${this.key.getMapKey()}&q=Paris+France`;
  // googleMapUrl = signal(this.sanitizer.bypassSecurityTrustUrl(this.url));
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
