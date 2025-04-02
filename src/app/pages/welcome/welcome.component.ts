import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink, NgIf],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  data: DataService = inject(DataService);

  refresh() {
    window.location.reload();
  }

  currentYear: number = new Date().getFullYear();
}
