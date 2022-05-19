import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbPopoverDirective,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import {delay, map, startWith, takeUntil} from 'rxjs/operators';
import {forkJoin, Observable, of, Subject, Subscription} from 'rxjs';

import {
  NbAuthResult,
  NbAuthService, NbAuthToken,
  NbTokenService,
} from '@nebular/auth';
import {CORE_OPTIONS, CoreOptions} from '../core.options';
import {AppService} from '../state/app.service';
import {AppValidateTokenService} from '../state/app-validate-token.service';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {END_POINTS} from 'src/app/providers/utils';
import {GeneralService} from 'src/app/providers';
import {EmitEventsService} from 'src/app/shared/services/emit-events.service';
import {Router} from '@angular/router';

@Component({
  selector: "app-scaffold",
  templateUrl: "./scaffold.component.html",
  styleUrls: ["./scaffold.component.scss"],
})
export class ScaffoldComponent implements OnInit, OnDestroy {
  // MENU_ITEMS: NbMenuItem[] = [];
  MENU_ITEMS: NbMenuItem[] = [
    {
      title: "Inicio",
      icon: "home-outline",
      link: "/pages/dashboard",
      pathMatch: "prefix",
    },
    {
      title: "Asignaturas",
      icon: "book-open-outline",
      link: "/pages/asignatures",
      pathMatch: "prefix",
    },
    {
      title: "Actividades",
      icon: "edit-2-outline",
      link: "/pages/activities",
      pathMatch: "prefix",
    },
    {
      title: "Evaluaciones",
      icon: "checkmark-circle-outline",
      link: "/pages/evaluations",
      pathMatch: "prefix",
    },
    // {
      // title: "Evaluaciones (Docente)",
      // icon: "checkmark-circle-outline",
      // link: "/pages/evaluations-teacher",
      // hidden: this.rolSemestre.rol.name === "Docente" ? false : true,
      // pathMatch: "prefix",
    // },
    {
      title: "Rúbricas",
      icon: "file-text-outline",
      link: "/pages/rubrics",
      pathMatch: "prefix",
    },
   {
      title: "Mi calendario",
      icon: "calendar-outline",
      link: "/pages/my-calendar",
      pathMatch: "prefix",
    },
    {
      title: "Biblioteca",
      icon: "book-outline",
    },
    // {
    //   title: "Exámen",
    //   icon: "clipboard-outline",
    //   link: "/exam",
    //   pathMatch: "prefix",
    // },
    {
      title: "Administrar",
      icon: "settings-outline",
      link: "/pages/manage",
      pathMatch: "prefix",
      children: [
        {
          title: "Sincronización",
          icon: "sync-outline",
          link: "/pages/manage/lamb-sync",
          pathMatch: "prefix",
        },
        {
          title: "Zoom",
          icon: "video-outline",
          link: "/pages/manage/zoom",
          pathMatch: "prefix",
        },
        {
          title: "Cursos",
          icon: "shopping-bag-outline",
          link: "/pages/manage/course",
          pathMatch: "prefix",
        },
        {
          title: "Docentes",
          icon: "person-outline",
          link: "/pages/manage/teacher",
          pathMatch: "prefix",
        },
        {
          title: "Estudiantes",
          icon: "people-outline",
          link: "/pages/manage/student",
          pathMatch: "prefix",
        },
        {
          title: "Configuraciones",
          icon: "settings-outline",
          link: "/pages/manage/configuration",
          pathMatch: "prefix",
        },
        {
          title: "Noticias",
          icon: "bell-outline",
          link: "/pages/manage/news",
          pathMatch: "prefix",
        },
      ],
    },
  ];
  minimum = false;
  hidden = false;
  user: any;
  userMenu: any[] = [];

