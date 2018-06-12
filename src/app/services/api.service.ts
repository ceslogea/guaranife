import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';

@Injectable()
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<any> {
    return this.http.get(url, this.httpOptions);
  }


  post<T>(url: string, obj: any): Observable<any> {
    return this.http.post(url, obj, this.httpOptions);
  }

  showError(errors: string[]) {
    errors.forEach(error => {
      console.log(error);
    });
  }

  private handleError(error: any) {
    console.log(error)
    if (error.status === 401) {
        throw error;
    } else {
        throw error;
    }
  }
}

