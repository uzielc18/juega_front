import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NbAuthResult, NbAuthService} from "@nebular/auth";
import {DOCUMENT} from "@angular/common";
import {CORE_OPTIONS, CoreOptions} from "../../../core.options";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-auth-route-azure',
  templateUrl: './auth-route-azure.component.html',
  styleUrls: ['./auth-route-azure.component.scss']
})
export class AuthRouteAzureComponent implements OnDestroy {

  spinner = false;
  authenticate: Subscription;

  constructor(private authService: NbAuthService,
              @Inject(DOCUMENT) protected document: any,
              @Inject(CORE_OPTIONS) protected config: CoreOptions) {
    this.authenticate = this.onAuthenticateAzure();
  }

  onAuthenticateAzure(): Subscription {
    this.spinner = true;
    return this.authService.authenticate(this.config.strategyAzureName)
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
