import { Component, OnDestroy } from '@angular/core';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService, NbAuthToken } from '@nebular/auth';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  token!: NbAuthOAuth2Token | null;

  private destroy$ = new Subject<void>();

  constructor(private authService: NbAuthService) {
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

  login() {
    this.authService
      .authenticate('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {});
  }

  logout() {
    this.authService
      .logout('google')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
