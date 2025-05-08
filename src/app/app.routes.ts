import { Routes } from '@angular/router';
import {
  redirectHomeIfAuth,
  redirectLoginIfNotAuth,
} from './guards/auth.guards';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./pages/welcome/welcome.component').then(
        (m) => m.WelcomeComponent,
      );
    },
  },
  {
    path: 'home',
    loadComponent: () => {
      return import('./pages/home/home.component').then((m) => m.HomeComponent);
    },
  },
  {
    path: 'settings',
    loadComponent: () => {
      return import('./pages/settings/settings.component').then(
        (m) => m.SettingsComponent,
      );
    },
  },
  {
    path: 'login',
    loadComponent: () => {
      return import('./pages/login/login.component').then(
        (m) => m.LoginComponent,
      );
    },
    canActivate: [redirectHomeIfAuth()],
  },
  {
    path: 'notifications',
    loadComponent: () => {
      return import('./pages/notifications/notifications.component').then(
        (m) => m.NotificationsComponent,
      );
    },
    canActivate: [redirectLoginIfNotAuth()],
  },
  {
    path: 'map',
    loadComponent: () => {
      return import('./pages/map-page/map-page.component').then(
        (m) => m.MapPageComponent,
      );
    },
    canActivate: [redirectLoginIfNotAuth()],
  },
  {
    path: 'calendar',
    loadComponent: () => {
      return import('./pages/calendar/calendar.component').then(
        (m) => m.CalendarComponent,
      );
    },
    // canActivate: [redirectLoginIfNotAuth()],
  },
  {
    path: 'stats',
    loadComponent: () => {
      return import('./pages/stats/stats.component').then(
        (m) => m.StatsComponent,
      );
    },
  },
];
