import { Component, Input } from '@angular/core';
import { SharedServices } from '../services/shared.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  @Input() home: boolean;

  constructor(
    private sharedServices: SharedServices,
    private router: Router
  ) { }

  getWindowHeight(): string {
    return window.innerHeight + 'px';
  }

  getCurrentPageName(): string {
    return this.sharedServices.getCurrentPage().name;
  }
}
