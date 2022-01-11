import { Component, Input } from '@angular/core';
import { Cursos } from '../../interfaces/cursos.interface';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-curso-card',
  templateUrl: './curso-card.component.html',
  styleUrls: ['./curso-card.component.scss'],
})
export class CursoCardComponent {
  @Input() cursosEstudiante: any = [];
  @Input() cursosDocente: any = [];
  @Input() cursos: Cursos[] = [];
  rol: any;

  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.rolSeleccionado();
  }

  rolSeleccionado() {
    this.cursosService.roleEmitted$.subscribe((rol) => {
      this.rol = rol;
      console.log('rol desde curso-card', this.rol);
    });
  }
}
