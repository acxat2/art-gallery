import { CanActivateFn, Router } from '@angular/router';
import { auth } from './auth';
import { inject } from '@angular/core';

export const newYearGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (auth.newYearIn) {
    return true;
  }

  router.navigate(['/login']);
  return false
};
