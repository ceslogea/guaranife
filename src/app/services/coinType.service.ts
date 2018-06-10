import { Injectable, Inject } from '@angular/core';  
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'; 

const httpOptions = { 
  headers: new HttpHeaders({
  'Content-Type': 'application/json'
  })};

@Injectable()
export class CoinTypeService {

  public coinType: CoinType[]
  constructor(private http: HttpClient) { }

  get(): Observable<CoinType> {
    return this.http.get<CoinType>('CoinType', httpOptions)
  }
}
