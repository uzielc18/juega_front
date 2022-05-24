import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  @Input() user: any;

  loading: boolean = false;

  teacherCourses: any = [];
  studentCourses: any = [];
  tutorCourses: any = [];

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }

  getCourses() {
    const serviceName = END_POINTS.base_back.default + 'course-list';
    const params = {
      semester_id: this.rolSemestre.semestre.id,
    };
    const person_id = this.user.person_id;
    this.loading = true;
    this.generalService.nameIdParams$(serviceName, person_id, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.teacherCourses = res.data.cursos_docente;
          this.studentCourses = res.data.cursos_estudiante;
          this.tutorCourses = res.data.cursos_tutor;
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
