import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { STRATEGIES } from '../environments/oauth2.strategies';
import { EmitEventsService } from './shared/services/emit-events.service';

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
  ],
  providers: [STRATEGIES, EmitEventsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
