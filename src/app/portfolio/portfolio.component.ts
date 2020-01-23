import { Component, OnInit, Input } from '@angular/core';
import { SharedServices } from '../services/shared.services';
import { FilterItem, PortfolioItem } from '../models/models';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @Input() limitView: boolean;
  currentFilter: FilterItem;
  portfolioItems: Array<PortfolioItem> = [];
  availableFilters: Array<FilterItem> = [
    {
      name: 'All',
      id: ''
    },
    {
      name: 'Design',
      id: 'design'
    },
    {
      name: 'Web',
      id: 'web'
    },
    {
      name: 'Mobile',
      id: 'mobile'
    },
    {
      name: 'Desktop',
      id: 'desktop'
    }
  ];

  constructor(
    private sharedServices: SharedServices
  ) { }

  ngOnInit() {
    this.currentFilter = this.availableFilters[0];
    this.sharedServices.setCurrentPage(this.sharedServices.getNavItemByRoute('/portfolio'));
    this.sharedServices.setCurrentBreadcrumbs([
      this.sharedServices.getNavItemByRoute('/'),
      this.sharedServices.getNavItemByRoute('/portfolio')
    ]);

    this.portfolioItems = [
      {
        name: 'Test item 1',
        id: 'test1',
        type: 'Client project',
        gridSize: 'col-lg-3 col-sm-6 col-sm-12',
        category: ['web', 'design'],
        imageUrl: '/assets/portfolio-images/work1.jpg'
      },
      {
        name: 'Test item 2',
        id: 'test2',
        type: 'Client project',
        gridSize: 'col-lg-3 col-sm-6 col-sm-12',
        category: ['mobile', 'desktop'],
        imageUrl: '/assets/portfolio-images/work1.jpg'
      },
      {
        name: 'Test item 3',
        id: 'test3',
        type: 'School project',
        gridSize: 'col-lg-6 col-sm-6',
        category: ['web'],
        imageUrl: '/assets/portfolio-images/work1.jpg'
      },
      {
        name: 'Test item 4',
        id: 'test4',
        type: 'School project',
        gridSize: 'col-lg-6 col-sm-6',
        category: ['web'],
        imageUrl: '/assets/portfolio-images/work1.jpg'
      },
      {
        name: 'Test item 5',
        id: 'test5',
        type: 'School project',
        gridSize: 'col-lg-6 col-sm-6',
        category: ['web'],
        imageUrl: '/assets/portfolio-images/work1.jpg'
      },
      {
        name: 'Test item 6',
        id: 'test6',
        type: 'School project',
        gridSize: 'col-lg-6 col-sm-6',
        category: ['web'],
        imageUrl: '/assets/portfolio-images/work1.jpg'
      }
    ];

    if (this.limitView) {
      this.portfolioItems = this.portfolioItems.slice(0, 5);
    }
  }

  changeFilter(filter: FilterItem): void {
    this.currentFilter = filter;
  }

  portfolioItemVisible(categories: Array<string>): boolean {
    if (!this.currentFilter.id) {
      return true;
    }
    if (Array.isArray(categories)) {
      return (categories.indexOf(this.currentFilter.id) > -1);
    }
    return false;
  }

}
