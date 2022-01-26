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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { END_POINTS } from 'src/app/providers/utils';
import { GeneralService } from 'src/app/providers';
import { EmitEventsService } from 'src/app/shared/services/emit-events.service';

@Component({
  selector: 'app-scaffold',
  template: `
    <div
      [nbSpinner]="spinner || loading"
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
                src="assets/logo-upeu-blanco.png"
                alt="Lamb"
                width="180"
              />
            </nb-action>
          </nb-actions>
          <nb-actions>
          <nb-action >
          <!--  -->
          <form [formGroup]="formHeader">
            <button nbButton outline size="small" ghost [nbPopover]="templateRef" nbPopoverPlacement="bottom" nbPopoverTrigger="noop" (click)="open()">
              {{paramsSessionStorage?.rol?.name || 'Sin rol'}} -  {{paramsSessionStorage?.semestre?.nombre || 'Sin semestre'}}
            </button>
              <ng-template #templateRef >
                <nb-card style="padding-bottom: 0px;">
                  <nb-card-header style="padding-top: 8px; padding-bottom: 8px;">
                    Cambiar datos
                  </nb-card-header>
                  <nb-card-body style="padding-top: 3px; padding-bottom: 0px;">
                    <div>
                      <label class="label">Rol</label><br>
                       <nb-select placeholder="Rol"  size="small" formControlName="id_rol" (selectedChange)="changeRol($event)">
                       <nb-option
                          *ngFor="let rol of roles; let i = index"
                          [value]="rol.id"
                          >Cursos - {{ rol.name }}</nb-option>
                        </nb-select>
                    </div>
                    <div>
                      <label class="label">Semestre</label><br>
                       <nb-select placeholder="Semestre"  size="small" formControlName="id_semestre">
                       <nb-option
                          *ngFor="let semestre of semestres; let i = index"
                          [value]="semestre.id"
                          >Semestre - {{ semestre.nombre }}</nb-option
                        >
                        </nb-select>
                    </div>
                  </nb-card-body>
                  <br>
                  <div class="text-center">
                      <button nbButton outline size="tiny" ghost (click)="close()">
                        Cerrar
                      </button>&nbsp;
                      <button nbButton outline size="tiny" hero status="primary" (click)="saveChanges()" [disabled]="formHeader.invalid">
                        Guardar
                      </button>
                    </div>
                </nb-card>
              </ng-template>
              </form>
            </nb-action>
            <nb-action>
            <form [formGroup]="formHeader">
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
                      <nb-radio-group formControlName="lenguaje">
                        <nb-radio value="EN">EE.UU.&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://cdn-icons-png.flaticon.com/512/323/323310.png" height="20px" alt=""></nb-radio>
                        <nb-radio value="ES">ESPAÑA&nbsp;&nbsp;<img src="https://image.flaticon.com/icons/png/512/197/197593.png" height="20px" alt=""></nb-radio>
                        <nb-radio value="PR">BRASIL&nbsp;&nbsp;<img src="https://www.pnguniverse.com/wp-content/uploads/2020/09/Bandera-circular-de-Brasil.png" height="20px" alt=""></nb-radio>
                      </nb-radio-group>
                    </div>
                  </nb-card-body>
                  <br>
                  <div class="text-center">
                      <button nbButton outline size="tiny" hero status="primary">
                        Guardar
                      </button>
                    </div>
                </nb-card>
              </ng-template>
              </form>
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
    // {
    //   title: 'Agenda',
    //   icon: 'calendar-outline',
    // },
    {
      title: 'Asignaturas',
      icon: 'book-open-outline',
      link: '/pages/asignaturas',
      pathMatch: 'prefix',
    },
    // {
    //   title: 'Tareas',
    //   icon: 'clipboard-outline',
    // },
    {
      title: 'Evaluaciones',
      icon: 'checkmark-circle-outline',
    },
    // {
    //   title: 'Investigacion',
    //   icon: 'thermometer-outline',
    // },
    // {
    //   title: 'Publicaciones',
    //   icon: 'file-text-outline',
    // },
    {
      title: 'Biblioteca',
      icon: 'book-outline',
    },
    // {
    //   title: 'Anuncios',
    //   icon: 'bell-outline',
    // },
  ];
  minimum = false;
  hidden = false;
  user: any;
  userMenu: any[] = [];

  private destroy$: Subject<void> = new Subject<void>();
  spinner = false;
  formHeader: any = FormGroup;
  roles: any = [];
  semestres: any = [];
  paramsSessionStorage:any = {
    rol: '',
    semestre: '',
    lenguaje: '',
  }
  loading:boolean = false;
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
    @Inject(CORE_OPTIONS) protected options: CoreOptions,
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
    public emitEventsService: EmitEventsService
  ) {}

  ngOnInit(): void {
    this.fieldReactive();
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
  private fieldReactive() {
    const controls = {
      id_rol: ['', [Validators.required]],
      id_semestre: ['', [Validators.required]],
      lenguaje: ['ES'],
      carga: ['1'],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.getRoles();
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
  //////////////////////////////////
  getRoles() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    let val = JSON.parse(sesion);

    this.roles = this.appService.rol.filter((rol: any) =>
      ['Estudiante', 'Docente'].includes(rol.name)
    );
    if (this.roles.length>0) {

      if (val && val.rol) {
        this.formHeader.get('id_rol').patchValue(val.rol.id);
        this.paramsSessionStorage.rol = val.rol;
        this.getSemestres(val.rol);
      } else {

        const rol = this.roles.find((r:any )=> r.name === 'Estudiante');
        if (rol && rol.id) {
          this.formHeader.get('id_rol').patchValue(rol.id);
          this.getSemestres(rol);
        } else {
          this.formHeader.get('id_rol').patchValue(this.roles[0].id);
          this.getSemestres(this.roles[0]);
        }
        // this.paramsSessionStorage.rol = this.roles[0];
        // sessionStorage.setItem('rolSemesterLeng', JSON.stringify(this.paramsSessionStorage));

      }

    }
  }
  getSemestres(rol:any) {
    const serviceName = END_POINTS.base_back.user + '/mysemesters';
    if (rol && rol.id) {
      this.loading = true;
      this.generalService.nameId$(serviceName, rol.id).subscribe((res:any) => {
        this.semestres = res.data || [];
        if (this.semestres.length>0)  {
          const vigent = this.semestres.find((r:any) => r.vigente === '1');
          if (vigent) {
            this.formHeader.patchValue({
              id_semestre: vigent.id,
            });
            if (this.formHeader.value.carga === '1') {
              this.updateSemestre(vigent, rol);
            } else {
              this.loading = false;
            }
          } else {
            this.formHeader.patchValue({
              id_semestre: this.semestres[0].id,
            });
            if (this.formHeader.value.carga === '1') {
              this.updateSemestre(this.semestres[0], rol);
            } else {
              this.loading = false;
            }

          }
        } else {
          this.loading = false;
        }
       });
    }
  }
  changeRol($event:any) {
    const rol = this.roles.find((r:any )=> r.id === $event);
    this.semestres = [];
    this.formHeader.controls['id_semestre'].setValue('');
    this.formHeader.controls['carga'].setValue('2');
    this.getSemestres(rol);
  }

  // changeSemestre($event:any) {
  //   this.updateSemestre($event);

  // }

  updateSemestre(value:any, rol?:any) {
    const id = value.id || '';
    const serviceName = END_POINTS.base_back.user + '/updatesemester';
    if (id) {
      this.loading = true;
      this.generalService.nameId$(serviceName, id).subscribe((data:any) => {
        if (data.success) {
          this.paramsSessionStorage.rol = rol;
          this.paramsSessionStorage.semestre = value;
          sessionStorage.setItem('rolSemesterLeng', JSON.stringify(this.paramsSessionStorage));
            // this.emitEventsService.valuesRolSem$.emit(this.paramsSessionStorage); //Guardar valores en la cabecera
            this.emitEventsService.enviar(this.paramsSessionStorage);
            this.emitEventsService.asingDatos(this.paramsSessionStorage);
        }
      }, () => { this.loading =false; }, () => { this.loading =false; });
    }
  }
  saveChanges() {
    const object = this.semestres.find((r:any )=> r.id === this.formHeader.value.id_semestre);
    const rol = this.roles.find((r:any )=> r.id === this.formHeader.value.id_rol);
    if (object && object.id && rol && rol.id) {
      this.updateSemestre(object, rol);
    }

  }

}
