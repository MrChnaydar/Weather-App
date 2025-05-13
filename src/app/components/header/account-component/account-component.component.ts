import { Component, inject, signal } from '@angular/core';
import {
  hugeNotification01,
  hugeUserCircle02,
  hugeLogout03,
} from '@ng-icons/huge-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { AppStore } from '../../../app.store';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-account-component',
  imports: [NgIcon, RouterLink],
  templateUrl: './account-component.component.html',
  styleUrl: './account-component.component.scss',
  viewProviders: [
    provideIcons({ hugeNotification01, hugeUserCircle02, hugeLogout03 }),
  ],
})
export class AccountComponentComponent {
  appState = inject(AppStore);
  data: DataService = inject(DataService);

  clearActualPage() {
    this.data.setActualPage('');
  }
}
