import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {END_POINTS} from "../../../../providers/utils";
import {AppService} from "../../../state/app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-c-pendings',
  templateUrl: './c-pendings.component.html',
  styleUrls: ['./c-pendings.component.scss']
})
export class CPendingsComponent implements OnInit {

  data: any = [];
  daysLeft: any;
  hoursLeft: any;
  minutesLeft: any;
  secondsLeft: any;
  expiredDays: any;
  expiredHours: any;
  expiredMinutes: any;
  expiredSeconds: any;
  daysMap = {
    '=0': '',
    '=1': '1 dia,',
    other: '# dias,',
  };

  hoursMap = {
    '=0': '',
    '=1': '1 hora,',
    other: '# horas,',
  };

  minutesMap = {
    '=0': '',
    '=1': '1 minuto.',
    other: '# minutos.',
  };
  constructor(private generalService: GeneralService,
              private appService: AppService,
              private router: Router,) {

      setInterval(() => {
        this.data.map((m: any) => {
          m.newCount = m.fecha_fin
          this.getTimes(m.newCount)
        })
      }, 1000)

  }

  ngOnInit(): void {
    this.getPendings();
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol) {
      return val;
    } else {
      return '';
    }
  }
  getPendings(){
    const serviceName = END_POINTS.base_back.user + '/pendientes-semanal';
    const idPerson = this.appService?.user?.person?.id
    this.generalService.nameIdAndId$(serviceName, idPerson, this.rolSemestre?.semestre.id).subscribe(res =>{
      if(res.success){
        this.data = res.data
      }
      console.log(res)
    })
  }
  getTimes(fechaFin: any){
    const countDate = new Date(fechaFin?.replace(' ', 'T')).getTime();
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
  }
  locationElement(item: any){
    this.router.navigate([`/pages/asignatures/course/${item.id_carga_curso_docente}/element/${item.element_id}`]);
  }
  arrowDown(){

  }

}
