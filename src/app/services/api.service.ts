import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private dataEndpoints: any = {
    educations: '/assets/api/educations.json',
    certificates: '/assets/api/certificates.json',
    experiences: '/assets/api/experiences.json',
    portfolioItems: '/assets/api/portfolio-items.json',
    portfolioEntity: '/assets/api/portfolio-items/$1.json',
    portfolioEntityHtml: '/assets/api/html/$1.html',
  };

  constructor(
    private http: HttpClient
  ) {}

  getData(endpoint: string, item?: string, getText?): Observable<any> {
    let dataLocation = this.dataEndpoints[endpoint];
    let responseType;

    if (!dataLocation) {
      throw new Error('API Service: Invalid endpoint requested.');
    }

    if (item) {
      dataLocation = dataLocation.replace('$1', item);
    }

    if (getText) {
      responseType = 'text';
    }

    return this.http.get(dataLocation, {responseType});
  }

  post(endpoint: string, data: any, options?: any): Observable<any> {
    return this.http.post(endpoint, data, options);
  }
}
