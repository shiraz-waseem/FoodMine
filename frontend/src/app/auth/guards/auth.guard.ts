import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  // return true;
  if (userService.currentUser.token) {
    return true;
  }

  // login py redirect krde gy and then return false;
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
