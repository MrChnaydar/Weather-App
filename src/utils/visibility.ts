import { inject } from '@angular/core';
import { DataService } from '../app/services/data.service';

let data: DataService = inject(DataService);
export function visibilityStatus(): string {
  let visibility = data.getVisKm();
  if (visibility >= 10) {
    return 'Clear visibility';
  } else if (visibility >= 6) {
    return 'Slightly reduced, light mist';
  } else if (visibility >= 3) {
    return 'Haze is affecting visibility';
  } else if (visibility >= 1) {
    return 'Moderate fog, significant visibility reduction';
  } else if (visibility >= 0.5) {
    return 'Heavy fog, very limited visibility';
  } else if (visibility >= 0.1) {
    return 'Dense fog, extreme visibility reduction';
  } else {
    return 'Almost no visibility, dangerous conditions';
  }
}
