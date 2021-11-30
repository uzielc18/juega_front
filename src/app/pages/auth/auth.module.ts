import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NebularModule } from '../../shared/nebular.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './contents/login/login.component';
import { CallbackComponent } from './contents/callback/callback.component';
import {
  NbAuthModule,
  NbOAuth2AuthStrategy,
  NbOAuth2ResponseType,
} from '@nebular/auth';

@NgModule({
  declarations: [LoginComponent, CallbackComponent],
  imports: [
    CommonModule,
    NebularModule,
    AuthRoutingModule,

    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId:
            '649461344129-0thst4vl3n9aj0j7njie8nd73psls419.apps.googleusercontent.com',
          clientSecret: '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',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
            redirectUri: 'http://localhost:4200/auth/callback',
          },
        }),
      ],
    }),
  ],
})
export class AuthModule {}
