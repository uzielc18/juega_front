import {
  NbAuthOAuth2Token,
  NbOAuth2AuthStrategy,
  NbOAuth2ClientAuthMethod,
  NbOAuth2GrantType,
  NbOAuth2ResponseType,
} from '@nebular/auth';
import { environment } from './environment';

export const strategies = {
  strategies: [
    NbOAuth2AuthStrategy.setup({
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
    // NbOAuth2AuthStrategy.setup({
    //   name: environment.authGoogleStrategy.name,
    //   clientId: environment.authGoogleStrategy.clientId,
    //   clientSecret: '',
    //   authorize: {
    //     endpoint: environment.authGoogleStrategy.endpoint,
    //     responseType: NbOAuth2ResponseType.TOKEN,
    //     scope: 'email profile openid',
    //     redirectUri: environment.authGoogleStrategy.redirectUri,
    //   },
    //   redirect: {
    //     success: environment.authGoogleStrategy.success,
    //   },
    // }),
  ],
};
