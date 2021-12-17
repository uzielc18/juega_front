import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { Cursos } from '../../interfaces/cursos.interface';

@Component({
  selector: 'app-curso-card',
  templateUrl: './curso-card.component.html',
  styleUrls: ['./curso-card.component.scss'],
})
export class CursoCardComponent implements OnInit {
  cursos: any = [];

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cursosService.getCourses().subscribe((data: any) => {
      this.cursos = data.data.cursos_estudiante;
      console.log(this.cursos);
    });
  }
}
