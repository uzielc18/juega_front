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
<<<<<<< HEAD
=======
export class AuthAzureToken extends NbAuthOAuth2JWTToken {

  // let's rename it to exclude name clashes
  static NAME = 'nb:auth:azure:token';

  getValue(): string {
    return this.token.id_token;
  }
}
>>>>>>> f3bb94f6595f965b6ef453ebba8f2ed8d92d012a

@Injectable()
export class NbAuthAzureStrategy extends NbOAuth2AuthStrategy {
  static setup(
    options: NbOAuth2AuthStrategyOptions
  ): [NbAuthStrategyClass, NbOAuth2AuthStrategyOptions] {
    return [NbAuthAzureStrategy, options]; // HERE we make sure our strategy return correct class reference
  }
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
      NbAuthAzureStrategy.setup({
        name: environment.authAzureStrategy.name,
        clientId: environment.authAzureStrategy.clientId,
        clientSecret: environment.authAzureStrategy.clientSecret,
        clientAuthMethod: NbOAuth2ClientAuthMethod.REQUEST_BODY,
        authorize: {
          endpoint: environment.authAzureStrategy.endpoint,

          responseType: NbOAuth2ResponseType.CODE,
          redirectUri: environment.authAzureStrategy.redirectUri,
          scope: 'openid profile email',
        },
        token: {
          endpoint: environment.authAzureStrategy.tokenEndpoint,
          grantType: NbOAuth2GrantType.AUTHORIZATION_CODE,
          redirectUri: environment.authAzureStrategy.redirectUri,
          class: NbAuthOAuth2Token
        },
        refresh: {
          endpoint: environment.authAzureStrategy.refreshTokenEndpoint,
          grantType: NbOAuth2GrantType.REFRESH_TOKEN,
        },
        redirect: {
          success: environment.authAzureStrategy.success
        },

      }),
    ],
  }).providers,
  NbAuthLambStrategy,
  NbAuthGoogleStrategy,
  NbAuthAzureStrategy
];
