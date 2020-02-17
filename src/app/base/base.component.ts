import { Component, OnInit } from '@angular/core';
import 'bootstrap';
import { Router, NavigationEnd } from '@angular/router';
declare const FB;

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((routeEvent) => {
      if (routeEvent instanceof NavigationEnd) {
        if (document.body) {
          document.body.scrollTop = 0;
        }
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        }
      }
    });

    FB.init({
      appId: '182061646405462',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v6.0'
    });
  }
}
