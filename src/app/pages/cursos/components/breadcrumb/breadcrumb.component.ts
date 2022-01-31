import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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
export class BreadcrumbComponent implements OnInit, OnDestroy {
  roles: any = [];
  semestres: any = [];

  data$ = new EventEmitter<any>();

  @Output() course = new EventEmitter<boolean>();

  form = this.formBuilder.group({
    semestre: [''],
    rol: [''],
  });

  constructor(
    private userService: AppService,
    private generalService: GeneralService,
    private cursosService: CursosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.getSemestres();
    const { semester } = this.userService.semestre;
    this.form.get('semestre')?.patchValue(semester);

    this.form.get('semestre')?.valueChanges.subscribe((semester) => {
      this.updateSemestre(semester);
    });

    this.form.get('rol')?.valueChanges.subscribe(() => this.selectedRol());
  }

  getRoles() {
    this.roles = this.userService.rol.filter((rol: any) =>
      ['Estudiante', 'Docente'].includes(rol.name)
    );
    this.form.get('rol')?.patchValue(this.roles[0].name);
    this.selectedRol();
  }

  selectedRol() {
    this.cursosService.emitRol(this.form.get('rol')?.value);
  }

  getSemestres() {
    const serviceName = END_POINTS.base_back.user + '/mysemesters';
    this.generalService
      .nameAll$(serviceName)
      .subscribe(({ data: semestres }) => {
        // console.log('my semesters', semestres);
        this.semestres = semestres;
        this.updateSemestre(this.form.get('semestre')?.value);
      });
  }

  updateSemestre(semesterId: number) {
    const serviceName = END_POINTS.base_back.user + '/updatesemester';
    const id = semesterId;
    this.generalService.nameId$(serviceName, id).subscribe(({ data }) => {
      this.cursosService.getCursos();
      this.course.emit(true);
      this.selectedRol();
    });
  }

  ngOnDestroy(): void {}
}
