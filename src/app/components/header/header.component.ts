import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccountComponentComponent } from './account-component/account-component.component';

@Component({
  selector: 'app-header',
  imports: [SidebarComponent, AccountComponentComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
