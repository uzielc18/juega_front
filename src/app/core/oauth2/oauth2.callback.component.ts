import {ChangeDetectionStrategy, Component, Inject, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {NbAuthResult, NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {CORE_OPTIONS, CoreOptions} from '../core.options';
import {AppValidateTokenService} from '../state/app-validate-token.service';

@Component({
    selector: 'app-oauth2-callback',
    template: `<span>Authenticating...</span>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Oauth2CallbackComponent implements OnDestroy {
    private destroy$ = new Subject<void>();

    constructor(
        private authService: NbAuthService,
        private router: Router,
        private appValidateTokenService: AppValidateTokenService,
        @Inject(CORE_OPTIONS) protected options: CoreOptions) {
        this.authService.authenticate(this.options.strategyName)
            .pipe(takeUntil(this.destroy$))
            .subscribe((authResult: NbAuthResult) => {
                if (authResult.isSuccess()) {
                    this.appValidateTokenService.validate(authResult.getToken().getValue())
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
