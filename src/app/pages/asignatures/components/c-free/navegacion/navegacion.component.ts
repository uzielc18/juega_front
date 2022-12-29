import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppService } from '../../../../../core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { JustificationsComponent } from './justifications/justifications.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import {END_POINTS} from "../../../../../providers/utils";
import {GeneralService} from "../../../../../providers";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss'],
})
export class NavegacionComponent implements OnInit {
  loading:boolean = false;
  stateChat:boolean = false;
  idCargaCursoDocente: any = this.activatedRoute.snapshot.paramMap.get('id_carga_curso_docente');
  @Input() curso: any;
  @Input() zoom: any;
  userInfo: any;
  justificatiosn:any = [];
  tooltip: boolean = false;
  tootipValue: any = 'Copiar';
  item: any = [];
  valor: any;
  showText: boolean = false;
  @ViewChild(JustificationsComponent) justifiAct:any;
  @ViewChild(PreguntasComponent) pregunts:any;
  @ViewChild(EstudiantesComponent) estudents:any;

  @Output() eventsChange: EventEmitter<any> = new EventEmitter();
  constructor(private breakpointObserver: BreakpointObserver,
              private userService: AppService,
              private activatedRoute: ActivatedRoute,
              private generalService: GeneralService) {
    this.breakpointObserver.observe(['(max-width: 992px)']).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.showText = true;
      } else {
        this.showText = false;
      }
    });
  }
  ngOnInit(): void {
    this.listJustificate();
    this.userInfo = this.userService;
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
      person_id: this.userService?.user?.person.id,
    };
    this.loading = true;
    this.generalService.nameIdAndIdParams$(serviceName, this.idCargaCursoDocente, this.rolSemestre?.rol?.id, params).subscribe((res:any) => {
      this.justificatiosn = res.data || [];
      //console.log(this.justificatiosn)
    }, () => {this.loading = false;}, () => {this.loading = false;})
  }
  crearSalaZoom(){
    this.loading = true;
    const serviceName = 'add-course-zoom';
    this.generalService.nameId$(serviceName, this.zoom.id_carga_curso_docente).subscribe(res => {
      this.item = res
    }, () => {this.loading = false}, () => {this.loading = false})
  }
  routingZoom(){
    this.loading = true;
    const serviceName = 'zoom-operador';
    if(this.curso.id) {
          this.generalService.nameIdAndId$(serviceName, this.curso.id, 8).subscribe((res:any) => {
            if(res.success){ }
    }, () => {this.loading = false}, () => {this.loading = false});

    }
  }
  eventChat(event: any){
    if(event == 'on'){
      this.stateChat = true;
    }
    if(event == 'off'){
      this.stateChat = false;
    }
  }
}
