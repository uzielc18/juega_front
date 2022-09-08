import {Component, Input, OnInit} from '@angular/core';
import {END_POINTS} from "../../../../../providers/utils";
import {GeneralService} from "../../../../../providers";
import {AppService} from "../../../../../core";

@Component({
  selector: 'app-tabs-cursos',
  templateUrl: './tabs-cursos.component.html',
  styleUrls: ['./tabs-cursos.component.scss']
})
export class TabsCursosComponent implements OnInit {

  @Input() profile: any;
  @Input() listCourses: any;
  loading: boolean = false;
  me: any;
  constructor(private generalService: GeneralService,
              private userService: AppService,) { }

  ngOnInit(): void {
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


}
