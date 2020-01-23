import { Component } from '@angular/core';
import { NavItem } from '../models/models';
import { SharedServices } from '../services/shared.services';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {

  constructor(
    private sharedServices: SharedServices
  ) { }

  getBreadcrumbs(): Array<NavItem> {
    return this.sharedServices.getCurrentBreadcrumbs();
  }

}
