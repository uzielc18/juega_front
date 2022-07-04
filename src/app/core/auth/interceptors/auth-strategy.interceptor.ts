import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NbAuthService, NbAuthToken} from "@nebular/auth";
import {switchMap} from "rxjs/operators";

@Injectable()
export class AuthStrategyInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      switchMap((token: NbAuthToken) => {
        if (token.isValid()) {
          request = request.clone({
            setHeaders: {
              AuthorizationStrategy: token.getOwnerStrategyName(),
            },
          });
        }
        return next.handle(request);
      }),
    )
  }

  protected get authService(): NbAuthService {
    return this.injector.get(NbAuthService);
  }
}
