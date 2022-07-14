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
  item: any = [];
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
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
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
  copy(item: any){
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', (item));
      e.preventDefault();
      // @ts-ignore
      document.removeEventListener('copy', null)
    });
    document.execCommand('copy');

  }
  crearSalaZoom(){
    this.loading = true;
    const serviceName = 'add-course-zoom';
    this.generalService.nameId$(serviceName, this.zoom.id_carga_curso_docente).subscribe(res => {
      this.item = res
    }, () => {this.loading = false}, () => {this.loading = false})
  }
}
