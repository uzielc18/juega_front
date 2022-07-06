import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { delay, filter } from 'rxjs/operators';

@Injectable()
export class SpinnerService implements OnDestroy {

  routeSub: Subscription;

  constructor(private router: Router) {

    this.routeSub = router.events.pipe(
      filter((e: any): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      if (e instanceof NavigationStart) {
        this.start();
      } else if (e instanceof NavigationEnd) {
        this.stop();
      } else if (e instanceof NavigationError) {
        this.stop();
      }

    });
  }

  private _loading = new Subject<boolean>();

  start = (): void => this._loading.next(true);

  stop = (): void => this._loading.next(false);

  onLoader = (): Observable<boolean> => this._loading.asObservable().pipe(
    delay(0));


  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
