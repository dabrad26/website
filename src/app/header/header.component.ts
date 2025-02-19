import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../models/models';
import { SharedService } from '../services/shared.service';
import * as jquery from 'jquery';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  menuItems: Array<NavItem>;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.menuItems = this.sharedService.getAvailableRoutes();
    this.navbarFixed();
  }

  isActiveRoute(menuItem: NavItem): boolean {
    if (menuItem.link === '/') {
      return this.router.url === menuItem.link;
    }

    return this.router.url.indexOf(menuItem.link) === 0;
  }

  isHomePage(): boolean {
    return this.router.url === '/';
  }

  routeClick(): void {
    const body = document.querySelector('body');
    if (body && body.clientWidth <= 991) {
      const mobileButton = this.elementRef.nativeElement.querySelector('#mobile-button');
      if (mobileButton) {
        mobileButton.click();
      }
    }
  }

  navbarFixed() {
    const navOffsetTop = jquery('header').height() + 50;
    const headerArea = jquery('.header_area');
    if (headerArea) {
      jquery(window).scroll(() => {
        const scroll = jquery(window).scrollTop();
        if (scroll >= navOffsetTop) {
          headerArea.addClass('navbar_fixed');
        } else {
          headerArea.removeClass('navbar_fixed');
        }
      });
    }
  }
}
