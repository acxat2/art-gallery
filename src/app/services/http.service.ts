import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private headers = (sessionId: string) => new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Basic ${sessionId}`
    })

  public getHttp<T>(url: string, sessionId: string | null): Observable<T> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Basic ${sessionId}`
    })
    return this.httpClient.get<T>(url, { headers });
  }

  public postHttp<T>(url: string, body: object, sessionId: string | null = null): Observable<T> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Basic ${sessionId}`
    })
    return this.httpClient.post<T>(url, body, { headers })
  }

  constructor(private httpClient: HttpClient) { }
}
