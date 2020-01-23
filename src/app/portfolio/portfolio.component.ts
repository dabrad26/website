import { Component, OnInit } from '@angular/core';
import { SharedServices } from '../services/shared.services';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor(
    private sharedServices: SharedServices
  ) { }

  ngOnInit() {
    this.sharedServices.setCurrentPage(this.sharedServices.getNavItemByRoute('/portfolio'));
    this.sharedServices.setCurrentBreadcrumbs([
      this.sharedServices.getNavItemByRoute('/'),
      this.sharedServices.getNavItemByRoute('/portfolio')
    ]);
  }

}
