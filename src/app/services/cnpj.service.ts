import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { ICompany } from '../Models/ICompany';
import { ApiService } from './api.service';

@Injectable()
export class CnpjService {

  public company: ICompany;
  constructor(private api: ApiService) { }

  get(cnpj: string): Observable<ICompany> {
    cnpj = cnpj.replace(/[^0-9]/gi, '');
    return this.api.get<any>(`Cnpj?cnpj=${cnpj}`);
  }
}
