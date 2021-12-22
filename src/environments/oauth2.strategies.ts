// import {
//   NbAuthOAuth2Token,
//   NbOAuth2AuthStrategy,
//   NbOAuth2ClientAuthMethod,
//   NbOAuth2GrantType,
//   NbOAuth2ResponseType,
// } from '@nebular/auth';
// import { environment } from './environment';

// export const strategies = {
//   strategies: [
//     // NbOAuth2AuthStrategy.setup({
//     //   name: environment.authStrategy.name,
//     //   clientId: environment.authStrategy.clientId,
//     //   // clientAuthMethod: NbOAuth2ClientAuthMethod.REQUEST_BODY,
//     //   baseEndpoint: `${environment.authStrategy.baseEndpoint}/oauth`,
//     //   authorize: {
//     //     endpoint: '/authorize',
//     //     responseType: NbOAuth2ResponseType.TOKEN,
//     //     redirectUri: `${environment.authStrategy.redirectUri}`,
//     //     scope: 'read introspection',
//     //   },
//     //   redirect: {
//     //     success: environment.authStrategy.success,
//     //   },
//     //   refresh: {
//     //     endpoint: '/token/',
//     //     grantType: NbOAuth2GrantType.REFRESH_TOKEN,
//     //   },
//     //   // token: {
//     //   //   endpoint: '/token/',
//     //   //   grantType: NbOAuth2GrantType.PASSWORD,
//     //   //   class: NbAuthOAuth2Token
//     //   // }
//     // }),
//     NbOAuth2AuthStrategy.setup({
//       name: environment.authGoogleStrategy.name,
//       clientId: environment.authGoogleStrategy.clientId,
//       clientSecret: '',
//       authorize: {
//         endpoint: environment.authGoogleStrategy.endpoint,
//         responseType: NbOAuth2ResponseType.TOKEN,
//         scope: 'email profile openid',
//         redirectUri: environment.authGoogleStrategy.redirectUri,
//       },
//       redirect: {
//         success: environment.authGoogleStrategy.success,
//       },
//     }),
//   ],
// };

import { Injectable } from '@angular/core';
import {
  NbAuthStrategyClass,
  NbOAuth2AuthStrategy,
  NbOAuth2AuthStrategyOptions,
  NbOAuth2GrantType,
  NbOAuth2ResponseType,
} from '@nebular/auth';
import { environment } from './environment';

@Injectable()
export class NbAuthLambStrategy extends NbOAuth2AuthStrategy {
  // static setup(
  //   options: NbOAuth2AuthStrategyOptions
  // ): [NbAuthStrategyClass, NbOAuth2AuthStrategyOptions] {
  //   return [NbAuthLambStrategy, options]; // HERE we make sure our strategy return correct class reference
  // }
}

@Injectable()
export class NbAuthGoogleStrategy extends NbOAuth2AuthStrategy {
  // static setup(
  //   options: NbOAuth2AuthStrategyOptions
  // ): [NbAuthStrategyClass, NbOAuth2AuthStrategyOptions] {
  //   return [NbAuthGoogleStrategy, options]; // HERE we make sure our strategy return correct class reference
  // }
}

export const strategies = {
  strategies: [
    NbAuthLambStrategy.setup({
      name: environment.authStrategy.name,
      clientId: environment.authStrategy.clientId,
      // clientAuthMethod: NbOAuth2ClientAuthMethod.REQUEST_BODY,
      baseEndpoint: `${environment.authStrategy.baseEndpoint}/oauth`,
      authorize: {
        endpoint: '/authorize',
        responseType: NbOAuth2ResponseType.TOKEN,
        redirectUri: `${environment.authStrategy.redirectUri}`,
        scope: 'read introspection',
      },
      redirect: {
        success: environment.authStrategy.success,
      },
      refresh: {
        endpoint: '/token/',
        grantType: NbOAuth2GrantType.REFRESH_TOKEN,
      },
      // token: {
      //   endpoint: '/token/',
      //   grantType: NbOAuth2GrantType.PASSWORD,
      //   class: NbAuthOAuth2Token
      // }
    }),
    NbAuthGoogleStrategy.setup({
      name: environment.authGoogleStrategy.name,
      clientId: environment.authGoogleStrategy.clientId,
      clientSecret: '',
      authorize: {
        endpoint: environment.authGoogleStrategy.endpoint,
        responseType: NbOAuth2ResponseType.TOKEN,
        scope: 'email profile openid',
        redirectUri: environment.authGoogleStrategy.redirectUri,
      },
      redirect: {
        success: environment.authGoogleStrategy.success,
      },
    })
  ],
};
