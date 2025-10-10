import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private cookie = ''
  private params = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      // 'cookie': this.cookie
    }),
    withCredentials: true,
    token: 123456789
  }

  public getHttp<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url, this.params);
  }

  public postHttp<T>(url: string, body: object): Observable<T> {
    return this.httpClient.post<T>(url, body, this.params);
  }



  constructor(private httpClient: HttpClient, private storage: StorageService) {
    const cookie = storage.getFromStorage('sessionId')
    if (cookie) {
      this.cookie = 'sessionId=' + cookie;
    }
  }
}
