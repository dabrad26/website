import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../models/models';
import { SharedServices } from '../services/shared.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuItems: Array<NavItem>;

  constructor(
    private router: Router,
    private sharedServices: SharedServices
  ) { }

  ngOnInit() {
    this.menuItems = this.sharedServices.getAvailableRoutes();
  }

  isActiveRoute(menuItem: NavItem): boolean {
    return this.router.url === menuItem.link;
  }

  isHomePage(): boolean {
    return this.router.url === '/';
  }

}
