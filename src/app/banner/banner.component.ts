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

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { }

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
}
