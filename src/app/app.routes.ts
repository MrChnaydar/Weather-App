import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./pages/home/home.component').then((m) => m.HomeComponent);
    },
  },
  {
    path: 'settings',
    loadComponent: () => {
      return import('./pages/settings/settings.component').then(
        (m) => m.SettingsComponent
      );
    },
  },
];
