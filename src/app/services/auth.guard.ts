import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(AuthService);

  return service.validateToken().pipe(
    map((res) => true),
    catchError((error) => {
      localStorage.removeItem('token');
      router.navigate(['/auth']);
      return of(false);
    })
  );
};
