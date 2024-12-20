import { Injectable } from '@angular/core';
import { NavItem } from '../models/models';

@Injectable()
export class SharedService {
  private currentBreadcrumbs: Array<NavItem> = [];
  private currentPage: NavItem = new NavItem();
  private availableRoutes: Array<NavItem> = [
    {
      name: 'Home',
      link: '/'
    },
    {
      name: 'About me',
      link: '/about'
    },
    {
      name: 'Résumé',
      link: '/resume'
    },
    {
      name: 'Portfolio',
      link: '/portfolio'
    },
    {
      name: 'Contact',
      link: '/contact'
    }
  ];

  getNavItemByRoute(link: string): NavItem {
    return this.availableRoutes.filter(item => item.link === link)[0] || new NavItem();
  }

  getAvailableRoutes(): Array<NavItem> {
    return this.availableRoutes;
  }

  setCurrentBreadcrumbs(breadcrumbs: Array<NavItem>): void {
    this.currentBreadcrumbs = breadcrumbs;
  }

  getCurrentBreadcrumbs(): Array<NavItem> {
    return this.currentBreadcrumbs;
  }

  setCurrentPage(page: NavItem): void {
    this.currentPage = page;
  }

  getCurrentPage(): NavItem {
    return this.currentPage;
  }

  handleError(message: string, error: any): void {
    console.error(`Website: ${message}`, error);
  }

  isValidEmail(email: string): boolean {
    const emailTest =
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailTest.test(email);
  }

  setPageTitle(title: string): void {
    if (window.location.pathname === '/') {
      document.title = 'David Bradshaw';
    } else {
      document.title = `${title} - David Bradshaw`;
    }
  }
}
