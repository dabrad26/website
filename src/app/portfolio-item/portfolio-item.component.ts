import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { PortfolioEntry } from '../models/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {
  portfolioData: PortfolioEntry;
  pageStatus: ''|'error'|'loading' = 'loading';
  quickFactKeys: Array<string> = [];

  constructor(
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.pageStatus = 'loading';
    const currentId = this.activatedRoute.snapshot.params.id;
    this.sharedService.setCurrentPage({name: 'Portfolio details', link: `/portfolio/${currentId}`});
    this.sharedService.setCurrentBreadcrumbs([
      this.sharedService.getNavItemByRoute('/'),
      this.sharedService.getNavItemByRoute('/portfolio'),
      {name: 'Details', link: `/portfolio/${currentId}`}
    ]);

    this.apiService.getData('portfolioEntity', currentId).subscribe((response: PortfolioEntry) => {
      this.portfolioData = response;
      if (typeof this.portfolioData.quickFacts === 'object') {
        this.quickFactKeys = Object.keys(this.portfolioData.quickFacts);
      }
      this.pageStatus = '';
    }, error => {
      this.sharedService.handleError('Unable to get portfolio detail', error);
      this.pageStatus = 'error';
    });
  }

  shareLink(type: 'facebook'|'twitter'|'pinterest'|'linkedin'): void {
    // TODO: Most of these share links do not work...
    const currentUrl = location.href;
    let link;
    switch (type) {
      case 'pinterest':
        link = `https://pinterest.com/pin/create/button/?url=${currentUrl}&description=${this.portfolioData.name}`;
        break;
      case 'facebook':
        link = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        break;
      case 'twitter':
        link = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${this.portfolioData.name}`;
        break;
      case 'linkedin':
        link = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${this.portfolioData.name}`;
        break;
    }

    window.open(link, '_blank');
  }

}
