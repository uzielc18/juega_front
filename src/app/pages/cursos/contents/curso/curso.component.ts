import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss'],
})
export class CursoComponent implements OnInit {
  routeSub!: Subscription;
  path: number = 0;
  curso: any = [];
  unidades: any = [];

  constructor(
    private courseId: ActivatedRoute,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.getCursoById();
    this.getUnidades(this.path);
  }

  getCursoById() {
    this.routeSub = this.courseId.params.subscribe((params) => {
      console.log(params); //log the entire params object
      this.path = params['curso'];
    });
  }

  getUnidades(cursoId: number) {
    const serviceName = END_POINTS.base_back.resourse + '/elements-course';
    const id = cursoId;
    this.generalService.nameId$(serviceName, id).subscribe((data) => {
      console.log('unidadesdsdsdsdsdsds', data);
      this.curso = data.data;
      console.log('soy el curso', this.curso);
      this.unidades = this.curso.units;
      console.log('unidades', this.unidades);
    });
  }
}
