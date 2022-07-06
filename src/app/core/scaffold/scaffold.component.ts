import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbPopoverDirective,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import {  map, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { NbAuthResult, NbAuthService, NbAuthToken, NbTokenService } from '@nebular/auth';
import { CORE_OPTIONS, CoreOptions } from '../core.options';
import { AppService } from '../state/app.service';
import { AppValidateTokenService } from '../state/app-validate-token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { END_POINTS } from 'src/app/providers/utils';
import { GeneralService } from 'src/app/providers';
import { EmitEventsService } from 'src/app/shared/services/emit-events.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../auth/services/spinner.service';

@Component({
  selector: 'app-scaffold',
  templateUrl: './scaffold.component.html',
  styleUrls: ['./scaffold.component.scss'],
})
export class ScaffoldComponent implements OnInit, OnDestroy {
  // MENU_ITEMS: NbMenuItem[] = [];
  MENU_ITEMS: NbMenuItem[] = [];
  statusSearch: boolean = false;
  minimum = false;
  hidden = false;
  user: any;
  userMenu: any[] = [];

  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }

  private destroy$: Subject<void> = new Subject<void>();
  spinner = false;
  formHeader: any = FormGroup;
  roles: any = [];
  semestres: any = [];
  paramsSessionStorage: any = {
    rol: '',
    semestre: '',
    lenguaje: '',
    persons_student: '',
    persons_teacher: '',
    area: '',
  };
  date = new Date();
  loading: boolean = false;
  @ViewChild(NbPopoverDirective) popover: any = NbPopoverDirective;
  subcript: any = Subscription;
  validBlock: any = { from: '', status: false };

  logoLangs: any = 'assets/spain.svg';

  listLanguages: any = [
    {
      code: 'es',
      img: 'assets/spain.svg',
      name: 'Español',
      id: 1,
    },
    {
      code: 'en',
      img: 'assets/eeuu.svg',
      name: 'Inglés',
      id: 2,
    },
    {
      code: 'pb',
      img: 'assets/brasil.svg',
      name: 'Portugués',
      id: 3,
    },
  ];
  subcrActuMenu: any = Subscription;


  private spinnerSub: Subscription;
  


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
    private router: Router,
    private spinnerService: SpinnerService,
  ) {
    this.spinnerSub = this.onSpinner();
    // console.log(this.router);

  }

  onSpinner(): Subscription {
    return this.spinnerService.onLoader().subscribe((status: boolean) => this.spinner = status);
  }


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
        if (data.item.subtag === 'logout') {

          this.tokenService
            .logout().subscribe(_ => {
              this.nbTokenService.get().subscribe((resp: NbAuthToken) => {
                this.nbAuthService.logout(resp.getOwnerStrategyName())
                .subscribe((authResult: NbAuthResult) => {
                  if (authResult.isSuccess()) {
                    sessionStorage.clear();
                    this.router.navigate([`/auth`]);
                  }
                });
              });
            });
          
        } else if (data.item.subtag === 'profile') {
          this.emitEventsService.profileInfo(true);
          this.router.navigate([`/pages/dashboard`]);
        }
      });

    this.subcript = this.emitEventsService.blockReturns().subscribe(value => {
      // para emitir evento desde la cabecera
      if (value) {
        setTimeout(() => {
          this.validBlock = value;
        }, 1000);
      } else {
        setTimeout(() => {
          this.validBlock = { from: '', status: false };
        }, 1000);
      }
    });

    this.subcrActuMenu = this.emitEventsService.reloadMenuResponse().subscribe(value => { // carga desde el acceso de creación de menus
      if (value) {
        setTimeout(() => {
          this.reloadMenu();
        }, 1000);
      }
    });
  }

  private fieldReactive() {
    const controls = {
      id_rol: ['', [Validators.required]],
      id_semestre: ['', [Validators.required]],
      lenguaje: [''],
      carga: ['1'],
      cambioRol: ['1'],
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
      const typeCalendar = this.appService.user.person.configurationperson.find(
        (b: any) => b.nombre === 'CALENDAR-TYPE'
      );
      const params = {
        type_calendar: typeCalendar ? this.validValueMesSemanaDia(typeCalendar.valor) : 'mes',
      };
      sessionStorage.setItem('configAssign', JSON.stringify(params));
    } else {
      const params = {
        type_calendar: 'mes',
      };
      sessionStorage.setItem('configAssign', JSON.stringify(params));
    }
  }
  validValueMesSemanaDia(value: any) {
    return value === 'mes' ? 'mes' : value === 'semana' ? 'semana' : value === 'dia' ? 'dia' : 'mes';
  }
  toggle(): void {
    this.hidden = !this.hidden;
    this.sidebarService.toggle(true, 'core-sidebar');
  }

  changeTheme(status: boolean): void {
    this.themeService.changeTheme(status ? 'theme-1-default' : 'theme-2-default');
  }

  ngOnDestroy(): void {
    this.spinnerSub.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
    this.subcript.unsubscribe();
    this.subcrActuMenu.unsubscribe();
    
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

    // this.roles = this.appService.rol.filter((rol: any) => ['Estudiante', 'Docente'].includes(rol.name));
    this.roles = this.appService.rol;
    if (this.roles.length > 0) {
      const rolDefault = this.appService.user.person.role_id || '';
      const rolDef = this.roles.find((r: any) => r.id === rolDefault);
      if (rolDef && rolDef.id) {
        this.formHeader.get('id_rol').patchValue(rolDef.id);
        this.paramsSessionStorage.rol = rolDef;
        this.getSemestres(rolDef);
      } else {
        if (val && val.rol) {
          this.formHeader.get('id_rol').patchValue(val.rol.id);
          this.paramsSessionStorage.rol = val.rol;
          this.getSemestres(val.rol);
        } else {
          const rol = this.roles.find((r: any) => r.name === 'Estudiante');
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
  }

  getSemestres(rol: any) {
    const serviceName = END_POINTS.base_back.user + '/mysemesters';
    if (rol && rol.id) {
      this.loading = true;
      this.generalService.nameId$(serviceName, rol.id).subscribe((res: any) => {
        this.semestres = res.data || [];
        if (this.semestres.length > 0) {
          const semester = this.semestres.find((r: any) => r.id === this.appService.semestre.semester);
          if (semester) {
            this.formHeader.patchValue({
              id_semestre: semester.id,
            });
            if (this.formHeader.value.carga === '1') {
              this.updateSemestre(semester, rol);
            }
          } else {
            const semes = this.semestres.find((r: any) => r.vigente === '1');
            if (semes) {
              this.formHeader.patchValue({
                id_semestre: this.semestres.id,
              });
              if (this.formHeader.value.carga === '1') {
                this.updateSemestre(semes, rol);
              }
            } else {
              this.formHeader.patchValue({
                id_semestre: this.semestres[0].id,
              });
              if (this.formHeader.value.carga === '1') {
                this.updateSemestre(this.semestres[0], rol);
              }
            }

          }
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});
    }
  }

  changeRol($event: any) {
    const rol = this.roles.find((r: any) => r.id === $event);
    this.semestres = [];
    this.formHeader.controls['id_semestre'].setValue('');
    this.formHeader.controls['carga'].setValue('2');
    this.formHeader.controls['cambioRol'].setValue('2');
    this.getSemestres(rol);
  }

  changeSemestre() {
    this.formHeader.controls['carga'].setValue('2');
  }

  updateSemestre(value: any, rol?: any) {
    const id = value.id || '';
    const id_rol = rol.id || '';
    const serviceName = END_POINTS.base_back.user + '/updatesemester';
    if (id) {
      this.loading = true;
      const params = {
        url: this.validUrlRouter(this.router.url),
      };

      // console.log(this.router.url);
      this.generalService.addNameIdAndIdData$(serviceName, id, id_rol, params).subscribe(
      // this.generalService.nameIdAndId$(serviceName, id, id_rol).subscribe(
        (data: any) => {
          if (data.success) {
            this.paramsSessionStorage.rol = rol;
            this.paramsSessionStorage.semestre = value;
            this.paramsSessionStorage.lenguaje = (this.appService.user && this.appService.user.lang) || '';
            this.paramsSessionStorage.persons_student = (this.appService.user.person && this.appService.user.person.persons_student) || '';
            this.paramsSessionStorage.persons_teacher = (this.appService.user.person && this.appService.user.person.persons_teacher) || '';
            this.paramsSessionStorage.area = this.appService.area;
            sessionStorage.setItem('rolSemesterLeng', JSON.stringify(this.paramsSessionStorage));
            // this.emitEventsService.valuesRolSem$.emit(this.paramsSessionStorage); //Guardar valores en la cabecera
            this.emitEventsService.enviar(this.paramsSessionStorage);
            this.emitEventsService.asingDatos(this.paramsSessionStorage);

            if(this.formHeader.value.cambioRol === '2') {
              this.reloadMenu();
            }
            if (data && data.data && !data.data.url_valid) {
              this.router.navigate([`/pages/not-found`]);
            }

            this.formHeader.controls['cambioRol'].setValue('1');

            if (this.formHeader.value.carga === '2') {
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
  reloadMenu() {
    this.MENU_ITEMS = [];
    this.appService.getMenus(this.formHeader.value.id_rol);
  }
  validUrlRouter(url:any) {
    const newStr = url.slice(1);
    const valUrl = newStr.split('/') || [];
    const length = valUrl.length || 0;
    let newUrl:any = '';
    switch (true) {
      case (length === 1):
        newUrl = '/' + valUrl[0];
        break;
      case (length === 2):
        newUrl = '/' + valUrl[0] + '/' + valUrl[1];
        break;
      case (length >= 3):
        newUrl = '/' + valUrl[0] + '/' + valUrl[1] + '/' + valUrl[2];
        break;
      default:
        break;
      }
      return newUrl;
    // console.log(url, valUrl, newUrl);
  }

  saveChanges() {
    const object = this.semestres.find((r: any) => r.id === this.formHeader.value.id_semestre);
    const rol = this.roles.find((r: any) => r.id === this.formHeader.value.id_rol);
    if (object && object.id && rol && rol.id) {
      this.updateSemestre(object, rol);

      if (this.validBlock.from === 'Asignaturas' && this.validBlock.status === true) {
        this.router.navigate(['/pages/asignatures']);
      }
    }
  }

  getLanguages() {
    this.formHeader.controls['lenguaje'].setValue(this.appService.user.lang || 'es');
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

  newElements() {
    this.router.navigate(['/pages/manage/element']);
  }
  openSearch(event:any){
    if(!event){
      this.statusSearch = true;
    }else if(event){
      this.statusSearch = false;
    }
  }
  searchElements(event:any){
    if(event.target.value === ''){
      return
    }else{
      console.log(event.target.value)
    }
    setTimeout(() => {
      event.target.value = '';
    },100)
  }

}
