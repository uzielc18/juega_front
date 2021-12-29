import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class IsLoggedGuard implements CanActivate {
  constructor(private authService: NbAuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      tap((authenticated) => {
        if (authenticated) {
          this.router.navigate(['/pages']).then((_) => null);
        }
      })
    );
  }
}
