import { Component, Input, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-curso-card',
  templateUrl: './curso-card.component.html',
  styleUrls: ['./curso-card.component.scss'],
})
export class CursoCardComponent implements OnInit {
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
      // console.log('rol desde curso-card', this.rol);
    });
  }
}
