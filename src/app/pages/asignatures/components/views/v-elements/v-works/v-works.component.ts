import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { AppService } from 'src/app/core';
import { GeneralService } from '../../../../../../providers';
import { END_POINTS } from '../../../../../../providers/utils';

@Component({
  selector: 'app-v-works',
  templateUrl: './v-works.component.html',
  styleUrls: ['./v-works.component.scss']
})
export class VWorksComponent implements OnInit {
  elementId: any = this.activatedRoute.snapshot.paramMap.get('id');
  idCargaCursoDocente: any = this.activatedRoute.snapshot.paramMap.get('id_carga_curso_docente');
  element: any = [];
  userInfo: any = [];

  fechaFin: any;

  daysLeft: any;
  hoursLeft: any;
  minutesLeft: any;
  secondsLeft: any;
  expiredDays: any;
  expiredHours: any;
  expiredMinutes: any;
  expiredSeconds: any;

  tiempo_vencido: boolean = false;
  tiempo_calificado: any;

  form: any = FormGroup;
  selectedItem = '3';

  daysMap = {
    '=0': '',
    '=1': '1 dia,',
    'other': '# dias,'
  }

  hoursMap = {
    '=0': '',
    '=1': '1 hora,',
    'other': '# horas,'
  }

  minutesMap = {
    '=0': '',
    '=1': '1 minuto,',
    'other': '# minutos,'
  }

  secondsMap = {
    '=0': '.',
    '=1': '1 segundo.',
    'other': '# segundos.'
  }

  loading: boolean = false;

  constructor(
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: AppService
  ) {
    setInterval(() => {
      this.countdown(this.element?.fecha_fin)
      // console.log(this.tiempo_vencido)
    }, 1000);
  }

  ngOnInit(): void {
    this.getUserInfo();
    this.getElement();
    this.fieldReactive();
  }

  getUserInfo() {
    this.userInfo = this.userService.user;
    // console.log(this.userInfo);
  }

  countdown(fecha_fin: any) {
    const countDate = new Date(fecha_fin).getTime();
    const now = new Date().getTime();
    const left = countDate - now;
    const expired = now - countDate;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    this.daysLeft = Math.floor(left / day);
    this.hoursLeft = Math.floor((left % day) / hour);
    this.minutesLeft = Math.floor((left % hour) / minute);
    this.secondsLeft = Math.floor((left % minute) / second);

    this.expiredDays = Math.floor(expired / day);
    this.expiredHours = Math.floor((expired % day) / hour);
    this.expiredMinutes = Math.floor((expired % hour) / minute);
    this.expiredSeconds = Math.floor((expired % minute) / second);

    if (this.daysLeft <= 0 && this.hoursLeft <= 0 && this.minutesLeft <= 0 && this.secondsLeft <= 0) {
      this.tiempo_vencido = true;
    }
  }

  getElement() {
    const serviceName = END_POINTS.base_back.resourse + '/info-element';
    if (this.elementId) {
      this.loading = true;
      this.generalService.nameId$(serviceName, this.elementId).subscribe((data) => {
        this.element = data.data;
        if (this.element) {
          this.updateBreadcrumb();
          console.log('element content', this.element)
        }
      }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }

  titleCase(str: any) {
    return str
      .split(' ')
      .map((word: any) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  updateBreadcrumb(): void {
    const CE = this.element;
    const curso = CE && CE.course && CE.course.nombre || 'No existe el curso';
    const unidad = CE && CE.topic && CE.topic.unit.orden_unidad || 'No existe la unidad';
    const sesion = CE && CE.topic && CE.topic.orden_tema || 'No existe la sesion'
    const elemento = CE && CE.type_element && this.titleCase(CE.type_element.nombre) || 'No existe tipo elemento';
    const elementoTitulo = CE && CE.titulo || 'No existe titulo';

    const breadcrumbs = [
      {
        label: 'Asignaturas',
        url: '/pages/asignaturas'
      },
      {
        label: `${curso}` || 'No se encontró el curso',
        url: '/pages/asignaturas/course/' + this.idCargaCursoDocente,
      },
      {
        label: `Unidad: ${unidad} \u2013 Sesion: ${sesion} \u2013 ${elemento}: ${elementoTitulo}` || 'No se encontró el elemento',
        url: ''
      }

    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }


  private fieldReactive() {
    const controls = {
      tipo: ['1']
    };
    this.form = this.formBuilder.group(controls);
    this.updateBreadcrumb();
  }

  cambioTypo($event: any) {
    this.form.patchValue({
      tipo: $event,
    });
  }
}
