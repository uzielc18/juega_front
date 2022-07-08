import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppService } from '../../../../../core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { JustificationsComponent } from './justifications/justifications.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss'],
})
export class NavegacionComponent implements OnInit {
  @Input() curso: any;
  userInfo: any;
  showText: boolean = false;
  @ViewChild(JustificationsComponent) justifiAct:any;
  @ViewChild(PreguntasComponent) pregunts:any;
  @ViewChild(EstudiantesComponent) estudents:any;

  @Output() eventsChange: EventEmitter<any> = new EventEmitter();
  constructor(private breakpointObserver: BreakpointObserver, private userService: AppService) {
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
    console.log(this.rolSemestre)
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
}
