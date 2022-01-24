import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbPopoverDirective,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import { delay, map, startWith, takeUntil } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import {
  NbAuthResult,
  NbAuthService,
  NbTokenService,
  routes,
} from '@nebular/auth';
import { CORE_OPTIONS, CoreOptions } from '../core.options';
import { AppService } from '../state/app.service';
import { AppValidateTokenService } from '../state/app-validate-token.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-scaffold',
  template: `
    <div
      [nbSpinner]="spinner"
      nbSpinnerMessage="Cargando..."
      nbSpinnerSize="giant"
      nbSpinnerStatus="primary"
    >
      <nb-layout withScroll [windowMode]="false">
        <nb-layout-header class="header-actions" fixed>
          <nb-actions>
            <nb-action icon="menu-2-outline" (click)="toggle()"></nb-action>
            <nb-action>
              <img
                *ngIf="!hidden"
                src="../../../assets/logo-upeu-blanco.png"
                alt="Lamb"
                width="180"
              />
            </nb-action>
          </nb-actions>
          <nb-actions>
          <nb-action >
          <!-- nbPopoverTrigger="noop" -->
            <button nbButton outline size="small" ghost [nbPopover]="templateRef" nbPopoverPlacement="bottom">
              DIRECTOR - 2021-1
            </button>
              <ng-template #templateRef >
                <nb-card style="padding-bottom: 0px;">
                  <nb-card-header style="padding-top: 8px; padding-bottom: 8px;">
                    Cambiar datos
                  </nb-card-header>
                  <nb-card-body style="padding-top: 3px; padding-bottom: 0px;">
                    <div>
                      <label class="label">Rol</label><br>
                       <nb-select placeholder="Idioma"  size="small" [selected]="'DOC'">
                          <nb-option value="DOC">Docente</nb-option>
                        </nb-select>
                    </div>
                    <div>
                      <label class="label">Semestre</label><br>
                       <nb-select placeholder="Idioma"  size="small" [selected]="'1'">
                          <nb-option value="1">2021-1</nb-option>
                        </nb-select>
                    </div>
                    <div>
                      <label class="label">Lenguaje</label><br>
                       <nb-select placeholder="Idioma"  size="small" [selected]="'ES'">
                          <nb-option value="EN">Ingles</nb-option>
                          <nb-option value="ES">Español</nb-option>
                        </nb-select>
                    </div>
                  </nb-card-body>
                  <br>
                  <div class="text-center">
                      <button nbButton outline size="tiny" ghost (click)="close()">
                        Cerrar
                      </button>&nbsp;
                      <button nbButton outline size="tiny" hero status="primary">
                        Guardar
                      </button>
                    </div>
                </nb-card>
              </ng-template>
            </nb-action>
            <nb-action>
              <div [nbPopover]="templat" nbPopoverPlacement="bottom">
                <img src="https://image.flaticon.com/icons/png/512/197/197593.png" height="20px" alt="">
              </div>
              <ng-template #templat >
                <nb-card style="padding-bottom: 0px;">
                  <nb-card-header style="padding-top: 8px; padding-bottom: 8px;">
                    Cambiar idioma
                  </nb-card-header>
                  <nb-card-body style="padding-top: 3px; padding-bottom: 0px;">
                    <div>
                      <label class="label">Lenguaje</label><br>
                       <nb-select placeholder="Idioma"  size="small" [selected]="'ES'">
                          <nb-option value="EN">Ingles</nb-option>
                          <nb-option value="ES">Español</nb-option>
                          <nb-option value="PR">Portugues</nb-option>
                        </nb-select>
                    </div>
                  </nb-card-body>
                  <br>
                  <div class="text-center">
                      <button nbButton outline size="tiny" ghost (click)="close()">
                        Cerrar
                      </button>&nbsp;
                      <button nbButton outline size="tiny" hero status="primary">
                        Guardar
                      </button>
                    </div>
                </nb-card>
              </ng-template>
            </nb-action>
            <nb-action [nbContextMenu]="userMenu">
              <nb-user
                class="header-user"
                [name]="user?.name"
                [title]="user?.email"
                [picture]="user?.profile_photo_url"
                [onlyPicture]="minimum"
                size="large"
              ></nb-user>
            </nb-action>
          </nb-actions>
        </nb-layout-header>
        <nb-sidebar responsive tag="core-sidebar">
          <nb-menu [items]="MENU_ITEMS" tag="core-menu"></nb-menu>
          <nb-sidebar-footer *ngIf="!hidden">
            <nb-toggle
              (checkedChange)="changeTheme($event)"
              *ngIf="!minimum"
            ></nb-toggle>
          </nb-sidebar-footer>
        </nb-sidebar>
        <nb-layout-column class="p-2">
          <router-outlet></router-outlet>
        </nb-layout-column>
      </nb-layout>
    </div>
  `,
  styleUrls: ['./scaffold.component.scss'],
})
export class ScaffoldComponent implements OnInit, OnDestroy {
  // MENU_ITEMS: NbMenuItem[] = [];
  MENU_ITEMS:  NbMenuItem[] = [
    {
      title: 'Inicio',
      icon: 'home-outline',
      link: '/pages/dashboard',
      pathMatch: 'prefix',
    },
    {
      title: 'Agenda',
      icon: 'calendar-outline',
    },
    {
      title: 'Asignaturas',
      icon: 'book-open-outline',
      link: '/pages/asignaturas',
      pathMatch: 'prefix',
    },
    {
      title: 'Tareas',
      icon: 'clipboard-outline',
    },
    {
      title: 'Evaluaciones',
      icon: 'checkmark-circle-outline',
    },
    {
      title: 'Investigacion',
      icon: 'thermometer-outline',
    },
    {
      title: 'Publicaciones',
      icon: 'file-text-outline',
    },
    {
      title: 'Biblioteca',
      icon: 'book-outline',
    },
    {
      title: 'Anuncios',
      icon: 'bell-outline',
    },
  ];
  minimum = false;
  hidden = false;
  user: any;
  userMenu: any[] = [];

