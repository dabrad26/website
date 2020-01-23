import { Component, OnInit } from '@angular/core';
import { SharedServices } from '../services/shared.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private sharedServices: SharedServices
  ) { }

  ngOnInit() {
    this.sharedServices.setCurrentPage(this.sharedServices.getNavItemByRoute('/'));
    this.sharedServices.setCurrentBreadcrumbs([
      this.sharedServices.getNavItemByRoute('/')
    ]);
  }

}
