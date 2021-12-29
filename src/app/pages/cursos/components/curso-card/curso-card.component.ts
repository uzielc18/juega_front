import { Component, Input } from '@angular/core';
import { Cursos } from '../../interfaces/cursos.interface';

@Component({
  selector: 'app-curso-card',
  templateUrl: './curso-card.component.html',
  styleUrls: ['./curso-card.component.scss'],
})
export class CursoCardComponent {
  @Input() cursosEstudiante: any = [];
  @Input() cursosDocente: any = [];
  @Input() cursos: Cursos[] = [];

  constructor() {}

  // ngOnInit(): void {
  //   this.cursosService.data$.subscribe((resp) => {
  //     console.log('curso carddddddddddddddd', resp);
  //     this.cursosDocente = resp.data.cursos_docente;
  //     // console.log('cursos docente - ', this.cursosDocente);
  //     this.cursosEstudiante = resp.data.cursos_estudiante;
  //     // console.log('cursos estudiante - ', this.cursosEstudiante);
  //   });
  // }
}
