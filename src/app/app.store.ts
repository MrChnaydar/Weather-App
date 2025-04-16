import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { User } from './model/user-type.data';
import { AuthService } from './services/auth.service';

type AppState = {};

const initialState: AppState = {};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store, authService = inject(AuthService)) => ({
    user: computed(() => authService.user()),
  })),
  withMethods(
    (Store, router = inject(Router), authService = inject(AuthService)) => ({
      login: async (email: string, password: string) => {
        await authService.login(email, password);

        console.log('logged in');

        router.navigate(['/home']);

        console.log('router reached');
      },
      logout: async () => {
        await authService.logout();
        router.navigate(['/login']);
      },
    })
  )
);
