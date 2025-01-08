import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import * as fromUser from './store/reducers/user.reducers'


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
     provideAnimationsAsync(),
     provideStore()]
};
// StoreModule.forRoot({user: fromUser.reducer})
