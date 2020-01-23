import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ExperienceItem, EducationItem } from '../models/models';
import { ApiService } from '../services/api.service';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  pageStatus: ''|'error'|'loading' = 'loading';
  experiences: Array<ExperienceItem> = [];
  educations: Array<EducationItem> = [];

  constructor(
    private sharedService: SharedService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.pageStatus = 'loading';
    this.sharedService.setCurrentPage(this.sharedService.getNavItemByRoute('/resume'));
    this.sharedService.setCurrentBreadcrumbs([
      this.sharedService.getNavItemByRoute('/'),
      this.sharedService.getNavItemByRoute('/resume')
    ]);

    this.apiService.getData('educations').pipe(mergeMap((educationData: Array<EducationItem>) => {
      this.educations = educationData.map(education => {
        education.displayDateString = this.getDateString(education.startDate, education.endDate);
        return education;
      });
      return this.apiService.getData('experiences').pipe(map((experienceData: Array<ExperienceItem>) => {
        this.experiences = experienceData.map(experience => {
          experience.displayDateString = this.getDateString(experience.startDate, experience.endDate);
          return experience;
        });
      }));
    })).subscribe(() => {
      this.pageStatus = '';
    }, error => {
      this.sharedService.handleError('Unable to get resume items', error);
      this.pageStatus = 'error';
    });

  }

  private getDateString(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    const dateOptions = {year: 'numeric', month: 'short'};
    return `${start.toLocaleDateString('en-us', dateOptions)} - ${end ? end.toLocaleDateString('en-us', dateOptions) : 'Present'}`;
  }

}
