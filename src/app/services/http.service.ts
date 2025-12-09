import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private headers = (sessionId: string | null = null) => {
    if (sessionId) {
      return new HttpHeaders({
        'Authorization': `Bearer ${sessionId}`,
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

  public postHttp<T>(url: string, body: any, sessionId: string | null = null, options: Object = {}): Observable<T> {
    const headers = this.headers(sessionId)
    return this.httpClient.post<T>(url, body, { headers, ...options})
  }

  public putHttp<T>(url: string, body: object, sessionId: string | null = null): Observable<T> {
    const headers = this.headers(sessionId)
    // return this.httpClient.put<T>(url, body, { headers })
    return this.httpClient.put<T>(url, body, { headers })
  }

  public deleteHttp<T>(url: string, sessionId: string | null = null): Observable<T> {
    const headers = this.headers(sessionId)
    // return this.httpClient.delete<T>(url, { headers })
    return this.httpClient.delete<T>(url, { headers })
  }
  constructor(private httpClient: HttpClient) { }
}
