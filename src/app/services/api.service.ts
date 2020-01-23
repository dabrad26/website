import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private dataEndpoints: any = {
    educations: '/assets/api/educations.json',
    experiences: '/assets/api/experiences.json',
    testimonials: '/assets/api/testimonials.json',
    portfolioItems: '/assets/api/portfolio-items.json',
  };

  constructor(
    private http: HttpClient
  ) {}

  getData(endpoint): Observable<any> {
    const dataLocation = this.dataEndpoints[endpoint];

    if (!dataLocation) {
      throw new Error('API Service: Invalid endpoint requested.');
    }

    return this.http.get(dataLocation);
  }
}
