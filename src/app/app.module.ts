import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NbAuthModule} from '@nebular/auth';
import {strategies} from '../environments/oauth2.strategies';
import {CoreModule} from './core';
import {environment} from '../environments/environment';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NbAuthModule.forRoot(strategies),
    CoreModule.forRoot({
      strategyName: environment.authStrategy.name,
      apiAuth: environment.apiUrls.auth,
      moduleId: environment.module_id
    }),
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
