import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { saxProfileCircleBold } from '@ng-icons/iconsax/bold';

@Component({
  selector: 'app-login',
  imports: [NgIcon],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  viewProviders: [provideIcons({ saxProfileCircleBold })],
})
export class LoginComponent {
  checkForm(arg0: string, arg1: string) {
    if (!arg0 || !arg1) {
    }
  }

  currentYear: number = new Date().getFullYear();
}
