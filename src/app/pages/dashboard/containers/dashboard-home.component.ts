import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  perfilInfo: boolean = true;
  view: string = 'mini';
  subscription$: Subscription = new Subscription();

  loading: boolean = false;

  formHeader: any = FormGroup;

  directorio = DIRECTORY.users;
  key_file: any;

  constructor(
    private generalService: GeneralService,
    private userService: AppService,
    private emitEventsService: EmitEventsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.showProfileInfo();
    this.setCollapse();
    this.getUserInfo();
    this.getNews();
    this.fieldReactive();
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
      base64_url: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.key_file = this.userService?.user?.person?.codigo;
  }

  backToProfile() {
    this.perfilInfo = false;
  }

  showProfileInfo() {
    this.subscription$ = this.emitEventsService.profileInfoReturns().subscribe((res: any) => {
      if (res) {
        this.perfilInfo = res;
        console.log(this.perfilInfo);
      }
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
    this.formHeader.controls['base64_url'].setValue('');
    if ($event && $event.archivo) {
      this.formHeader.controls['foto'].setValue($event.nombre);
      this.formHeader.controls['base64_url'].setValue($event.base64);
    }
  }

  getUserInfo() {
    this.userInfo = this.userService;
    const serviceName = END_POINTS.base_back.user + '/perfil';
    const person_id = this.userInfo._user.id;
    const user_id = this.userInfo._user.person.id;
    const params = {
      view: this.view,
    };
    this.generalService.nameIdAndIdParams$(serviceName, person_id, user_id, params).subscribe((res: any) => {
      if (res.success) {
        this.profile = res.data;
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
        });
      }
    });
  }

  getNews() {
    const serviceName = END_POINTS.base_back.user + '/news';
    this.generalService.nameId$(serviceName, this.userService.user.id).subscribe((res: any) => {
      if (res.success) {
        this.newsList = res.data || [];
      }
    });
  }

  saveInfo() {
    const serviceName = END_POINTS.base_back.people;
    const person_id = this.userInfo._user.id;
    const user_id = this.userInfo._user.person.id;
    console.log(person_id, user_id);
    const data = {
      person: {
        genero: this.formHeader.controls['genero'].value,
        nacionalidad: this.formHeader.controls['nacionalidad'].value,
        ubigeo: this.formHeader.controls['ubigeo'].value,
        estado_civil: this.formHeader.controls['estado_civil'].value,
        religion: this.formHeader.controls['religion'].value,
        fecha_nacimiento: this.formHeader.controls['fecha_nacimiento'].value,
        resumen: this.formHeader.controls['presentacion'].value,
        foto: this.formHeader.controls['foto'].value,
      },
      user: {
        email: this.formHeader.controls['correo'].value,
        // profile_photo_path: this.formHeader.controls['base64_url'].value,
      },
    };
    this.generalService.updateNameIdAndIdData$(serviceName, person_id, user_id, data).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
      }
    });
  }

  ngOnDestroy(): void {
    this.perfilInfo = false;
    this.subscription$.unsubscribe();
  }
}
