import { Component, Input, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.scss'],
})
export class CursoListComponent implements OnInit {
  @Input() cursosEstudiante: any = [];
  @Input() cursosDocente: any = [];
  rol: any;

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.rolSeleccionado();
  }

  rolSeleccionado() {
    this.cursosService.roleEmitted$.subscribe((rol) => {
      this.rol = rol;
      // console.log('rol desde curso-list', this.rol);
    });
  }
}
