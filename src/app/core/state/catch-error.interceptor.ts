import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NbIconConfig, NbToastrService } from '@nebular/theme';
import { status } from './status-messages';

const showStatusCodes = [500, 0];
const showStatusCodesWarning = [400, 403, 404, 202, 422, 409, 405, 401 ];
@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {
  constructor(public service: NbToastrService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//       catchError((err: HttpErrorResponse) => {
//         this.throwErrorToast(err);
//         return throwError(err);
//       })
//     );
//   }

//   private throwErrorToast(err: any): void {
//     if (showStatusCodes.includes(err.status)) {
//       const errorMsg = err.error.message || err.statusText;
//       this.toast(`${err.status} ${errorMsg}`, err.statusText);
//     }
//   }

//   private toast(msg: any, title: any): void {
//     this.service.danger(msg, title, {
//       duration: 4000,
//       icon: 'alert-circle-outline',
//     });
//   }
// }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
          (res: HttpEvent<any>) => {
              if (res && req.method !== 'GET') {
                this.interceptResponse(res, req.method);
              }
          },
       ),
      catchError((err: HttpErrorResponse) => {
        this.throwErrorToast(err);
        this.throwErrorToastWarning(err)
        return throwError(err);
      })
    );
  }
  private interceptResponse(event: HttpEvent<any>, method: any): any {
      const $event:any =  event;
      if (event && $event['status']) {
        var data: any = status[$event['status']];
          let msg = data.description;
          if ($event && $event.body && $event.body.message) {
            msg = $event.body.message;
            setTimeout(() => {
              this.showMessage(msg, data.title, data.icon, data.status);
            }, 100);
          }
      }
  }
  private throwErrorToast(err: any): void {
    console.log(err, "hola mundo")
    if (showStatusCodes.includes(err.status)) {
      this.toast(`${err.message}`, err.name);
    }
  }

  private toast(msg: any, title: any): void {
    this.service.danger(msg, title, {
      duration: 4000,
      icon: 'alert-circle-outline',
    });
  }
  private throwErrorToastWarning(err: any): void {
    console.log(err, "hola mundo")
    if (showStatusCodesWarning.includes(err.status)) {
      this.toast2(`${err.error.message}`, err.name);
    }
  }
  private toast2(msg: any, title: any): void {
    this.service.warning(msg, title, {
      duration: 4000,
      icon: 'alert-circle-outline',
    });
  }
  showMessage(msg: any, title: any, iconName: string, status: any): any {
    const iconConfig: NbIconConfig = { icon: iconName, pack: 'eva', status: status };
    this.service.show(msg, title, iconConfig);
  }


}
// import { environment } from 'src/environments/environment';
// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { NbIconConfig, NbToastrService } from '@nebular/theme';
// import { status } from './status-messages';
// import { exceptions } from './exceptions';
// import { tap } from 'rxjs/operators';

// @Injectable()
// export class CatchErrorInterceptor implements HttpInterceptor {
//     constructor(private toastrService: NbToastrService) {
//     }
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const handleRequest = next.handle(req);
//         return handleRequest.pipe(
//             tap(
//                 (res: HttpEvent<any>) => this.interceptResponse(res, req.method),
//                 (err: any) => this.catchError(err, req.method),
//             ),
//         );

//     }

//     private interceptResponse(event: HttpEvent<any>, method: any): any {
//         if (event instanceof HttpResponse) {
//             if (this.isExceptions(event, method)) {
//               var data: any = status[event['status']];
//                 let msg = data.description;
//                 if (event && event.body && event.body.message) {
//                   msg = event.body.message;
//                 }
//                 this.showMessage(msg, data.title, data.icon, data.status);
//             }
//         }
//     }

//     private catchError(err: any, method: any): any {
//         if (err instanceof HttpErrorResponse) {
//             switch (err.status) {
//                 case 422:
//                     if (method === 'GET') {
//                         this.showErrors(err);
//                     } else {
//                         this.showErrosDefaults(err);
//                     }
//                     break;
//                 default:
//                     this.showErrosDefaults(err);
//                     break;
//             }
//         }
//     }

//     private isExceptions(event: any, method: any): any {
//         const resource = this.getOnlyUrlResource(event);
//         if (method === 'GET') {
//             return false;
//         } else if (this.isFileExceptions(resource)) {
//             return false;
//         }
//         return true;
//     }

//     private isFileExceptions(resource: any): any {
//         if (exceptions.indexOf(resource) !== -1) {
//             return true;
//         }
//         return false;
//     }

//     private getOnlyUrlResource(event: any): any {
//         const resource = (event.url).replace(environment.apiUrls.base, '');
//         return resource;
//     }

//     private showErrosDefaults(event: any): void {
//       var data = status[event['status']];
//         this.showMessage(data.description, data.title, data.icon, data.status);
//     }

//     private showErrors(e: any): void {
//         const errors = e.error.data;
//         errors.forEach((iterator: any) => {
//             for (const err of errors[iterator]) {
//                 this.toast(`${e.status} ${e.statusText}`, err);
//             }
//         });
//     }

//     private toast(msg: any, title: any): void {
//         this.toastrService.danger(msg, title, { duration: 4000, icon: 'alert-circle-outline' });
//     }

//     showMessage(msg: any, title: any, iconName: string, status: any): any {
//         const iconConfig: NbIconConfig = { icon: iconName, pack: 'eva', status: status };
//         this.toastrService.show(msg, title, iconConfig);
//     }

// }
