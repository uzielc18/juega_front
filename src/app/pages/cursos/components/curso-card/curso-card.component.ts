import { Component, Input, OnInit } from '@angular/core';
import { Cursos } from '../../interfaces/cursos.interface';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-curso-card',
  templateUrl: './curso-card.component.html',
  styleUrls: ['./curso-card.component.scss'],
})
export class CursoCardComponent implements OnInit {
  @Input() cursosEstudiante: any = [];
  @Input() cursosDocente: any = [];
  @Input() cursos: Cursos[] = [];
  rol: any;

  constructor(private cursosService: CursosService) {}

<<<<<<< HEAD
  // ngOnInit(): void {
  //   this.cursosService.data$.subscribe((resp) => {
  //     console.log('curso carddddddddddddddd', resp);
  //     this.cursosDocente = resp.data.cursos_docente;
  //     // console.log('cursos docente - ', this.cursosDocente);
  //     this.cursosEstudiante = resp.data.cursos_estudiante;
  //     // console.log('cursos estudiante - ', this.cursosEstudiante);
  //   });
  // }
  ngOnInit(): void {
=======
  ngOnInit(): void {
    this.rolSeleccionado();
  }

  rolSeleccionado() {
    this.cursosService.roleEmitted$.subscribe((rol) => {
      this.rol = rol;
      console.log('rol desde curso-card', this.rol);
    });
>>>>>>> 829d8e423f166de48d83e2de42e7297b96a44ac8
  }
}
