import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { PortfolioEntry } from '../models/models';
import { ApiService } from '../services/api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {
  portfolioData: PortfolioEntry;
  portfolioHtml: SafeHtml;
  pageStatus: ''|'error'|'loading'|'html' = 'loading';
  quickFactKeys: Array<string> = [];

  constructor(
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private domSanitizer: DomSanitizer
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
      if (this.portfolioData.useHtmlVersion) {
        this.loadHtml();
      } else {
        if (typeof this.portfolioData.quickFacts === 'object') {
          this.quickFactKeys = Object.keys(this.portfolioData.quickFacts);
        }
        this.pageStatus = '';
      }
    }, error => {
      this.sharedService.handleError('Unable to get portfolio detail', error);
      this.pageStatus = 'error';
    });
  }

  loadHtml(): void {
    this.apiService.getData('portfolioEntityHtml', this.portfolioData.id, true).subscribe((response) => {
      this.portfolioHtml = this.domSanitizer.bypassSecurityTrustHtml(response);
      this.pageStatus = 'html';
    }, error => {
      this.sharedService.handleError('Unable to get portfolio html', error);
      this.pageStatus = 'error';
    });
  }

  getShareText(): string {
    return `Checkout ${this.portfolioData.name} from David Bradshaw's portfolio!`;
  }

  shareTwitter() {
    window.open(`http://twitter.com/share?text=${this.getShareText()}&url=${location.href}`, '_blank');
  }

  // shareLinkedin() {
  //   window.open(` http://www.linkedin.com/shareArticle?mini=true&url=${location.href}&`, '_blank');
  // }

  shareEmail() {
    const bodyText = `${this.getShareText()}\n\n${location.href}`;
    window.open(`mailto:?subject=${encodeURIComponent(this.getShareText())}&body=${encodeURIComponent(bodyText)}`);
  }
}
