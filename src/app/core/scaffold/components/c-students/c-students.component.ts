import { Component, OnInit } from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {AppService} from "../../../state/app.service";

@Component({
  selector: 'app-c-students',
  templateUrl: './c-students.component.html',
  styleUrls: ['./c-students.component.scss']
})
export class CStudentsComponent implements OnInit {

  data: any =[];
  constructor(private generalService: GeneralService,
              private appService: AppService,) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getStudents();
    },4000)

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
  getStudents(){
    const serviceName = END_POINTS.base_back.user + '/amigos-online';
    const idPerson = this.appService?.user?.person?.id;
    this.generalService.nameIdAndId$(serviceName, idPerson, this.rolSemestre?.semestre?.id).subscribe(res => {
    this.data = res.data;
    })
  }

}