  private destroy$: Subject<void> = new Subject<void>();
  spinner = false;
  @ViewChild(NbPopoverDirective) popover: any = NbPopoverDirective;
  constructor(
    private nbTokenService: NbTokenService,
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private nbMenuService: NbMenuService,
    private nbAuthService: NbAuthService,
    private breakpointService: NbMediaBreakpointsService,
    private appService: AppService,
    private tokenService: AppValidateTokenService,
    @Inject(CORE_OPTIONS) protected options: CoreOptions
  ) {}

  ngOnInit(): void {
    this.appService
      .onLoader()
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: boolean) => (this.spinner = status));

    this.user = this.appService.user;
    this.userMenu = this.appService.usernameMenu;
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe((isLessThanXl: boolean) => (this.minimum = isLessThanXl));

    this.nbMenuService
      .onItemClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data.item.subtag === 'logout') {
          this.nbTokenService.clear();
          // lamb
          this.nbAuthService
            .logout(this.options.strategyName)
            .pipe(takeUntil(this.destroy$))
            .subscribe((authResult: NbAuthResult) => {
              if (authResult.isSuccess()) {
                this.tokenService.authorizeLamb();
              }
            });

          // google
          this.nbAuthService
            .logout(this.options.strategyGoogleName)
            .pipe(takeUntil(this.destroy$))
            .subscribe((authResult: NbAuthResult) => {
              if (authResult.isSuccess()) {
                this.tokenService.authorizeGoogle();
              }
            });
            window.location.href = environment.shellApp;
          // window.location.href = '/lamb-patmos/fronts/patmos-upeu-base-front/auth';
        }
      });
  }

  toggle(): void {
    this.hidden = !this.hidden;
    this.sidebarService.toggle(true, 'core-sidebar');
  }

  changeTheme(status: boolean): void {
    this.themeService.changeTheme(status ? 'theme-1-dark' : 'theme-1-default');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  open() {
    this.popover.show();
  }
  close() {
    this.popover.hide();
  }

}
