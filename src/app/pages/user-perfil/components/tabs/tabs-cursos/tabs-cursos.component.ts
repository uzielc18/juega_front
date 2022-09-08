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

    this.me = this.userService.user.person.id
    if(this.rolSemestre?.rol?.name !== 'Estudiante' && this.rolSemestre?.rol?.name !== 'Docente' || this.profile?.user?.person?.id === this.me) {
      this.getCourses();
    }
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

  getCourses() {
    this.loading = true
    const serviceName = END_POINTS.base_back.default + 'course-list';
    const params = {
      semester_id: this.rolSemestre.semestre.id,
    };
    this.generalService.nameIdParams$(serviceName,this.profile?.person.id, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.listCourses = res.data
        }
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

}
