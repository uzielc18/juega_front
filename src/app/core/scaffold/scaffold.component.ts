import {Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  NB_WINDOW_DEFAULT_BUTTONS_CONFIG,
  NbDialogService,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbPopoverDirective,
  NbSidebarService,
  NbThemeService,
  NbToastrService,
  NbWindowService,
  NbWindowState,
} from '@nebular/theme';
import {map, takeUntil} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';

import {NbAuthResult, NbAuthService, NbAuthToken, NbTokenService} from '@nebular/auth';
import {CORE_OPTIONS, CoreOptions} from '../core.options';
import {AppService} from '../state/app.service';
import {AppValidateTokenService} from '../state/app-validate-token.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {END_POINTS} from 'src/app/providers/utils';
import {GeneralService} from 'src/app/providers';
import {EmitEventsService} from 'src/app/shared/services/emit-events.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SpinnerService} from '../auth/services/spinner.service';
import {BreakpointObserver} from "@angular/cdk/layout";
import {MSatisfactionComponent} from "../../shared/components/satisfaction/modal/m-satisfaction.component";
import {SseService} from "../../providers/sse.service";
import {MInquiriesComponent} from "../../shared/components/inquiries/modal/m-inquiries.component";
import {NbWindowControlButtonsConfig} from "@nebular/theme/components/window/window.options";

@Component({
  selector: 'app-scaffold',
  templateUrl: './scaffold.component.html',
  styleUrls: ['./scaffold.component.scss',],
})
export class ScaffoldComponent implements OnInit, OnDestroy {
  // MENU_ITEMS: NbMenuItem[] = [];
  chats: any = [];
  messages: any = [];
  eventsSubject: Subject<void> = new Subject<void>();
  closeWindows: boolean = false;
  timeZoneState: boolean = false;
  toogleCompact:any = 'compacted'
  disableCollapse: boolean = false;
  stateSidebar: any;
  responsiveValue: boolean = false;
  responsiveValue2: any;
  relojTime: any;
  timezone: any
  MENU_ITEMS: NbMenuItem[] = [];
  statusSearch: boolean = false;
  minimum = false;
  hidden = false;
  user: any;
  userMenu: any[] = [];
  termino:any;
  notificationCount: any;
  userSimulate: any;

