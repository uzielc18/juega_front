import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppService } from '../../../../../core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { JustificationsComponent } from './justifications/justifications.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import {END_POINTS} from "../../../../../providers/utils";
import {GeneralService} from "../../../../../providers";

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss'],
})
export class NavegacionComponent implements OnInit {
  loading:boolean = false
  @Input() curso: any;
  @Input() zoom: any;
  userInfo: any;
  tooltip: boolean = false;
  tootipValue: any = 'Copiar';
  item: any = [];
  justificatiosn:any = [];
  valor: any;
  showText: boolean = false;
  @ViewChild(JustificationsComponent) justifiAct:any;
  @ViewChild(PreguntasComponent) pregunts:any;
  @ViewChild(EstudiantesComponent) estudents:any;

  @Output() eventsChange: EventEmitter<any> = new EventEmitter();
  constructor(private breakpointObserver: BreakpointObserver,
              private userService: AppService,
              private generalService: GeneralService) {
    this.breakpointObserver.observe(['(max-width: 1399px)']).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.showText = true;
      } else {
        this.showText = false;
      }
    });
  }
  ngOnInit(): void {
    this.userInfo = this.userService;
    this.listJustificate();
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }

  badgeNumber(){
    if(this.curso.length > 0){

    }
  }
  changeTabs(event:any) {
    const idTab = event.tabId;
    switch (idTab) {
      case 'justifications':
        this.justifiAct.listJustificate();
        break;
      case 'pregunta':
        this.pregunts.getQuestions();
        break;
      case 'estudiantes':
        this.estudents.getStudents();
        break;
      default:
        break;
    }
  }
  syngChanges($event:any) {
    if ($event === 'ok') {
      this.eventsChange.emit($event);
    }
  }
  copy(tooltip: any, item: any){
    if(!tooltip){
      this.tootipValue = 'Copiado!'
      setTimeout(() => {
        this.tootipValue = 'Copiar'
      },1500)
    }
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', (item));
      e.preventDefault();
      // @ts-ignore
      document.removeEventListener('copy', null)
    });
    document.execCommand('copy');

  }
    listJustificate() {
      const serviceName = 'list-justifications';
      const params = {
        estado_justification : 'pendiente',
        person_id: this.userInfo.user.person.id,
      };
      this.loading = true;
      this.generalService.nameIdAndIdParams$(serviceName, this.curso.id_carga_curso_docente, this.rolSemestre.rol.id, params).subscribe((res:any) => {
        this.justificatiosn = res.data || [];
      }, () => {this.loading = false;}, () => {this.loading = false;})
    }
  crearSalaZoom(){
    this.loading = true;
    const serviceName = 'add-course-zoom';
    this.generalService.nameId$(serviceName, this.zoom.id_carga_curso_docente).subscribe(res => {
      this.item = res
    }, () => {this.loading = false}, () => {this.loading = false})
  }
}
