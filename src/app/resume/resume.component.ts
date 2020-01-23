import { Component, OnInit } from '@angular/core';
import { SharedServices } from '../services/shared.services';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  constructor(
    private sharedServices: SharedServices
  ) { }

  ngOnInit() {
    this.sharedServices.setCurrentPage(this.sharedServices.getNavItemByRoute('/resume'));
    this.sharedServices.setCurrentBreadcrumbs([
      this.sharedServices.getNavItemByRoute('/'),
      this.sharedServices.getNavItemByRoute('/resume')
    ]);
  }

}
