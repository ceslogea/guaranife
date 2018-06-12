import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { ICoinType } from '../Models/ICoinType';
import { ApiService } from './api.service';

@Injectable()
export class CoinTypeService {

  public coinType: ICoinType[];
  constructor(private api: ApiService) { }

  get(): Observable<ICoinType> {
    return this.api.get<any>('CoinType');
  }
}
