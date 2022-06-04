import { Component, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AppService } from '../../../core';
import { GeneralService } from '../../../providers';
import { END_POINTS } from '../../../providers/utils';
import { DIRECTORY } from '../../../shared/directorios/directory';
import { EmitEventsService } from '../../../shared/services/emit-events.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  userInfo: any;
  profile: any;

  newsList: any[] = [];
  collapseLeft: boolean = false;
  collapseTop: boolean = false;
  idCollapseTop: number = 0;
  idCollapseLeft: number = 0;

  generoArray: any[] = ['Masculino', 'Femenino'];
  estadoCivilArray: any[] = ['Casado(a)', 'Soltero(a)', 'Divorciado(a)', 'Viudo(a)', 'Separado(a)', 'Conviviente', 'No precisa'];
  religionArray: any[] = [
    'Adventista del Séptimo Día',
    'Católico',
    'Evangélico',
    'Mormón',
    'Pentecostes',
    'Testigo de Jehova',
    'Otro',
    'Ninguno',
  ];

  perfilInfo: boolean = false;
  view: string = 'mini';
  subscription$: any = Subscription;

  loading: boolean = false;

  formHeader: any = FormGroup;
  nombreSubscription: any = Subscription;
  theRolSemestre: any;
  valida: boolean = false;

  directorio: any;
  key_file: any;

  //////////////
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  ///////////////

  constructor(
    private generalService: GeneralService,
    private userService: AppService,
    private emitEventsService: EmitEventsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.emitEventsService.profileInfoReturns().subscribe(value => {
      this.perfilInfo = value;
      // this.getUserInfo();
      // console.log('value', value);
    });

    this.showProfileInfo();
    this.setCollapse();
    this.getUserInfo(this.perfilInfo ? 'full' : 'mini');
    this.getNews();
    this.fieldReactive();
    this.nombreSubscription = this.emitEventsService.returns().subscribe(value => {
      // para emitir evento desde la cabecera
      if (value && value.rol && value.semestre) {
        this.theRolSemestre = value;
        this.valida = true;
        // setTimeout(() => {
        this.getUserInfo(this.perfilInfo ? 'full' : 'mini');
        // }, 1000);
      } else {
        this.valida = false;
      }
    });
    this.recoveryValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.perfilInfo) {
      // console.log('perfilInfo', changes.perfilInfo);
      this.getUserInfo(this.perfilInfo ? 'full' : 'mini');
    }
  }

  recoveryValues() {
    this.emitEventsService.castRolSemester.subscribe(value => {
      if (value && value.rol && value.semestre && !this.valida) {
        this.theRolSemestre = value;
        // setTimeout(() => {
        this.getUserInfo(this.perfilInfo ? 'full' : 'mini');
        // }, 1000);
      }
    });
  }

  private fieldReactive() {
    const controls = {
      codigo: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      ubigeo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]],
      estado_civil: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      presentacion: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      profile_photo_path: ['', [Validators.required]],
      base64_url: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.key_file = this.userService?.user?.person?.codigo;
    this.directorio = DIRECTORY.users + `/${this.userInfo._user.person.codigo}`;
  }

  backToProfile() {
    this.perfilInfo = false;
  }

  showProfileInfo() {
    // console.log('inininininin');
    // this.subscription$ = this.emitEventsService.profileInfoReturns().subscribe((res: any) => {
    //   if (res) {
    //     console.log('res', res);
    //     this.perfilInfo = res;
    //     this.getUserInfo();
    //   }
    // });
    // get value from emitEventsService
    this.subscription$ = this.emitEventsService.profileInfoReturns().subscribe((res: any) => {
      // console.log('res', res);
      // if (res) {
      // this.perfilInfo = res;
      // this.getUserInfo();
      // }
    });
  }

  get isCollapseTop() {
    const sesion = sessionStorage.getItem('collapseTop');
    if (sesion) {
      return sesion;
    } else {
      return '1';
    }
  }

  get isCollapseLeft() {
    const sesion = sessionStorage.getItem('collapseLeft');
    if (sesion) {
      return sesion;
    } else {
      return '1';
    }
  }

  setCollapse() {
    const config = this.userService.user.person.configurationperson;
    this.collapseLeft = config.find((x: any) => x.nombre === 'PERFIL-COLLAPSE').valor === '1' ? true : false;
    this.collapseTop = config.find((x: any) => x.nombre === 'NOTICIAS-COLLAPSE').valor === '1' ? true : false;
    this.idCollapseTop = config.find((x: any) => x.nombre === 'NOTICIAS-COLLAPSE').id;
    this.idCollapseLeft = config.find((x: any) => x.nombre === 'PERFIL-COLLAPSE').id;
  }

  tweakCollapse(direction: any) {
    if (direction === 'top') {
      this.collapseTop = !this.collapseTop;
      sessionStorage.setItem('collapseTop', this.collapseTop ? '1' : '0');
      this.saveCollapse(this.collapseTop, this.idCollapseTop);
    } else if (direction === 'left') {
      this.collapseLeft = !this.collapseLeft;
      sessionStorage.setItem('collapseLeft', this.collapseLeft ? '1' : '0');
      this.saveCollapse(this.collapseLeft, this.idCollapseLeft);
    }
  }

  saveCollapse(collapse: any, id: any) {
    const serviceName = END_POINTS.base_back.config + '/configurationperson';
    const params = {
      valor: collapse ? '1' : '0',
    };
    this.generalService.updateNameIdData$(serviceName, id, params).subscribe((res: any) => {
      if (res.success) {
        this.collapseTop = this.isCollapseTop === '1' ? true : false;
        this.collapseLeft = this.isCollapseLeft === '1' ? true : false;
      }
    });
  }

  fileResult($event: any) {
    this.formHeader.controls['foto'].setValue('');
    this.formHeader.controls['profile_photo_path'].setValue('');
    this.formHeader.controls['base64_url'].setValue('');
    if ($event && $event.archivo) {
      this.formHeader.controls['foto'].setValue($event.nombre);
      this.formHeader.controls['profile_photo_path'].setValue($event.nombre);
      this.formHeader.controls['base64_url'].setValue($event.base64);
    }
  }

  getUserInfo(view: any) {
    this.userInfo = this.userService;
    const serviceName = END_POINTS.base_back.user + '/perfil';
    const person_id = this.userInfo._user.id;
    const user_id = this.userInfo._user.person.id;
    this.loading = true;
    // this.view = view;
    // console.log(this.view);
    const params = {
      view: view,
    };
    this.generalService.nameIdAndIdParams$(serviceName, person_id, user_id, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.profile = res.data;
          // console.log(this.profile);
          this.formHeader.patchValue({
            codigo: this.profile.person.codigo,
            nombre: this.profile.person.nombres,
            apellido_paterno: this.profile.person.apellido_paterno,
            apellido_materno: this.profile.person.apellido_materno,
            dni: this.profile.person.dni,
            correo: this.profile.user.email,
            genero: this.profile.person.genero || '',
            nacionalidad: this.profile.person.nacionalidad || '',
            ubigeo: this.profile.person.ubigeo || '',
            estado_civil: this.profile.person.estado_civil || '',
            religion: this.profile.person.religion || '',
            fecha_nacimiento: new Date(this.profile.person.fecha_nacimiento) || new Date(),
            presentacion: this.profile.person.resumen || '',
            foto: this.profile.person.foto || '',
            profile_photo_path: this.profile.user.profile_photo_path || '',
          });
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

  getNews() {
    const serviceName = END_POINTS.base_back.user + '/news';
    this.generalService.nameId$(serviceName, this.userService.user.id).subscribe((res: any) => {
      if (res.success) {
        this.newsList = res.data || [];
        // console.log(this.newsList);
      }
    });
  }

  saveInfo() {
    const serviceName = END_POINTS.base_back.people;
    const person_id = this.userInfo._user.id;
    // const user_id = this.userInfo._user.person.id;
    this.loading = true;
    const data = {
      person: {
        genero: this.formHeader.controls['genero'].value || '',
        nacionalidad: this.formHeader.controls['nacionalidad'].value || '',
        ubigeo: this.formHeader.controls['ubigeo'].value || '',
        estado_civil: this.formHeader.controls['estado_civil'].value || '',
        religion: this.formHeader.controls['religion'].value || '',
        fecha_nacimiento: this.formHeader.controls['fecha_nacimiento'].value || '',
        resumen: this.formHeader.controls['presentacion'].value || '',
        foto: this.formHeader.controls['foto'].value || '',
      },
      user: {
        email: this.formHeader.controls['correo'].value || '',
        profile_photo_path: this.formHeader.controls['profile_photo_path'].value || '',
        // profile_photo_path: this.formHeader.controls['base64_url'].value,
      },
    };
    this.generalService.updateNameIdData$(serviceName, person_id, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.formHeader.controls['foto'].setValue('');
          this.formHeader.controls['profile_photo_path'].setValue('');
          this.formHeader.controls['base64_url'].setValue('');
          this.getUserInfo(this.perfilInfo ? 'full' : 'mini');
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

  ngOnDestroy(): void {
    this.perfilInfo = false;
    this.subscription$.unsubscribe();
    this.nombreSubscription.unsubscribe();
  }
  syncLamb() {
    const serviceName = END_POINTS.base_back.config + '/get-info-user';
    // const person_id = this.userInfo._user.id;
    const user = this.userInfo._user.usuario_upeu;
    this.loading = true;
    this.generalService.nameParams$(serviceName, {user: user}).subscribe(
      (res: any) => {
        if (res.success) {
          this.getUserInfo(this.perfilInfo ? 'full' : 'mini');
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
