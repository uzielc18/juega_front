import {
  APP_INITIALIZER,
  Injector,
  LOCALE_ID,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CORE_OPTIONS, CoreOptions } from './core.options';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbPopoverModule,
  NbRadioModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbThemeModule,
  NbToastrModule,
  NbToastrService,
  NbToggleModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { ScaffoldComponent } from './scaffold/scaffold.component';
import { AppValidateTokenService } from './state/app-validate-token.service';
import { CatchErrorInterceptor } from './state/catch-error.interceptor';
import { AppService, init_app } from './state/app.service';
import { LoadInterceptor } from './state/load.interceptor';
import { routesConfig, toastConfig } from './state/config';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralService } from '../providers';

import localePe from '@angular/common/locales/es-PE';
import { AuthRouteLoginComponent } from './auth/contents/auth-route-login/auth-route-login.component';
import { AuthRouteLambComponent } from './auth/contents/auth-route-lamb/auth-route-lamb.component';
import { AuthRouteGoogleComponent } from './auth/contents/auth-route-google/auth-route-google.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { NbAuthJWTInterceptor } from '@nebular/auth';
import { AuthStrategyInterceptor } from './auth/interceptors/auth-strategy.interceptor';
import {NebularModule} from "../shared/nebular.module";
import { SpinnerService } from './auth/services/spinner.service';
import { SpinnerInterceptor } from './auth/interceptors/spinner.interceptor';
import {FilterModule} from "../shared/pipes/filter/filter.module";
import {MSatisfactionModule} from "../shared/components/satisfaction/modal/m-satisfaction.module";
import {MNotificationsModule} from "../shared/components/notifications/modal/m-notifications.module";
import { AuthRouteAzureComponent } from './auth/contents/auth-route-azure/auth-route-azure.component';
registerLocaleData(localePe);
const ANGULAR: any[] = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule];

@NgModule({
  declarations: [
    ScaffoldComponent,
    AuthRouteLoginComponent,
    AuthRouteLambComponent,
    AuthRouteGoogleComponent,
    AuthRouteAzureComponent
  ], // add
  imports: [
    ...ANGULAR,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'theme-2-default'}),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSpinnerModule,
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbToastrModule.forRoot(toastConfig),
    NbEvaIconsModule,
    NbIconModule,
    NbUserModule,
    NbActionsModule,
    NbToggleModule,
    NbContextMenuModule,
    RouterModule.forChild(routesConfig),
    NbSelectModule,
    NbButtonModule,
    NbPopoverModule,
    NbCardModule,
    NbRadioModule,
    NbTooltipModule,
    NbListModule,
    NbAlertModule,
    NebularModule,
    FilterModule,
    MSatisfactionModule,
    MNotificationsModule
  ],
  exports: [
    AuthRouteLoginComponent,
    AuthRouteLambComponent,
    AuthRouteGoogleComponent
  ],
  providers: [
    AppService,
    CatchErrorInterceptor,
    LoadInterceptor,
    AppValidateTokenService,
    AuthGuard,
    SpinnerService,
    { provide: LOCALE_ID, useValue: 'es-Pe' },
    {provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AuthStrategyInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CatchErrorInterceptor, multi: true, deps: [NbToastrService]},
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppService, Injector],
      multi: true,
    },
    GeneralService,
  ],
})
export class CoreModule {
  static forRoot(options: { apiAuth: string; strategyName: string; moduleId: number; strategyGoogleName: string; strategyAzureName: string }): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [{ provide: CORE_OPTIONS, useValue: options }],
    };
  }
}
