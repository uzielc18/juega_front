import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {NbAuthService} from "@nebular/auth";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: NbAuthService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated()
      .pipe(
        tap((authenticated: boolean) => {
          if (!authenticated) {
            this.router.navigate(['auth']).then((_) => null);
          }
        }),
      );
  }

}
