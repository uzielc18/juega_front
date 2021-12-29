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
    this.cursosService.getCourses().subscribe((data: any) => {
      this.cursosDocente = data.data.cursos_docente;
      console.log('cursos docente - ', this.cursosDocente);
      this.cursosEstudiante = data.data.cursos_estudiante;
      console.log('cursos estudiante - ', this.cursosEstudiante);
    });

    // this.cursosService.data$.subscribe(resp => {
    //   console.log('evemgaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',resp)
    // })
  }
}
