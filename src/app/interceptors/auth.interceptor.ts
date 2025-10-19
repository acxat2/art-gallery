// import { HttpInterceptorFn } from '@angular/common/http';
import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<any>> => {
  const cloneRequest = req.clone({
    withCredentials: true
  })
  return next(cloneRequest);
};

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     // Добавляем credentials
//     const clonedRequest = request.clone({
//       withCredentials: true
//     });

//     return next.handle(clonedRequest);
//   }
// }
