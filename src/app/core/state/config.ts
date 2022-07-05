import { Routes } from '@angular/router';
import { AuthRouteGoogleComponent } from '../auth/contents/auth-route-google/auth-route-google.component';
import { AuthRouteLambComponent } from '../auth/contents/auth-route-lamb/auth-route-lamb.component';
import { AuthRouteLoginComponent } from '../auth/contents/auth-route-login/auth-route-login.component';


export const toastConfig: any = {
  hasIcon: true,
  duration: 5000,
};

export const routesConfig: Routes = [
  {
    path: 'auth',
    component: AuthRouteLoginComponent,
  },
  {
    path: 'auth/lamb/callback',
    component: AuthRouteLambComponent
  },
  {
    path: 'auth/google/callback',
    component: AuthRouteGoogleComponent
  }
  
];
