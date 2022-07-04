import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NbAuthResult, NbAuthService} from "@nebular/auth";
import {DOCUMENT} from "@angular/common";
import {finalize} from "rxjs/operators";
import { CoreOptions, CORE_OPTIONS } from 'src/app/core/core.options';

@Component({
  selector: 'app-auth-route-google',
  templateUrl: './auth-route-google.component.html',
  styleUrls: ['./auth-route-google.component.scss']
})
export class AuthRouteGoogleComponent implements OnDestroy {

  spinner = false;
  authenticate: Subscription;

  constructor(private authService: NbAuthService,
              @Inject(DOCUMENT) protected document: any,
              @Inject(CORE_OPTIONS) protected config: CoreOptions) {
    this.authenticate = this.onAuthenticateGoogle();
  }

  onAuthenticateGoogle(): Subscription {
    this.spinner = true;
    return this.authService.authenticate(this.config.strategyGoogleName)
      .pipe(finalize(() => this.spinner = false))
      .subscribe((authResult: NbAuthResult) => {
        if (authResult.isSuccess() && authResult.getRedirect()) {
          this.document.location.href = authResult.getRedirect();
        }
      });
  }

  ngOnDestroy(): void {
    this.authenticate.unsubscribe();
  }

}
