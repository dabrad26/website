import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.sharedService.setCurrentPage(this.sharedService.getNavItemByRoute('/'));
    this.sharedService.setCurrentBreadcrumbs([
      this.sharedService.getNavItemByRoute('/')
    ]);
  }

}
