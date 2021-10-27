import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ExperienceItem, EducationItem, AwardItem } from '../models/models';
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
  certificates: Array<EducationItem> = [];
  awards: Array<AwardItem> = [];
  viewData = {
    education: {
      hasMore: false,
      visible: false,
    },
    experience: {
      hasMore: false,
      visible: false,
    },
    certificate: {
      hasMore: false,
      visible: false,
    },
    award: {
      hasMore: false,
      visible: false,
    }
  };

  constructor(
    private sharedService: SharedService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.pageStatus = 'loading';
    this.sharedService.setPageTitle('Resume');
    this.sharedService.setCurrentPage(this.sharedService.getNavItemByRoute('/resume'));
    this.sharedService.setCurrentBreadcrumbs([
      this.sharedService.getNavItemByRoute('/'),
      this.sharedService.getNavItemByRoute('/resume')
    ]);

    this.apiService.getData('educations').pipe(mergeMap((educationData: Array<EducationItem>) => {
      this.educations = educationData.map(education => {
        education.displayDateString = this.getDateString(education.startDate, education.endDate);
        if (education.collapsed) {
          this.viewData.education.hasMore = true;
        }
        return education;
      });
      return this.apiService.getData('certificates').pipe(mergeMap((certificateData: Array<EducationItem>) => {
        this.certificates = certificateData.map(certificate => {
          certificate.displayDateString = this.getDateString(certificate.startDate, certificate.endDate);
          if (certificate.collapsed) {
            this.viewData.certificate.hasMore = true;
          }
          return certificate;
        });
        return this.apiService.getData('experiences').pipe(mergeMap((experienceData: Array<ExperienceItem>) => {
          this.experiences = experienceData.map(experience => {
            if (Array.isArray(experience.roles)) {
              experience.roles.forEach(role => {
                role.displayDateString = this.getDateString(role.startDate, role.endDate);
              });
            }
            experience.displayDateString = this.getDateString(experience.startDate, experience.endDate);
            if (experience.collapsed) {
              this.viewData.experience.hasMore = true;
            }
            return experience;
          });
          return this.apiService.getData('awards').pipe(map((awardData: Array<AwardItem>) => {
            this.awards = awardData.map(award => {
              award.displayDateString = this.getDateStringValue(new Date(award.issueDate));
              if (award.collapsed) {
                this.viewData.award.hasMore = true;
              }
              return award;
            });
          }));
        }));
      }));
    })).subscribe({
      next: () => {
        this.pageStatus = '';
      },
      error: error => {
      this.sharedService.handleError('Unable to get resume items', error);
      this.pageStatus = 'error';
      }
    });
  }

  showMore = (type: 'experience'|'certificate'|'education'|'award', event: MouseEvent): void => {
    event.preventDefault();
    this.viewData[type].visible = true;
    this.viewData[type].hasMore = false;
  };

  private getDateStringValue(date: Date): string {
    const dateOptions = {year: 'numeric' as 'numeric', month: 'short' as 'short'};
    return date.toLocaleDateString('en-us', dateOptions);
  }

  private getDateString(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    return `${this.getDateStringValue(start)} - ${end ? this.getDateStringValue(end) : 'Present'}`;
  }

}
