import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {of, Subscription} from "rxjs";
import {NbAuthResult, NbAuthService} from "@nebular/auth";
import {DOCUMENT} from "@angular/common";
import {finalize} from "rxjs/operators";
import { CoreOptions, CORE_OPTIONS } from 'src/app/core/core.options';

@Component({
  selector: 'app-auth-route-lamb',
  templateUrl: './auth-route-lamb.component.html',
  styleUrls: ['./auth-route-lamb.component.scss']
})
export class AuthRouteLambComponent implements OnDestroy {
  spinner = false;
  authenticate: Subscription;

  constructor(private authService: NbAuthService,
              @Inject(DOCUMENT) protected document: any,
              @Inject(CORE_OPTIONS) protected config: CoreOptions) {
    this.authenticate = this.onAuthenticate();
  }

  onAuthenticate(): Subscription {
    this.spinner = true;
    return this.authService.authenticate(this.config.strategyName)
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
