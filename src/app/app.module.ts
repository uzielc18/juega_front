import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { STRATEGIES } from '../environments/oauth2.strategies';
import { EmitEventsService } from './shared/services/emit-events.service';
import { NbTokenStorage, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';
import { AuthStorageTokenService } from './core/auth/services/auth-storage-token.service';
import { HttpRequest } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule.forRoot({
      strategyName: environment.authStrategy.name,
      strategyGoogleName: environment.authGoogleStrategy.name,
      apiAuth: environment.apiUrls.base,
      moduleId: environment.module_id,
    }),
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    STRATEGIES,
    {provide: NbTokenStorage, useClass: AuthStorageTokenService},
    {
      provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
      useValue: (req: HttpRequest<any>) => !!req.url.match(/(token)/)
    },
    EmitEventsService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
