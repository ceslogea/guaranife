import { Injectable } from '@angular/core';
import { ICompany } from '../Models/ICompany';
import { ApiService } from './api.service';
import { Company } from '../Models/Company';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CompanyService {

  constructor(private api: ApiService) { }

  create(company: any) {
    this.api.post('company', company).subscribe(response => {
      if (response.error) {
        this.api.showError(response.error);
      } else {

      }
    });
  }

  get(): Observable<any> {
    return this.api.get('company');
  }
}
