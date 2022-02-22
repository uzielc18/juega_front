import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { EmitEventsService } from 'src/app/shared/services/emit-events.service';

@Component({
  selector: 'app-dashboard',
  template: '<router-outlet></router-outlet>',
  styles: [``]
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscribes$: any = Subscription;
  constructor(public translate: TranslateService, private emitEventsService: EmitEventsService) { }

  ngOnInit(): void {
    this.translate.setDefaultLang('es');
    this.subscribes$ = this.emitEventsService.setLangsReturns().subscribe(value => { // para emitir evento desde la cabecera
      if (value) {
        setTimeout(() => {
          this.translate.use(value);
        }, 1000);
      } else {
      }
      });
  }
  ngOnDestroy(): void {
    this.subscribes$.complete();
  }
}
