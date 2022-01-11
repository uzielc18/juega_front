import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadInterceptor implements HttpInterceptor {
  constructor(private service: AppService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.service.start();
    return next.handle(req).pipe(finalize(() => this.service.stop()));
  }
}
