import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from '../../../../core/state/app.service';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  // roles: string[] = [];
  semestres: any[] = [];
  data$ = new EventEmitter<any>();

  @Output() course = new EventEmitter<boolean>();

  semestre = this.formBuilder.control('');

  constructor(
    private userService: AppService,
    private generalService: GeneralService,
    private cursosService: CursosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getSemestres();
    const { semester } = this.userService.semestre;
    this.semestre.patchValue(semester);
    this.updateSemestre(semester);
    this.semestre.valueChanges.subscribe((semester) =>
      this.updateSemestre(semester)
    );
  }

  // getCursos() {
  //   const serviceName = END_POINTS.base_back.resourse + '/enrollment-student';
  //   this.generalService.nameAll$(serviceName).subscribe((data) => {
  //     console.log('cursossosososo desde breadcrumb', data);
  //   });
  // }

  getSemestres() {
    const serviceName = END_POINTS.base_back.user + '/mysemesters';
    this.generalService
      .nameAll$(serviceName)
      .subscribe(({ data: semestres }) => {
        console.log('my semstrressssss', semestres);
        this.semestres = semestres;
      });
  }

  updateSemestre(semesterId: number) {
    const serviceName = END_POINTS.base_back.user + '/updatesemester';
    const id = semesterId;
    this.generalService.nameId$(serviceName, id).subscribe(({ data }) => {
      console.log('update semestrre', data);
      this.cursosService.getCursos();
      this.course.emit(true);
    });

    // this.cursosService.updateSemestre(id).subscribe((resp) => {
    //   console.log('sfcsefsefsefsefse', resp);
    //   this.cursosService.getCursos();
    //   this.course.emit(true);
    // });
  }
}
