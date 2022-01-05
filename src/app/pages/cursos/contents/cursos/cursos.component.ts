import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  curso = 0;
  cursosEstudiante: any = [];
  cursosDocente: any = [];
  cursos: any = [];
  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cursosService.data$.subscribe((data) => {
      this.cursosDocente = data.data.cursos_docente;
      this.cursosEstudiante = data.data.cursos_estudiante;
    });
  }
}
