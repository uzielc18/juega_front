// import {
//   ChangeDetectionStrategy,
//   Component,
//   Inject,
//   OnDestroy,
//   OnInit,
// } from '@angular/core';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import {
//   NbAuthOAuth2Token,
//   NbAuthResult,
//   NbAuthService,
//   NbAuthToken,
// } from '@nebular/auth';
// import { CORE_OPTIONS, CoreOptions } from '../core.options';

// @Component({
//   selector: 'app-oauth2google',
//   template: `<span>Authenticating...</span>`,
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class Oauth2GoogleComponent implements OnDestroy {
//   private destroy$ = new Subject<void>();
//   token!: NbAuthOAuth2Token | null;

//   constructor(
//     private authService: NbAuthService,
//     @Inject(CORE_OPTIONS) protected options: CoreOptions
//   ) {
//     this.authService
//       .onTokenChange()
//       .pipe(takeUntil(this.destroy$))
//       .subscribe((token: NbAuthToken) => {
//         this.token = null;
//         if (token && token.isValid()) {
//           this.token = token as NbAuthOAuth2Token;
//         }
//       });
//   }

//   loginGoogle(): void {
//     this.authService
//       .authenticate(this.options.strategyGoogleName)
//       .pipe(takeUntil(this.destroy$))
//       .subscribe((authResult: NbAuthResult) => {});
//   }

//   logout() {
//     this.authService
//       .logout(this.options.strategyGoogleName)
//       .pipe(takeUntil(this.destroy$))
//       .subscribe((authResult: NbAuthResult) => {});
//   }

//   ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }
// }
