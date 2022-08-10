import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss'],
})
export class CursoComponent implements OnInit {
  @Input() user: any;
  @Input() rol: any;

  loading: boolean = false;

  teacherCourses: any = [];
  studentCourses: any = [];
  tutorCourses: any = [];

  constructor(private generalService: GeneralService) {}

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
    let person_id = ''
    if(this.rol === 'user'){
      person_id = this.user?.person?.id;
    }else{
      person_id = this.user.person_id;
    }
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

  deleteStudentEnrollment(course: any) {
    if (course && course.id) {
      Swal.fire({
        title: 'Eliminar matricula',
        text: `¿Está seguro de eliminar la matricula del curso ${course.course_nombre}?`,
        backdrop: true,
        icon: 'question',
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then(res => {
        if (res.isConfirmed) {
          const serviceName = END_POINTS.base_back.default + 'enrollments';
          this.loading = true;
          this.generalService.deleteNameId$(serviceName, course.id).subscribe((res: any) => {
            if (res.success) {
              this.getCourses();
            }
          }, () => { this.loading = false; }, () => { this.loading = false; });
        }
      });
    }
  }

  deleteTutorEnrollment(course: any) {
    if (course && course.id) {
      Swal.fire({
        title: 'Eliminar matricula',
        text: `¿Está seguro de eliminar la matricula del curso ${course.course_nombre}?`,
        backdrop: true,
        icon: 'question',
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then(res => {
        if (res.isConfirmed) {
          const serviceName = END_POINTS.base_back.default + 'tutors';
          this.loading = true;
          this.generalService.deleteNameId$(serviceName, course.id).subscribe((res: any) => {
            if (res.success) {
              this.getCourses();
            }
          }, () => { this.loading = false; }, () => { this.loading = false; });
        }
      });
    }
  }
}
