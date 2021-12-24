import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, OnDestroy } from '@angular/core';
import {
  NbAuthOAuth2Token,
  NbAuthResult,
  NbAuthService,
  NbAuthToken,
  NbOAuth2ResponseType,
} from '@nebular/auth';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
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

  // loginGoogle(): Observable<any> {
  //   const body = new HttpParams()
  //     .set('name', environment.authGoogleStrategy.name )
  //     .set('client_id', environment.authGoogleStrategy.clientId)
  //     .set('redirect_uri', environment.authGoogleStrategy.redirectUri)
  //     .set('response_type', NbOAuth2ResponseType.TOKEN)
  //     .set('scope', 'email profile openid')
  //     .set('endpoint', environment.authGoogleStrategy.endpoint)
  //     .set('redirectUri', environment.authGoogleStrategy.redirectUri)
  //     .set('redirect_success', environment.authGoogleStrategy.success);

      // name: environment.authGoogleStrategy.name,
      // clientId: environment.authGoogleStrategy.clientId,
      // clientSecret: '',
      // authorize: {
      //   endpoint: environment.authGoogleStrategy.endpoint,
      //   responseType: NbOAuth2ResponseType.TOKEN,
      //   scope: 'email profile openid',
      //   redirectUri: environment.authGoogleStrategy.redirectUri,
      // },
      // redirect: {
      //   success: environment.authGoogleStrategy.success,
      // },

  //   return this.http.post('/loginGoogle',
  //     body.toString(),
  //     {
  //       headers: new HttpHeaders()
  //         .set('Content-Type', 'application/x-www-form-urlencoded')
  //     }
  //   );
  // }

  loginLamb(): void {
    // console.log('entrando aqui login page ')
    this.authService
      .authenticate(this.options.strategyName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        // console.log('pageeeeeeee', authResult)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
