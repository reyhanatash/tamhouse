import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tamland';
  anonymousUrl = ['/', '/operator', '/signup', '/forgotPassword', '/resetPassword'];
  userLogin = false;
  constructor(private router: Router) {
    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        let url = location.hash.replace('#', '').split('?')[0];
        if (this.anonymousUrl.includes(url)) {
          this.userLogin = false;
          return;
        }
        this.userLogin = true;

      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }
}
