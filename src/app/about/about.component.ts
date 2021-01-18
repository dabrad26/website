import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  aboutImage: string;

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    const imageNumber = Math.floor(Math.random() * 3);
    this.aboutImage = `/assets/images/david-about${imageNumber}.png`;
    this.sharedService.setPageTitle('About me');
    this.sharedService.setCurrentPage(this.sharedService.getNavItemByRoute('/about'));
    this.sharedService.setCurrentBreadcrumbs([
      this.sharedService.getNavItemByRoute('/'),
      this.sharedService.getNavItemByRoute('/about')
    ]);
  }

}
