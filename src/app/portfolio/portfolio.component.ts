import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { FilterItem, PortfolioItem } from '../models/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @Input() limitView: boolean;
  pageStatus: ''|'error'|'loading' = 'loading';
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
      name: 'Applications',
      id: 'applications'
    },
    {
      name: 'Papers',
      id: 'papers'
    }
  ];

  constructor(
    private sharedService: SharedService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.pageStatus = 'loading';
    this.currentFilter = this.availableFilters[0];
    this.sharedService.setCurrentPage(this.sharedService.getNavItemByRoute('/portfolio'));
    this.sharedService.setCurrentBreadcrumbs([
      this.sharedService.getNavItemByRoute('/'),
      this.sharedService.getNavItemByRoute('/portfolio')
    ]);

    this.apiService.getData('portfolioItems').subscribe(response => {
      this.portfolioItems = this.limitView ? response.slice(0, 5) : response;
      this.pageStatus = '';
    }, error => {
      this.sharedService.handleError('Unable to get portfolio items', error);
      this.pageStatus = 'error';
    });
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
