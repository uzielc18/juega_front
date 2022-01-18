import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { EmitEventsService } from 'src/app/shared/services/emit-events.service';

@Component({
  selector: 'app-v-list-courses',
  templateUrl: './v-list-courses.component.html',
  styleUrls: ['./v-list-courses.component.scss']
})
export class VListCoursesComponent implements OnInit, OnDestroy {
  @Input() rol:any;
  cursosDocente:any = [];
  cursosEstudiante:any = [];
  loading:boolean = false;
  form: any = FormGroup;
  nombreSubscription: any = Subscription;
  theRolSemestre:any;
  constructor( private formBuilder: FormBuilder,   private generalService: GeneralService, private emitEventsService: EmitEventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.nombreSubscription = this.emitEventsService.valuesRolSem$.subscribe(value => { // para emitir evento desde la cabecera
      if (value && value.rol && value.semestre) {
        this.theRolSemestre =  value;
        setTimeout(() => {
          this.getCourses();
        }, 1000);
      }
      });
  }
  ngOnDestroy(): void {
    this.nombreSubscription.unsubscribe();
  }
  private fieldReactive() {
    const controls = {
      tipo: ['2']
    };
    this.form = this.formBuilder.group(controls);
    this.emitEventsService.castRolSemester.subscribe(value => {
      if (value && value.rol && value.semestre) {
        this.theRolSemestre =  value;
        setTimeout(() => {
          this.getCourses();
        }, 1000);
      }
    });

  }
  cambioTypo($event:any) {
    this.form.patchValue({
      tipo: $event,
    });
  }
  getCourses() {
    const serviceName = END_POINTS.base_back.resourse + '/enrollment-student';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe((res:any) => {
      this.cursosDocente = res.data.cursos_docente || [];
      this.cursosEstudiante = res.data.cursos_estudiante || [];
    }, () => { this.loading =false; }, () => { this.loading =false; });
  }
  navigate(item:any): any {
    this.router.navigate([`../asignaturas/course/${item.id_carga_curso_docente}`], { relativeTo: this.activatedRoute.parent});
  }
}
