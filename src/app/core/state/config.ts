import { Routes } from '@angular/router';
import { Oauth2Component } from '../oauth2/oauth2.component';
import { Oauth2CallbackComponent } from '../oauth2/oauth2.callback.component';
import { Oauth2GoogleCallbackComponent } from '../oauth2google/oauth2google.callback.component';

export const toastConfig: any = {
  hasIcon: true,
  duration: 5000,
};

export const routesConfig: Routes = [
  {
    path: 'oauth2',
    component: Oauth2Component,
  },
  {
    path: 'oauth2/callback',
    component: Oauth2CallbackComponent,
  },
  {
    path: 'oauth2/google/callback',
    component: Oauth2GoogleCallbackComponent
  },
];
