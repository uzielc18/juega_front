import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  NbAuthResult,
  NbAuthService,
  NbAuthSimpleToken,
  NbTokenService,
} from '@nebular/auth';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { CORE_OPTIONS, CoreOptions } from '../core.options';
import { AppValidateTokenService } from '../state/app-validate-token.service';

@Component({
  selector: 'app-oauth2-callback',
  template: `<span>Authenticating...</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Oauth2CallbackComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private tokenService: NbTokenService,
    private authService: NbAuthService,
    private router: Router,
    private appValidateTokenService: AppValidateTokenService,
    @Inject(CORE_OPTIONS) protected options: CoreOptions
  ) {
    this.authService
      .authenticate(this.options.strategyName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess()) {
          const response: any = authResult.getToken();
          this.appValidateTokenService
            .validateLamb(response.token.access_token)
            .subscribe((data: any) => {
              // console.log('------>', data.data.token);
              const token = new NbAuthSimpleToken(
                data.data.token,
                this.options.strategyName
              );
              // console.log(token);
              this.tokenService.set(token).subscribe(() => {
                // console.log('ok');
                if (authResult.isSuccess() && authResult.getRedirect()) {
                  window.location.href = authResult.getRedirect();
                }
              });
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
