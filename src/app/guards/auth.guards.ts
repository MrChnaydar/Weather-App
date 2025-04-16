import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStore } from '../app.store';
import { AuthService } from '../services/auth.service';

export function redirectLoginIfNotAuth(): CanActivateFn {
  return async (route) => {
    const authService = inject(AuthService);

    const router = inject(Router);
    const user = await authService.getAuthState();
    if (!user) {
      return router.parseUrl('/login');
    }

    return true;
  };
}

export function redirectHomeIfAuth(): CanActivateFn {
  return async (route) => {
    const authService = inject(AuthService);

    const router = inject(Router);
    const user = await authService.getAuthState();

    if (user) {
      return router.parseUrl('/home');
    }

    return true;
  };
}
