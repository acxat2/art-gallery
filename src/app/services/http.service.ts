import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const params = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
  withCredentials: true
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public getHttp<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url, params);
  }

  public postHttp<T>(url: string, body: object): Observable<T> {
    return this.httpClient.post<T>(url, body, params);
  }



  constructor(private httpClient: HttpClient) { }
}
