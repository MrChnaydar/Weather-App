import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { saxProfileCircleBold } from '@ng-icons/iconsax/bold';
import { AppStore } from '../../app.store';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-login',
  imports: [NgIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  viewProviders: [provideIcons({ saxProfileCircleBold })],
})
export class LoginComponent {
  appStore = inject(AppStore);

  currentYear: number = new Date().getFullYear();
}
