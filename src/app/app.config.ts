import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import * as fromUser from './store/reducers/user.reducers'
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ]
};
// StoreModule.forRoot({user: fromUser.reducer})
