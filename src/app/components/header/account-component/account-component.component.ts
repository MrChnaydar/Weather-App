import { Component } from '@angular/core';
import { hugeNotification01, hugeUserCircle02 } from '@ng-icons/huge-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-component',
  imports: [NgIcon, RouterLink],
  templateUrl: './account-component.component.html',
  styleUrl: './account-component.component.scss',
  viewProviders: [provideIcons({ hugeNotification01, hugeUserCircle02 })],
})
export class AccountComponentComponent {}
