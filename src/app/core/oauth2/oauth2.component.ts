import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { CORE_OPTIONS, CoreOptions } from '../core.options';

@Component({
  selector: 'app-oauth2',
  template: `<span>Authenticating...</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Oauth2Component implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private authService: NbAuthService,
    @Inject(CORE_OPTIONS) protected options: CoreOptions
  ) {}

  ngOnInit(): void {
    // this.loginLamb();
  }

  loginLamb(): void {
    this.authService
      .authenticate(this.options.strategyName)
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {
        console.log("oiath3",authResult)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
