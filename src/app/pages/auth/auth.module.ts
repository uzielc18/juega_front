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
            '451397129105-sh5t7qilt3cv1adu1ejp9vs729qi5vua.apps.googleusercontent.com',
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
