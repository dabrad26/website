import { Component, OnInit } from '@angular/core';
import { SharedServices } from '../services/shared.services';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private sharedServices: SharedServices
  ) { }

  ngOnInit() {
    this.sharedServices.setCurrentPage(this.sharedServices.getNavItemByRoute('/about'));
    this.sharedServices.setCurrentBreadcrumbs([
      this.sharedServices.getNavItemByRoute('/'),
      this.sharedServices.getNavItemByRoute('/about')
    ]);
  }

}
