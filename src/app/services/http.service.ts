import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private headers = (sessionId: string | null) => {
    if (sessionId) {
      return new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Basic ${sessionId}`
      })
    }
    else {
      return new HttpHeaders({
        'Content-type': 'application/json',
      })

    }
  }

  public getHttp<T>(url: string, sessionId: string | null): Observable<T> {
    const headers = this.headers(sessionId)
    return this.httpClient.get<T>(url, { headers });
  }

  public postHttp<T>(url: string, body: object, sessionId: string | null = null): Observable<T> {
    const headers = this.headers(sessionId)
    return this.httpClient.post<T>(url, body, { headers })
  }

  public putHttp<T>(url: string, body: object, sessionId: string | null = null): Observable<T> {
    const headers = this.headers(sessionId)
    return this.httpClient.put<T>(url, body, { headers })
  }

  public deleteHttp<T>(url: string, sessionId: string | null = null): Observable<T> {
    const headers = this.headers(sessionId)
    return this.httpClient.delete<T>(url, { headers })
  }
  constructor(private httpClient: HttpClient) { }
}
