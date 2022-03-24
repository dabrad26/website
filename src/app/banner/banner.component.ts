import { Component, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import * as jquery from 'jquery';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  @Input() home: boolean;
  imageNumber = 1;

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {
    this.imageNumber = Math.floor(Math.random() * 3);
   }

  getWindowHeight(): string {
    return window.innerHeight + 'px';
  }

  getCurrentPageName(): string {
    return this.sharedService.getCurrentPage().name;
  }

  scrollDown(): void {
    jquery('html, body').animate({
      scrollTop: (jquery('#fullscreen-image')[0].offsetHeight - 20)
    }, 500);
  }

  hasNavigationLink(): boolean {
    return this.router?.url?.split('/')?.length > 2;
  }

  navigateToPage(): void {
    if (this.hasNavigationLink()) {
      const parentPath = this.router.url.split('/')[1];
      this.router.navigate([parentPath]);
    }
  }
}
