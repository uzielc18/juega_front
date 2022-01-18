import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy } from '@angular/core';
import {
  NbAuthOAuth2Token,
  NbAuthResult,
  NbAuthService,
  NbAuthToken,
} from '@nebular/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreOptions, CORE_OPTIONS } from '../../../../core/core.options';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  token!: NbAuthOAuth2Token | null;

  private destroy$ = new Subject<void>();

  constructor(
    private authService: NbAuthService,
    private http: HttpClient,
    @Inject(CORE_OPTIONS) protected options: CoreOptions
  ) {
    this.authService
      .onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: NbAuthToken) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token as NbAuthOAuth2Token;
        }
      });
  }

  loginGoogle(): void {
    this.authService
      .authenticate(this.options.strategyGoogleName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {});
  }

  loginLamb(): void {
    this.authService
      .authenticate(this.options.strategyName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
