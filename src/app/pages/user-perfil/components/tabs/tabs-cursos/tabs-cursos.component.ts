import {Component, Input, OnInit} from '@angular/core';
import {END_POINTS} from "../../../../../providers/utils";
import {GeneralService} from "../../../../../providers";
import Swal from "sweetalert2";

@Component({
  selector: 'app-tabs-cursos',
  templateUrl: './tabs-cursos.component.html',
  styleUrls: ['./tabs-cursos.component.scss']
})
export class TabsCursosComponent implements OnInit {

  @Input() profile: any;
  @Input() listCourses: any;
  loading: boolean = false;
  constructor(private generalService: GeneralService) { }

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
