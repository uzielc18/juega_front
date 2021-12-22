import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';

const showStatusCodes = [400, 500, 403, 404, 202, 422];

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {
  constructor(private service: NbToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        this.throwErrorToast(err);
        return throwError(err);
      })
    );
  }

  private throwErrorToast(err: any): void {
    if (showStatusCodes.includes(err.status)) {
      const errorMsg = err.error.message || err.statusText;
      this.toast(`${err.status} ${errorMsg}`, err.statusText);
    }
  }

  private toast(msg: any, title: any): void {
    this.service.danger(msg, title, {
      duration: 4000,
      icon: 'alert-circle-outline',
    });
  }
}
