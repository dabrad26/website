import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../models/models';
import { SharedServices } from '../services/shared.services';
import * as jquery from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuItems: Array<NavItem>;

  constructor(
    private router: Router,
    private sharedServices: SharedServices,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.menuItems = this.sharedServices.getAvailableRoutes();
    this.navbarFixed();
  }

  isActiveRoute(menuItem: NavItem): boolean {
    return this.router.url === menuItem.link;
  }

  isHomePage(): boolean {
    return this.router.url === '/';
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