  get rolSemestre() {
    const sesion: any = sessionStorage.getItem("rolSemesterLeng");
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return "";
    }
  }

  private destroy$: Subject<void> = new Subject<void>();
  spinner = false;
  formHeader: any = FormGroup;
  roles: any = [];
  semestres: any = [];
  paramsSessionStorage: any = {
    rol: "",
    semestre: "",
    lenguaje: "",
    persons_student: "",
    persons_teacher: "",
    area: "",
  };
  date = new Date();
  loading: boolean = false;
  @ViewChild(NbPopoverDirective) popover: any = NbPopoverDirective;
  subcript: any = Subscription;
  validBlock: any = { from: "", status: false };

  logoLangs: any = "assets/spain.svg";

  listLanguages: any = [
    {
      code: "es",
      img: "assets/spain.svg",
      name: "Español",
      id: 1,
    },
    {
      code: "en",
      img: "assets/eeuu.svg",
      name: "Inglés",
      id: 2,
    },
    {
      code: "pb",
      img: "assets/brasil.svg",
      name: "Portugués",
      id: 3,
    },
  ];

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
    public emitEventsService: EmitEventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setConfiguartion();
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
        if (data.item.subtag === "logout") {
          this.loading = true;
          // this.appService.start();
          this.tokenService
            .logout()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (value: any) => {
                if (value.hasOwnProperty("success") && value.success) {
                  this.nbAuthService
                    .getToken()
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((value: NbAuthToken) => {
                      if (["lamb"].includes(value.getOwnerStrategyName())) {
                        // lamb
                        this.tokenService
                          .logoutLamb()
                          .pipe(takeUntil(this.destroy$))
                          .subscribe(
                            (result: any) => {
                              if (result && result.hasOwnProperty("logout") && result.logout) {
                                this.nbAuthService
                                  .logout(this.options.strategyName)
                                  .pipe(takeUntil(this.destroy$))
                                  .subscribe((authResult: NbAuthResult) => {
                                    if (authResult.isSuccess()) {
                                      // this.appService.stop();
                                      sessionStorage.removeItem('rolSemesterLeng');
                                      sessionStorage.removeItem('configAssign');
                                      this.router.navigate([`/auth`]);
                                      // window.location.href = environment.shellApp;
                                    }
                                  });
                              } else {
                                this.loading = false;
                                // this.appService.stop();
                              }
                            },
                            () => {
                              this.nbAuthService
                                .logout(this.options.strategyName)
                                .pipe(takeUntil(this.destroy$))
                                .subscribe((authResult: NbAuthResult) => {
                                  if (authResult.isSuccess()) {
                                    // this.appService.stop();
                                    sessionStorage.removeItem('rolSemesterLeng');
                                    sessionStorage.removeItem('configAssign');
                                    this.router.navigate([`/auth`]);
                                    // window.location.href = environment.shellApp;
                                  }
                                });
                              this.loading = false;
                            },
                            () => {
                              this.loading = false;
                            }
                          );
                      }

                      if (["google"].includes(value.getOwnerStrategyName())) {
                        // google
                        this.nbAuthService
                          .logout(this.options.strategyGoogleName)
                          .pipe(takeUntil(this.destroy$))
                          .subscribe(
                            (authResult: NbAuthResult) => {
                              if (authResult.isSuccess()) {
                                // this.appService.stop();
                                sessionStorage.removeItem('rolSemesterLeng');
                                sessionStorage.removeItem('configAssign');
                                this.router.navigate([`/auth`]);
                                // window.location.href = environment.shellApp;
                              }
                            },
                            () => {
                              this.loading = false;
                            },
                            () => {
                              this.loading = false;
                            }
                          );
                      }
                    });
                } else {
                  this.loading = false;
                  // this.appService.stop();
                }
              },
              () => {
                // this.loading = false;
                // this.appService.stop();
              },
              () => {
                // this.loading = false;
                // this.appService.stop();
              }
            );
        } else if (data.item.subtag === "profile") {
          this.emitEventsService.profileInfo(true);
          setTimeout(() => {
            this.router.navigate([`/pages/dashboard`]);
          }, 500);
        }
      });

    this.subcript = this.emitEventsService.blockReturns().subscribe((value) => {
      // para emitir evento desde la cabecera
      if (value) {
        setTimeout(() => {
          this.validBlock = value;
        }, 1000);
      } else {
        setTimeout(() => {
          this.validBlock = { from: "", status: false };
        }, 1000);
      }
    });
  }

  private fieldReactive() {
    const controls = {
      id_rol: ["", [Validators.required]],
      id_semestre: ["", [Validators.required]],
      lenguaje: [""],
      carga: ["1"],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.getRoles();
    setTimeout(() => {
      this.getLanguages();
    }, 100);
  }
  setConfiguartion() {
    this.user = this.appService.user;
    if (this.appService.user && this.appService.user.person && this.appService.user.person.configurationperson) {
      const typeCalendar = this.appService.user.person.configurationperson.find((b:any) => b.nombre === 'CALENDAR-TYPE');
      const params = {
        type_calendar: typeCalendar ? this.validValueMesSemanaDia(typeCalendar.valor) : 'mes',
      }
      sessionStorage.setItem("configAssign", JSON.stringify(params));
    } else {
      const params = {
        type_calendar: 'mes',
      }
      sessionStorage.setItem("configAssign", JSON.stringify(params));
    }
  }
  validValueMesSemanaDia(value:any) {
    return value === 'mes' ? 'mes' : value === 'semana' ? 'semana' : value === 'dia' ? 'dia' : 'mes';
  }
  toggle(): void {
    this.hidden = !this.hidden;
    this.sidebarService.toggle(true, "core-sidebar");
  }

  changeTheme(status: boolean): void {
    this.themeService.changeTheme(status ? "theme-1-default" : "theme-2-default");
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subcript.unsubscribe();
  }

  open() {
    this.popover.show();
  }

  close() {
    this.popover.hide();
  }

  //////////////////////////////////
  getRoles() {
    const sesion: any = sessionStorage.getItem("rolSemesterLeng");
    let val = JSON.parse(sesion);

    this.roles = this.appService.rol.filter((rol: any) => ["Estudiante", "Docente"].includes(rol.name));
    if (this.roles.length > 0) {
      const rolDefault = this.appService.user.person.role_id || "";
      const rolDef = this.roles.find((r: any) => r.id === rolDefault);
      if (rolDef && rolDef.id) {
        this.formHeader.get("id_rol").patchValue(rolDef.id);
        this.paramsSessionStorage.rol = rolDef;
        this.getSemestres(rolDef);
      } else {
        if (val && val.rol) {
          this.formHeader.get("id_rol").patchValue(val.rol.id);
          this.paramsSessionStorage.rol = val.rol;
          this.getSemestres(val.rol);
        } else {
          const rol = this.roles.find((r: any) => r.name === "Estudiante");
          if (rol && rol.id) {
            this.formHeader.get("id_rol").patchValue(rol.id);
            this.getSemestres(rol);
          } else {
            this.formHeader.get("id_rol").patchValue(this.roles[0].id);
            this.getSemestres(this.roles[0]);
          }
          // this.paramsSessionStorage.rol = this.roles[0];
          // sessionStorage.setItem('rolSemesterLeng', JSON.stringify(this.paramsSessionStorage));
        }
      }
    }
  }

  getSemestres(rol: any) {
    const serviceName = END_POINTS.base_back.user + "/mysemesters";
    if (rol && rol.id) {
      this.loading = true;
      this.generalService.nameId$(serviceName, rol.id).subscribe((res: any) => {
        this.semestres = res.data || [];
        if (this.semestres.length > 0) {
          const semester = this.semestres.find((r: any) => r.vigente === "1");
          if (semester) {
            this.formHeader.patchValue({
              id_semestre: semester.id,
            });
            if (this.formHeader.value.carga === "1") {
              this.updateSemestre(semester, rol);
            } else {
              this.loading = false;
            }
          } else {
            this.formHeader.patchValue({
              id_semestre: this.semestres[0].id,
            });
            if (this.formHeader.value.carga === "1") {
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

  changeRol($event: any) {
    const rol = this.roles.find((r: any) => r.id === $event);
    this.semestres = [];
    this.formHeader.controls["id_semestre"].setValue("");
    this.formHeader.controls["carga"].setValue("2");
    this.getSemestres(rol);
  }

  changeSemestre() {
    this.formHeader.controls["carga"].setValue("2");
  }

  updateSemestre(value: any, rol?: any) {
    const id = value.id || "";
    const id_rol = rol.id || "";
    const serviceName = END_POINTS.base_back.user + "/updatesemester";
    if (id) {
      this.loading = true;
      this.generalService.nameIdAndId$(serviceName, id, id_rol).subscribe(
        (data: any) => {
          if (data.success) {
            this.paramsSessionStorage.rol = rol;
            this.paramsSessionStorage.semestre = value;
            this.paramsSessionStorage.lenguaje = (this.appService.user && this.appService.user.lang) || "";
            this.paramsSessionStorage.persons_student =
              (this.appService.user.person && this.appService.user.person.persons_student) || "";
            this.paramsSessionStorage.persons_teacher =
              (this.appService.user.person && this.appService.user.person.persons_teacher) || "";
            this.paramsSessionStorage.area = this.appService.area;
            sessionStorage.setItem("rolSemesterLeng", JSON.stringify(this.paramsSessionStorage));
            // this.emitEventsService.valuesRolSem$.emit(this.paramsSessionStorage); //Guardar valores en la cabecera
            this.emitEventsService.enviar(this.paramsSessionStorage);
            this.emitEventsService.asingDatos(this.paramsSessionStorage);

            if (this.formHeader.value.carga === "2") {
              this.close();
            }
            // location.reload();
          }
        },
        () => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  saveChanges() {
    const object = this.semestres.find((r: any) => r.id === this.formHeader.value.id_semestre);
    const rol = this.roles.find((r: any) => r.id === this.formHeader.value.id_rol);
    if (object && object.id && rol && rol.id) {
      this.updateSemestre(object, rol);

      if (this.validBlock.from === "Asignaturas" && this.validBlock.status === true) {
        this.router.navigate(["/pages/asignatures"]);
      }
    }
  }

  getLanguages() {
    this.formHeader.controls["lenguaje"].setValue(this.appService.user.lang || "es");
    setTimeout(() => {
      this.changesLangs();
    }, 200);
  }

  changesLangs() {
    const forms = this.formHeader.value;
    this.emitEventsService.setLangsEnviar(forms.lenguaje);
    const logo = this.listLanguages.find((r: any) => r.code === forms.lenguaje);
    if (logo && logo.img) {
      this.logoLangs = logo.img;
    }
  }
}
