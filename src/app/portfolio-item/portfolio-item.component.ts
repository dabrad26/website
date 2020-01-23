import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {
  portfolioData: any = {};

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.setCurrentPage({name: this.portfolioData.title, link: `/portfolio/${this.portfolioData.id}`});
    this.sharedService.setCurrentBreadcrumbs([
      this.sharedService.getNavItemByRoute('/'),
      this.sharedService.getNavItemByRoute('/portfolio'),
      {name: 'Details', link: `/portfolio/${this.portfolioData.id}`}
    ]);
  }

}
