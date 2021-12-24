import { Injectable, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NbAuthModule,
  NbAuthStrategyClass,
  NbOAuth2AuthStrategy,
  NbOAuth2AuthStrategyOptions,
  NbOAuth2GrantType,
  NbOAuth2ResponseType,
} from '@nebular/auth';
import { CoreModule } from './core';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';

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

export const NB_CORE_PROVIDERS = [
  NbAuthModule.forRoot({
    strategies: [
      NbAuthLambStrategy.setup({
        name: environment.authStrategy.name,
        clientId: environment.authStrategy.clientId,
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
      }),
    ],
  }).providers,
  NbAuthLambStrategy,
  NbAuthGoogleStrategy,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    // NbAuthModule.forRoot(),
    CoreModule.forRoot({
      strategyName: environment.authStrategy.name,
      strategyGoogleName: environment.authGoogleStrategy.name,
      apiAuth: environment.apiUrls.auth,
      moduleId: environment.module_id,
    }),
    RouterModule,
    AppRoutingModule,
  ],
  providers: [NB_CORE_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
