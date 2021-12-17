import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { CORE_OPTIONS, CoreOptions } from '../core.options';
import { AppValidateTokenService } from '../state/app-validate-token.service';

@Component({
  selector: 'app-oauth2google-callback',
  template: `<span>Authenticating...</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Oauth2GoogleCallbackComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private authService: NbAuthService,
    private router: Router,
    private appValidateTokenService: AppValidateTokenService,
    @Inject(CORE_OPTIONS) protected options: CoreOptions
  ) {
    this.authService
      .authenticate(this.options.strategyGoogleName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess()) {
          console.log(authResult);
          this.appValidateTokenService
            .validateGoogle(authResult.getToken().getValue())
            .then(() => {
              if (authResult.isSuccess() && authResult.getRedirect()) {
                window.location.href = authResult.getRedirect();
              }
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
