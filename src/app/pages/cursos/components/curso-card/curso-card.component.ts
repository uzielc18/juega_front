import { Component, Input, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { Cursos } from '../../interfaces/cursos.interface';

@Component({
  selector: 'app-curso-card',
  templateUrl: './curso-card.component.html',
  styleUrls: ['./curso-card.component.scss'],
})
export class CursoCardComponent implements OnInit {
  @Input() cursosEstudiante: any = [];
  @Input() cursosDocente: any = [];


  constructor(
    private cursosService: CursosService,
  ) {}

  ngOnInit(): void {
    this.cursosService.data$.subscribe(resp => {
      console.log('curso carddddddddddddddd',resp)
      this.cursosDocente = resp.data.cursos_docente;
      // console.log('cursos docente - ', this.cursosDocente);
      this.cursosEstudiante = resp.data.cursos_estudiante;
      // console.log('cursos estudiante - ', this.cursosEstudiante);
    })
  }
}