  minimize = true;
  maximize = true;
  fullScreen = false;
  close2 = true;
  @ViewChild('searhEvent') searhEvent: any = ElementRef;
  @ViewChild('searhEvent2') searhEvent2: any = ElementRef;
  @ViewChild('disabledEsc', { read: TemplateRef }) disabledEscTemplate: any =  TemplateRef;

  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }
  get rolSimulate() {
    const sesion: any = sessionStorage.getItem('simulateUser');
    const val = JSON.parse(sesion);
    if (val && val.id) {
      return val;
    } else {
      return '';
    }
  }

  private destroy$: Subject<void> = new Subject<void>();
  spinner = false;
  search:any = new FormControl('')
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
    person: ''
  };
  date = new Date();
  loading: boolean = false;
  @ViewChild(NbPopoverDirective) popover: any = NbPopoverDirective;
  subcript: any = Subscription;
  validBlock: any = { from: '', status: false };

  logoLangs: any = 'assets/spain.svg';
  data: any =[];
  dataPerson: any = [];
  countPerson: any;
  countCourse: any;
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
    private breakpointObserver: BreakpointObserver,
    private appService: AppService,
    private dialogService: NbDialogService,
    private windowService: NbWindowService,
    private tokenService: AppValidateTokenService,
    @Inject(CORE_OPTIONS) protected options: CoreOptions,
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
    public emitEventsService: EmitEventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinnerService: SpinnerService,
    private sseService: SseService,
    private toastrService: NbToastrService,

  ) {
    this.spinnerSub = this.onSpinner();
    // console.log(this.router);

    setInterval( () => {
      this.horaActual();
    }, 1000)

    this.breakpointObserver.observe(['(max-width: 1100px)']).subscribe((result) => {
      console.log(result)
      if(result.matches){
        this.responsiveValue = true;
      }else{
        this.responsiveValue = false;
      }
    })
    this.breakpointObserver.observe(['(max-width: 575px)']).subscribe((result) => {
      console.log(result)
      if(result.matches){
        this.responsiveValue2 = true;
      }else{
        this.responsiveValue2 = false;
      }
    })

  }

  onSpinner(): Subscription {
    return this.spinnerService.onLoader().subscribe((status: boolean) => this.spinner = status);
  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (!this.searhEvent?.nativeElement.contains(event.target) && !this.searhEvent2?.nativeElement.contains(event.target)) {
      // clicked outside => close dropdown list
      this.statusSearch = false;
    }
  }

  ngOnInit(): void {
    this.timeZone();
    this.configurationCollapse()
    this.setConfiguartion();
    this.fieldReactive();
    this.appService.configurations.filter((f: any) => {
      if(f.nombre === 'NOTIFICATION'){
        this.notificationCount = f.valor
      }
    })
    this.appService
      .onLoader()
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: boolean) => (this.spinner = status));

    this.userSimulate = this.appService.usersimular;
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
          this.loading = true;
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
            }, () => {this.loading = false}, () => this.loading = false);

        } else if (data.item.subtag === 'profile') {
          //this.emitEventsService.profileInfo(true);
          this.router.navigate([`/pages/user/perfil/${this.user.email}`]);
          this.emitEventsService.enviarEmail(`${this.user.email}`);
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
    //this.countNotifications();

  }

  smartSupp(){
    var script = document.createElement('script');
    script.src = "assets/smartSupp/cargarChat.js";
    document.head.appendChild(script);
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
        type_calendar: typeCalendar ? this.validValueMesSemanaDia(typeCalendar?.valor) : 'mes',
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
    this.breakpointObserver.observe(['(max-width: 900px)']).subscribe((result) => {
      if(result.matches){
        this.statusSearch = false
        this.search.value = '';
        this.data = [];
      }
    })
    this.appService.user?.person?.configurationperson.find((f: any) => {
        if(f.nombre === 'MENU-COLLAPSE'){
          const serviceName = END_POINTS.base_back.config + '/configurationperson';
          const params = {
            valor: this.stateSidebar === 'compacted'? '0': '1'
          }
          this.generalService.updateNameIdData$(serviceName, f.id, params).subscribe(res => {
            console.log(res)
          })
        }
    })
    this.hidden = !this.hidden;
    this.sidebarService.toggle(true, 'core-sidebar');
  }
  configurationCollapse(){
    this.appService.user?.person?.configurationperson.find((f: any) => {
      if(f.nombre === 'MENU-COLLAPSE'){
        if(f.valor == "1"){
          this.stateSidebar = 'compacted'
        }else{
          this.stateSidebar = 'expanded'
        }
      }
    })
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
      const rolDefault = this.appService.user.person.id_select || '';
      const rolDef = this.roles.find((r: any) => r.id_select === rolDefault);
      if (rolDef && rolDef.id_select) {
        this.formHeader.get('id_rol').patchValue(rolDef);
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
    const rol = this.roles.find((r: any) => r.id_select === $event.id_select);
    this.semestres = [];
    this.formHeader.controls['id_rol'].setValue($event);
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
    const id_rol_area = rol?.id_area_rol || 0

    const serviceName = END_POINTS.base_back.user + '/updatesemester';
    if (id) {
      this.loading = true;
      const params = {
        url: this.validUrlRouter(this.router.url),
      };

      // console.log(this.router.url);
      this.generalService.addNameIdAndIdAndIdData$(serviceName, id, id_rol, id_rol_area, params).subscribe(
      // this.generalService.nameIdAndId$(serviceName, id, id_rol).subscribe(
        (data: any) => {
          if (data.success) {
            if(this.rolSemestre.rol?.name === 'Estudiante'){
              this.satisfaction();
            }

            this.paramsSessionStorage.rol = rol;
            this.paramsSessionStorage.semestre = value;
            this.paramsSessionStorage.lenguaje = (this.appService.user && this.appService.user.lang) || '';
            this.paramsSessionStorage.persons_student = (this.appService.user.person && this.appService.user.person.persons_student) || '';
            this.paramsSessionStorage.persons_teacher = (this.appService.user.person && this.appService.user.person.persons_teacher) || '';
            this.paramsSessionStorage.area = this.appService.area;
            const obj = {
              nombres_completos: this.appService.user.person.nombres_completos,
              codigo: this.appService.user.person.codigo
            }
            this.paramsSessionStorage.person = obj || '';
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

            this.appService.configurations.filter((f: any) => {
              if(f.nombre === 'ENCUESTA'){
                if(f.valor === '1' && (this.rolSemestre.rol?.name === 'Estudiante' || this.rolSemestre.rol?.name === 'Docente')){
                  this.mInquiries();
                }
              }
            })

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
    this.appService.getMenus(this.formHeader.value.id_rol.id);
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
    const rol = this.roles.find((r: any) => r.id_select === this.formHeader.value.id_rol.id_select);
    if (object && object.id && rol && rol.id_select) {
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
  searchClicOpen(event:any){
    if(!event){
      this.statusSearch = true;
    }
  }
  caculateTime(fecha: any){
    const fecha_inicio = new Date(fecha).getTime();
    const nowDate = new Date().getTime();
    const gap = nowDate - fecha_inicio;
    return gap
  }
  padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }

  convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000) || 0;
    let minutes = Math.floor(seconds / 60) || 0;
    let hours = Math.floor(minutes / 60) || 0;
    let days = Math.floor(hours / 24) || 0;
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
   // console.log(`${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`)
    //return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`;
      if(minutes <= 3 ){
        return 'online'
      }else{
        return `${this.padTo2Digits(days)} ${this.padTo2Digits(days) === '1' ? 'dia.' : 'dias.'} y
      ${this.padTo2Digits(hours)} ${this.padTo2Digits(hours) === '1' ? 'hora.' : 'horas.'}`
      }

  }
  searchEnter(event:any){
    const serviceName = 'search';
    const params = {
      q: this.search.value
    }
    if(event.target.value === ''){
      return
    }else{
      this.loading = true
      this.generalService.nameParams$(serviceName, params).subscribe((res:any) => {
        this.dataPerson = res.data;
        this.dataPerson.map((resp:any) => {
          resp.hora = this.convertMsToTime(this.caculateTime(resp.info_fecha))
        })
        this.data = res.data.slice(0, 15);
        this.countPerson = this.dataPerson.filter((x: any) => {
          return x.tipo == 'persona'
        }).length;
        this.countCourse = this.dataPerson.filter((x: any) => {
          return x.tipo == 'cursos'
        }).length;
      }, ()=> {this.loading = false}, ()=>{this.loading = false});
    }
    setTimeout(() => {
      //event.target.value = '';
      //this.search.setValue('');
    },100)
  }
  resetInput(){
    this.search.setValue('');
    this.data = [];
    this.countCourse = ''
    this.countPerson = ''
  }
  urlEvent(item: any){
    this.statusSearch = false
    this.search.setValue('');
    this.data = [];
    if(item.url){
      this.router.navigate([item.url], {relativeTo: this.activatedRoute.parent});
      if(item.tipo === 'persona'){
        this.emitEventsService.enviarEmail(item.id_url);
      }
      if(item.tipo === 'cursos'){
        this.emitEventsService.enviarCurso(item.id_url);
      }

      //this.emitEventsService.reloadMenuEmit(true);
    }

    }
  satisfaction(){
    const serviceName = 'sin-perception-count';
    const user = this.appService.user.person;
    const today = new Date();
    let date = today.toISOString().split('T')[0];
    let hour = today.getHours();
    let sec = today.getMinutes();
    let fullHour = hour +':'+ sec
    this.generalService.nameIdAndIdAndIdAndId$(serviceName, user.id, user.codigo, date, fullHour).subscribe(res => {
        if(res.data.success !== 0){
          this.dialogService.open(MSatisfactionComponent, {
            dialogClass: 'dialog-limited-height',
            context: {
              item: '',
            },
            closeOnBackdropClick: false,
            closeOnEsc: false,
          })
            .onClose.subscribe(result => {
              if (result === 'ok') {
            }
          });
        }
    });

  }
  mInquiries(){

    const serviceName = 'instrumentos';
    let valor: boolean = false;
    const params = {
      id_persona: this.appService.user.person.id_persona
    }
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      if(res.data.length > 0){
      res.data.filter((f: any) => {
        if(f.codigo_estado === 'PENDIENTE'){
          valor = true
        }
      })
      if(valor){
        this.dialogService.open(MInquiriesComponent, {
          dialogClass: 'dialog-limited-height',
          context: {
            infoUser: this.appService.user.person.id_persona
          },
          closeOnBackdropClick: false,
          closeOnEsc: false,
        })
          .onClose.subscribe(result => {
          if (result === 'ok') {
          }
        });
      }
      }
    })
  }
  countNotifications(){
    const serviceName =  'notifications-users/' + this.appService.user.id
    this.generalService.pollNotification(serviceName).subscribe((res: any) =>{
      this.notificationCount = res.data.total
      if(res.success){
      }
    })
  }

  logoutSimular(){
    this.loading = true;
    const serviceName = END_POINTS.base_back.configurations + '/simular';
    const data = {
      estado: '2'
    }
    this.generalService.updateNameIdData$(serviceName, this.rolSimulate?.id, data).subscribe((res: any) => {
      if(res.success){
        this.updateToken();
      }
    }, () => {this.loading = false},() => {this.loading = false});
  }
  updateToken(){
    // @ts-ignore
    const token = JSON.parse(localStorage.getItem('__lamb_learning_token'))
    let value = JSON.parse(token.value);
    value.access_token = this.rolSimulate.access_token
    token.value = JSON.stringify(value)
    localStorage.setItem('__lamb_learning_token',JSON.stringify(token));
    sessionStorage.removeItem('simulateUser');
    window.location.reload();
  }
  horaActual(){
    const countDate = new Date();
    let hora: any = countDate.getHours();
    let minuto: any  = countDate.getMinutes();
    let segundo: any  = countDate.getSeconds();
    let meridiano: any  = "AM";

    if(hora > 12) {
      hora = hora - 12;
      meridiano = ' pm';
    }
    if(hora < 10) { hora = '0' + hora; }
    if(minuto < 10) { minuto = '0' + minuto; }
    if(segundo < 10) { segundo = '0' + segundo; }
    this.relojTime = hora + ":" + minuto + " " + meridiano;
  }
  timeZone(){

    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const aryIannaTimeZones = [
      'Europe/Andorra',
      'Asia/Dubai',
      'Asia/Kabul',
      'Europe/Tirane',
      'Asia/Yerevan',
      'Antarctica/Casey',
      'Antarctica/Davis',
      'Antarctica/DumontDUrville', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
      'Antarctica/Mawson',
      'Antarctica/Palmer',
      'Antarctica/Rothera',
      'Antarctica/Syowa',
      'Antarctica/Troll',
      'Antarctica/Vostok',
      'America/Argentina/Buenos_Aires',
      'America/Argentina/Cordoba',
      'America/Argentina/Salta',
      'America/Argentina/Jujuy',
      'America/Argentina/Tucuman',
      'America/Argentina/Catamarca',
      'America/Argentina/La_Rioja',
      'America/Argentina/San_Juan',
      'America/Argentina/Mendoza',
      'America/Argentina/San_Luis',
      'America/Argentina/Rio_Gallegos',
      'America/Argentina/Ushuaia',
      'Pacific/Pago_Pago',
      'Europe/Vienna',
      'Australia/Lord_Howe',
      'Antarctica/Macquarie',
      'Australia/Hobart',
      'Australia/Currie',
      'Australia/Melbourne',
      'Australia/Sydney',
      'Australia/Broken_Hill',
      'Australia/Brisbane',
      'Australia/Lindeman',
      'Australia/Adelaide',
      'Australia/Darwin',
      'Australia/Perth',
      'Australia/Eucla',
      'Asia/Baku',
      'America/Barbados',
      'Asia/Dhaka',
      'Europe/Brussels',
      'Europe/Sofia',
      'Atlantic/Bermuda',
      'Asia/Brunei',
      'America/La_Paz',
      'America/Noronha',
      'America/Belem',
      'America/Fortaleza',
      'America/Recife',
      'America/Araguaina',
      'America/Maceio',
      'America/Bahia',
      'America/Sao_Paulo',
      'America/Campo_Grande',
      'America/Cuiaba',
      'America/Santarem',
      'America/Porto_Velho',
      'America/Boa_Vista',
      'America/Manaus',
      'America/Eirunepe',
      'America/Rio_Branco',
      'America/Nassau',
      'Asia/Thimphu',
      'Europe/Minsk',
      'America/Belize',
      'America/St_Johns',
      'America/Halifax',
      'America/Glace_Bay',
      'America/Moncton',
      'America/Goose_Bay',
      'America/Blanc-Sablon',
      'America/Toronto',
      'America/Nipigon',
      'America/Thunder_Bay',
      'America/Iqaluit',
      'America/Pangnirtung',
      'America/Atikokan',
      'America/Winnipeg',
      'America/Rainy_River',
      'America/Resolute',
      'America/Rankin_Inlet',
      'America/Regina',
      'America/Swift_Current',
      'America/Edmonton',
      'America/Cambridge_Bay',
      'America/Yellowknife',
      'America/Inuvik',
      'America/Creston',
      'America/Dawson_Creek',
      'America/Fort_Nelson',
      'America/Vancouver',
      'America/Whitehorse',
      'America/Dawson',
      'Indian/Cocos',
      'Europe/Zurich',
      'Africa/Abidjan',
      'Pacific/Rarotonga',
      'America/Santiago',
      'America/Punta_Arenas',
      'Pacific/Easter',
      'Asia/Shanghai',
      'Asia/Urumqi',
      'America/Bogota',
      'America/Costa_Rica',
      'America/Havana',
      'Atlantic/Cape_Verde',
      'America/Curacao',
      'Indian/Christmas',
      'Asia/Nicosia',
      'Asia/Famagusta',
      'Europe/Prague',
      'Europe/Berlin',
      'Europe/Copenhagen',
      'America/Santo_Domingo',
      'Africa/Algiers',
      'America/Guayaquil',
      'Pacific/Galapagos',
      'Europe/Tallinn',
      'Africa/Cairo',
      'Africa/El_Aaiun',
      'Europe/Madrid',
      'Africa/Ceuta',
      'Atlantic/Canary',
      'Europe/Helsinki',
      'Pacific/Fiji',
      'Atlantic/Stanley',
      'Pacific/Chuuk',
      'Pacific/Pohnpei',
      'Pacific/Kosrae',
      'Atlantic/Faroe',
      'Europe/Paris',
      'Europe/London',
      'Asia/Tbilisi',
      'America/Cayenne',
      'Africa/Accra',
      'Europe/Gibraltar',
      'America/Godthab',
      'America/Danmarkshavn',
      'America/Scoresbysund',
      'America/Thule',
      'Europe/Athens',
      'Atlantic/South_Georgia',
      'America/Guatemala',
      'Pacific/Guam',
      'Africa/Bissau',
      'America/Guyana',
      'Asia/Hong_Kong',
      'America/Tegucigalpa',
      'America/Port-au-Prince',
      'Europe/Budapest',
      'Asia/Jakarta',
      'Asia/Pontianak',
      'Asia/Makassar',
      'Asia/Jayapura',
      'Europe/Dublin',
      'Asia/Jerusalem',
      'Asia/Kolkata',
      'Indian/Chagos',
      'Asia/Baghdad',
      'Asia/Tehran',
      'Atlantic/Reykjavik',
      'Europe/Rome',
      'America/Jamaica',
      'Asia/Amman',
      'Asia/Tokyo',
      'Africa/Nairobi',
      'Asia/Bishkek',
      'Pacific/Tarawa',
      'Pacific/Enderbury',
      'Pacific/Kiritimati',
      'Asia/Pyongyang',
      'Asia/Seoul',
      'Asia/Almaty',
      'Asia/Qyzylorda',
      'Asia/Qostanay', // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
      'Asia/Aqtobe',
      'Asia/Aqtau',
      'Asia/Atyrau',
      'Asia/Oral',
      'Asia/Beirut',
      'Asia/Colombo',
      'Africa/Monrovia',
      'Europe/Vilnius',
      'Europe/Luxembourg',
      'Europe/Riga',
      'Africa/Tripoli',
      'Africa/Casablanca',
      'Europe/Monaco',
      'Europe/Chisinau',
      'Pacific/Majuro',
      'Pacific/Kwajalein',
      'Asia/Yangon',
      'Asia/Ulaanbaatar',
      'Asia/Hovd',
      'Asia/Choibalsan',
      'Asia/Macau',
      'America/Martinique',
      'Europe/Malta',
      'Indian/Mauritius',
      'Indian/Maldives',
      'America/Mexico_City',
      'America/Cancun',
      'America/Merida',
      'America/Monterrey',
      'America/Matamoros',
      'America/Mazatlan',
      'America/Chihuahua',
      'America/Ojinaga',
      'America/Hermosillo',
      'America/Tijuana',
      'America/Bahia_Banderas',
      'Asia/Kuala_Lumpur',
      'Asia/Kuching',
      'Africa/Maputo',
      'Africa/Windhoek',
      'Pacific/Noumea',
      'Pacific/Norfolk',
      'Africa/Lagos',
      'America/Managua',
      'Europe/Amsterdam',
      'Europe/Oslo',
      'Asia/Kathmandu',
      'Pacific/Nauru',
      'Pacific/Niue',
      'Pacific/Auckland',
      'Pacific/Chatham',
      'America/Panama',
      'America/Lima',
      'Pacific/Tahiti',
      'Pacific/Marquesas',
      'Pacific/Gambier',
      'Pacific/Port_Moresby',
      'Pacific/Bougainville',
      'Asia/Manila',
      'Asia/Karachi',
      'Europe/Warsaw',
      'America/Miquelon',
      'Pacific/Pitcairn',
      'America/Puerto_Rico',
      'Asia/Gaza',
      'Asia/Hebron',
      'Europe/Lisbon',
      'Atlantic/Madeira',
      'Atlantic/Azores',
      'Pacific/Palau',
      'America/Asuncion',
      'Asia/Qatar',
      'Indian/Reunion',
      'Europe/Bucharest',
      'Europe/Belgrade',
      'Europe/Kaliningrad',
      'Europe/Moscow',
      'Europe/Simferopol',
      'Europe/Kirov',
      'Europe/Astrakhan',
      'Europe/Volgograd',
      'Europe/Saratov',
      'Europe/Ulyanovsk',
      'Europe/Samara',
      'Asia/Yekaterinburg',
      'Asia/Omsk',
      'Asia/Novosibirsk',
      'Asia/Barnaul',
      'Asia/Tomsk',
      'Asia/Novokuznetsk',
      'Asia/Krasnoyarsk',
      'Asia/Irkutsk',
      'Asia/Chita',
      'Asia/Yakutsk',
      'Asia/Khandyga',
      'Asia/Vladivostok',
      'Asia/Ust-Nera',
      'Asia/Magadan',
      'Asia/Sakhalin',
      'Asia/Srednekolymsk',
      'Asia/Kamchatka',
      'Asia/Anadyr',
      'Asia/Riyadh',
      'Pacific/Guadalcanal',
      'Indian/Mahe',
      'Africa/Khartoum',
      'Europe/Stockholm',
      'Asia/Singapore',
      'America/Paramaribo',
      'Africa/Juba',
      'Africa/Sao_Tome',
      'America/El_Salvador',
      'Asia/Damascus',
      'America/Grand_Turk',
      'Africa/Ndjamena',
      'Indian/Kerguelen',
      'Asia/Bangkok',
      'Asia/Dushanbe',
      'Pacific/Fakaofo',
      'Asia/Dili',
      'Asia/Ashgabat',
      'Africa/Tunis',
      'Pacific/Tongatapu',
      'Europe/Istanbul',
      'America/Port_of_Spain',
      'Pacific/Funafuti',
      'Asia/Taipei',
      'Europe/Kiev',
      'Europe/Uzhgorod',
      'Europe/Zaporozhye',
      'Pacific/Wake',
      'America/New_York',
      'America/Detroit',
      'America/Kentucky/Louisville',
      'America/Kentucky/Monticello',
      'America/Indiana/Indianapolis',
      'America/Indiana/Vincennes',
      'America/Indiana/Winamac',
      'America/Indiana/Marengo',
      'America/Indiana/Petersburg',
      'America/Indiana/Vevay',
      'America/Chicago',
      'America/Indiana/Tell_City',
      'America/Indiana/Knox',
      'America/Menominee',
      'America/North_Dakota/Center',
      'America/North_Dakota/New_Salem',
      'America/North_Dakota/Beulah',
      'America/Denver',
      'America/Boise',
      'America/Phoenix',
      'America/Los_Angeles',
      'America/Anchorage',
      'America/Juneau',
      'America/Sitka',
      'America/Metlakatla',
      'America/Yakutat',
      'America/Nome',
      'America/Adak',
      'Pacific/Honolulu',
      'America/Montevideo',
      'Asia/Samarkand',
      'Asia/Tashkent',
      'America/Caracas',
      'Asia/Ho_Chi_Minh',
      'Pacific/Efate',
      'Pacific/Wallis',
      'Pacific/Apia',
      'Africa/Johannesburg'
    ];

    console.log(this.timezone)
    aryIannaTimeZones.find((f: any) => {
      if(f === this.timezone){
        this.timezone = f
      }else{
        this.timezone = 'America/Lima';
      }
    })
   /* if(this.appService?.user?.timezone !== this.timezone){
      const serviceName = 'users';
      const body = {
        timezone: this.timezone,
      }
      this.generalService.updateNameIdData$(serviceName, this.appService?.user?.id, body).subscribe(res => {
          if(res.success){
            this.toastrService.info(status, `Actualizando tu zona horaria`);
            setTimeout(() => {
              window.location.reload();
            }, 5000)

          }
      })
    }*/

  }
  toggleCompact(){
    this.sidebarService.toggle(true, 'right');
    if(this.toogleCompact == 'compacted'){

    }
  }
  dashboard(){
    this.router.navigate(['./pages/dashboard']);
  }

  opTimeZone(){
    this.timeZoneState = !this.timeZoneState;
  }
  cambiarZoneHorariaSistema() {
      const serviceName = 'users';
      const body = {
        timezone: this.timezone,
      }
      this.loading = true
      this.generalService.updateNameIdData$(serviceName, this.appService?.user?.id, body).subscribe(res => {
        if (res.success) {
          this.timezone = this.user?.timezone;
          this.toastrService.info(status, `Actualizando tu zona horaria`);
          setTimeout(() => {
            window.location.reload();
          }, 5000)

        }
      },() => {this.loading = true}, () => {this.loading = true})
  }
  cambiarZoneHorariaEquipo(){
    this.loading = true
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.toastrService.info(status, `Actualizando tu zona horaria`);
    setTimeout(() => {
      window.location.reload();
    }, 5000)
  }
  openWindowWithoutBackdrop(item: any){
    console.log(this.windowService)
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: this.minimize,
      maximize: this.maximize,
      fullScreen: this.fullScreen,

    };
      this.windowService.open(
        this.disabledEscTemplate,
        {
          title: item.nombre,
          hasBackdrop: false,
          closeOnEsc: false,
          initialState: NbWindowState.MAXIMIZED,
          buttons: buttonsConfig},


      ).onClose.subscribe( () => {
        this.emitEventToChild(item)
      })

    this.getHistoryChat(item)
  }
  eventOpenChat(event: any){
      this.chats = [];
      this.messages = [];
      this.chats.push(event);
      console.log(this.chats)
      this.openWindowWithoutBackdrop(event)

  }
  emitEventToChild(a: any) {
    this.eventsSubject.next(a);
  }
  getHistoryChat(item: any){
    const serviceName = 'chats';
    const params = {
      person_id: this.user?.person?.id,
      person_send_id: item.firend_id
    }
    this.generalService.nameParams$(serviceName, params).subscribe(res => {

      res.data.data.forEach((m: any) => {
        const obj = {
          text: m.mensaje,
          reply: m.reply === 0? false: true,
          user: {
            name: m.nombre
          }
        }
        this.messages.push(obj);
      })
      this.chats.map((m: any) => {
        m.messages = this.messages
      })
    })
  }
}
