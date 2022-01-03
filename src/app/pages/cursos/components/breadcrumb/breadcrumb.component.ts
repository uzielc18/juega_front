import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from '../../../../core/state/app.service';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  roles: string[] = [];
  semestres: any[] = [];
  @Output() course = new EventEmitter<boolean>();

  seme = this.fb.control('');

  constructor(
    private userService: AppService,
    private cursosService: CursosService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cursosService.getSemestres().subscribe((data) => {
      this.semestres = data.data;
      console.log('semestres', this.semestres);
    });
    const { semester } = this.userService.semestre;
    this.seme.patchValue(semester);
    this.updateSemestre(semester);

    this.seme.valueChanges.subscribe((semester) =>
      this.updateSemestre(semester)
    );
  }

  selecionar(event: any) {
    console.log('hola desde el breadcrumb', event);
    // this.role.emit(event);
  }

  updateSemestre(id: number) {
    this.cursosService.updateSemestre(id).subscribe((resp) => {
      console.log('sfcsefsefsefsefse', resp);
      this.cursosService.getCursos();
      this.course.emit(true);
    });
  }
}
