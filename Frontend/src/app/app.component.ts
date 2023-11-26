import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Notenverwaltungssystem SMS Satteins';
  condition = true;

  constructor(private router: Router) {}

  shouldDisplayNavigation(): boolean {
    // Get the current route
    const currentRoute = this.router.url;

    // Check if the current route is not the login route
    return currentRoute !== '/login';
  }
}
