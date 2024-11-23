import { CanActivateFn, Router } from '@angular/router';
import { auth } from './auth';
import { inject } from '@angular/core';

export const questGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if (auth.isQuestIn) {
    return true;
  }

  router.navigate(['/login']);
  return false
};
