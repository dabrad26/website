import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private dataEndpoints: any = {
    educations: '/assets/api/educations.json',
    experiences: '/assets/api/experiences.json',
    portfolioItems: '/assets/api/portfolio-items.json',
    portfolioEntity: '/assets/api/portfolio-items/$1.json'
  };

  constructor(
    private http: HttpClient
  ) {}

  getData(endpoint: string, item?: string): Observable<any> {
    let dataLocation = this.dataEndpoints[endpoint];

    if (!dataLocation) {
      throw new Error('API Service: Invalid endpoint requested.');
    }

    if (item) {
      dataLocation = dataLocation.replace('$1', item);
    }

    return this.http.get(dataLocation);
  }

  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(endpoint, data);
  }
}
