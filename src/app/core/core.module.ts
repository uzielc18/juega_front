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
import { Auth2Guard } from './oauth2/oauth2.guard';
// import { Oauth2Component } from './oauth2/oauth2.component';
import { Oauth2CallbackComponent } from './oauth2/oauth2.callback.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbLayoutModule,
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
import { AuthInterceptorService } from './oauth2/interceptor.service';
import { Oauth2GoogleCallbackComponent } from './oauth2/oauth2google.callback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralService } from '../providers';

import localePe from '@angular/common/locales/es-PE';
registerLocaleData(localePe);
const ANGULAR: any[] = [CommonModule, FormsModule, ReactiveFormsModule];
@NgModule({
  declarations: [
    // Oauth2Component,
    ScaffoldComponent,
    Oauth2CallbackComponent,
    // Oauth2GoogleComponent,
    Oauth2GoogleCallbackComponent,
  ], // add
  imports: [
    ...ANGULAR,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'theme-2-default' }),
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
    NbTooltipModule
  ],
  // exports: [RouterModule],
  providers: [
    AppService,
    CatchErrorInterceptor,
    LoadInterceptor,
    AppValidateTokenService,
    Auth2Guard,
    { provide: LOCALE_ID, useValue: 'es-Pe' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      // useClass: NbAuthSimpleInterceptor,
      multi: true,
    },
    {provide: HTTP_INTERCEPTORS, useClass: CatchErrorInterceptor, multi: true, deps: [NbToastrService]},
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [AppService, Injector],
      multi: true,
    },
    // {
    //   provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
    //   useValue: (value: any) => {},
    // },
    GeneralService,
  ],
})
export class CoreModule {
  static forRoot(options: CoreOptions): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [{ provide: CORE_OPTIONS, useValue: options }],
    };
  }
}
