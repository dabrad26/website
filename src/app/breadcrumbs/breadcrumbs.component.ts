import { Component } from '@angular/core';
import { NavItem } from '../models/models';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {

  constructor(
    private sharedService: SharedService
  ) { }

  getBreadcrumbs(): Array<NavItem> {
    return this.sharedService.getCurrentBreadcrumbs();
  }

}
