import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { STRATEGIES } from '../environments/oauth2.strategies';
import { EmitEventsService } from './shared/services/emit-events.service';
// import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
// import { HttpClient } from '@angular/common/http';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// export function createTranslateLoader(https: HttpClient) {
//   return new TranslateHttpLoader(https, './assets/languages/i18n/', '.json');
// }

// const NGX_TRANSLATE: any[] = [
//   TranslateModule.forRoot({
//     loader: {
//       provide: TranslateLoader,
//       useFactory: (createTranslateLoader),
//       deps: [HttpClient],
//     }
//   }),
// ]

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule.forRoot({
      strategyName: environment.authStrategy.name,
      strategyGoogleName: environment.authGoogleStrategy.name,
      apiAuth: environment.apiUrls.auth,
      moduleId: environment.module_id,
    }),
    RouterModule,
    AppRoutingModule,
    // ...NGX_TRANSLATE,
  ],
  providers: [STRATEGIES, EmitEventsService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
