import { Component, OnInit } from '@angular/core';
import 'bootstrap';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss'],
    standalone: false
})
export class BaseComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    const path = localStorage.getItem('path');
    if (path) {
      localStorage.removeItem('path');
      this.router.navigate([path]);
    }
  }

  ngOnInit() {
    this.router.events.subscribe({
      next: routeEvent => {
        if (routeEvent instanceof NavigationEnd) {
          if (document.body) {
            document.body.scrollTop = 0;
          }
          if (document.documentElement) {
            document.documentElement.scrollTop = 0;
          }
        }
      },
      error: error => {
        console.error('Base component failed to subscribe to router event', error);
      }
    });
  }
}
