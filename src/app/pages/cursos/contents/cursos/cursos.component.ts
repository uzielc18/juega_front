import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit, OnDestroy {
  curso = 0;
  subscription!: Subscription;
  cursosEstudiante: any = [];
  cursosDocente: any = [];
  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.subscription = this.cursosService.data$.subscribe((data) => {
      this.cursosDocente = data.data.cursos_docente;
      this.cursosEstudiante = data.data.cursos_estudiante;
    });
    console.log('curso', this.curso);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
