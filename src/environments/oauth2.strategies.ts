import { Injectable } from '@angular/core';
import {
  NbAuthIllegalTokenError,
  NbAuthModule, NbAuthOAuth2JWTToken,
  NbAuthOAuth2Token, NbAuthResult,
  NbAuthStrategyClass,
  NbOAuth2AuthStrategy,
  NbOAuth2AuthStrategyOptions,
  NbOAuth2ClientAuthMethod,
  NbOAuth2GrantType,
  NbOAuth2ResponseType,
} from '@nebular/auth';
import { of } from 'rxjs';
import { environment } from './environment';
import {catchError, map, switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Injectable()
export class NbAuthLambStrategy extends NbOAuth2AuthStrategy {
  static setup(
    options: NbOAuth2AuthStrategyOptions
  ): [NbAuthStrategyClass, NbOAuth2AuthStrategyOptions] {
    return [NbAuthLambStrategy, options]; // HERE we make sure our strategy return correct class reference
  }
}
@Injectable()
export class NbAuthGoogleStrategy extends NbOAuth2AuthStrategy {
  static setup(
    options: NbOAuth2AuthStrategyOptions
  ): [NbAuthStrategyClass, NbOAuth2AuthStrategyOptions] {
    return [NbAuthGoogleStrategy, options]; // HERE we make sure our strategy return correct class reference
  }
}
export class AuthAzureToken extends NbAuthOAuth2JWTToken {

  // let's rename it to exclude name clashes
  static NAME = 'nb:auth:azure:token';

  getValue(): string {
    return this.token.id_token;
  }
}

@Injectable()
export class AzureADB2CAuthStrategy extends NbOAuth2AuthStrategy {

  // we need this method for strategy setup
  static setup(options: NbOAuth2AuthStrategyOptions): [NbAuthStrategyClass, NbOAuth2AuthStrategyOptions] {
    return [AzureADB2CAuthStrategy, options];
  }

  protected redirectResultHandlers = {
    [NbOAuth2ResponseType.CODE]: () => {
      return of(this.route.snapshot.queryParams).pipe(
        switchMap((params: any) => {
          if (params.code) {
            return this.requestToken(params.code);
          }

          return of(
            new NbAuthResult(
              false,
              params,
              this.getOption('redirect.failure'),
              this.getOption('defaultErrors'),
              [],
            ));
        }),
      );
    },
    id_token: () => {
      const module = 'authorize';
      const requireValidToken = this.getOption(`${module}.requireValidToken`);
      return of(this.route.snapshot.fragment).pipe(
        map((fragment: any) => this.parseHashAsQueryParams(fragment)),
        map((params: any) => {
          if (!params.error) {
            return new NbAuthResult(
              true,
              params,
              this.getOption('redirect.success'),
              [],
              this.getOption('defaultMessages'),
              this.createToken(params, requireValidToken));
          }
          return new NbAuthResult(
            false,
            params,
            this.getOption('redirect.failure'),
            this.getOption('defaultErrors'),
            [],
          );
        }),
        catchError(err => {
          const errors = [];
          if (err instanceof NbAuthIllegalTokenError) {
            errors.push(err.message);
          } else {
            errors.push('Something went wrong.');
          }
          return of(
            new NbAuthResult(
              false,
              err,
              this.getOption('redirect.failure'),
              errors,
            ));
        }),
      );
    },
  };


  protected redirectResults: any = {
    [NbOAuth2ResponseType.CODE]: () => of(null),

    id_token: () => {
      return of(this.route.snapshot.fragment).pipe(
        map((fragment: any) => this.parseHashAsQueryParams(fragment)),
        map((params: any) => !!(params && (params.id_token || params.error))),
      );
    },
  };
}
export const STRATEGIES = [
  NbAuthModule.forRoot({
    strategies: [
      NbAuthLambStrategy.setup({
        name: environment.authStrategy.name,
        clientId: environment.authStrategy.clientId,
        clientSecret: environment.authStrategy.clientSecret,
        clientAuthMethod: NbOAuth2ClientAuthMethod.REQUEST_BODY,
        baseEndpoint: `${environment.authStrategy.baseEndpoint}/oauth`,
        authorize: {
          endpoint: '/authorize',
          responseType: NbOAuth2ResponseType.CODE,
          redirectUri: `${environment.authStrategy.redirectUri}`,
          scope: 'read',
        },
        token: {
          endpoint: '/token/',
          grantType: NbOAuth2GrantType.AUTHORIZATION_CODE,
          redirectUri: `${environment.authStrategy.redirectUri}`,
          class: NbAuthOAuth2Token
        },
        refresh: {
          endpoint: '/token/',
          grantType: NbOAuth2GrantType.REFRESH_TOKEN
        },
        redirect: {
          success: environment.authStrategy.success
        },
      }),
      NbAuthGoogleStrategy.setup({
        name: environment.authGoogleStrategy.name,
        clientId: environment.authGoogleStrategy.clientId,
        clientSecret: environment.authGoogleStrategy.clientSecret,
        clientAuthMethod: NbOAuth2ClientAuthMethod.REQUEST_BODY,
        authorize: {
          endpoint: environment.authGoogleStrategy.endpoint,
          responseType: NbOAuth2ResponseType.CODE,
          redirectUri: environment.authGoogleStrategy.redirectUri,
          scope: 'openid profile email',
          params: {
            access_type: 'offline',
            prompt: 'consent',
            hd: 'upeu.edu.pe'
          },
        },
        token: {
          endpoint: environment.authGoogleStrategy.tokenEndpoint,
          grantType: NbOAuth2GrantType.AUTHORIZATION_CODE,
          redirectUri: environment.authGoogleStrategy.redirectUri,
          class: NbAuthOAuth2Token
        },
        refresh: {
          endpoint: environment.authGoogleStrategy.refreshTokenEndpoint,
          grantType: NbOAuth2GrantType.REFRESH_TOKEN,
        },
        redirect: {
          success: environment.authGoogleStrategy.success
        },

      }),
      AzureADB2CAuthStrategy.setup({
        name: environment.authAzureStrategy.name,
        clientId: environment.authAzureStrategy.clientId,
        clientSecret: environment.authAzureStrategy.clientSecret,
        authorize: {
          endpoint: environment.authAzureStrategy.endpoint,
          responseType: NbOAuth2ResponseType.TOKEN,
          scope: 'openid profile',
          redirectUri: environment.authAzureStrategy.redirectUri,
          params: {
            nonce: NbOAuth2ClientAuthMethod.NONE,
          }
        },
        token: {
          endpoint: 'token',
          class: AuthAzureToken,
        },
        redirect: {
          success: environment.authAzureStrategy.success,
        },
      }),
    ],
  }).providers,
  NbAuthLambStrategy,
  NbAuthGoogleStrategy,
  AzureADB2CAuthStrategy
];
