import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { EmitEventsService } from '../../services/emit-events.service';
import { EnterZoomComponent } from './enter-zoom/enter-zoom.component';

@Component({
  selector: 'app-card-list-course',
  templateUrl: './card-list-course.component.html',
  styleUrls: ['./card-list-course.component.scss']
})
export class CardListCourseComponent implements OnInit {
  cursosDocente:any = [];
  cursosEstudiante:any = [];
  loading:boolean = false;
  form: any = FormGroup;
  nombreSubscription: any = Subscription;
  theRolSemestre:any;
  valida: boolean = false;
  @Output() changeEmit: EventEmitter<any> = new EventEmitter();
  // public valorEmitido = this.emitEventsService.recibir;
  constructor( private formBuilder: FormBuilder,   private generalService: GeneralService, private emitEventsService: EmitEventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private dialogService: NbDialogService) {
    }


  ngOnInit(): void {
    this.fieldReactive();
    this.nombreSubscription = this.emitEventsService.returns().subscribe(value => { // para emitir evento desde la cabecera
      if (value && value.rol && value.semestre) {
        this.theRolSemestre =  value;
        this.valida = true;
        setTimeout(() => {
          this.getCourses();
        }, 1000);
      } else {
        this.valida = false;
      }
      });
      this.recoveryValues();
  }
  ngOnDestroy(): void {
    this.nombreSubscription.unsubscribe();
  }
  private fieldReactive() {
    const controls = {
      tipo: ['2']
    };
    this.form = this.formBuilder.group(controls);
    this.updateBreadcrumb();
  }
  recoveryValues() {
    this.emitEventsService.castRolSemester.subscribe(value => {
      if (value && value.rol && value.semestre && !this.valida) {
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
  updateBreadcrumb(): void {
    const breadcrumbs  =  [
      {
        label: 'Asignaturas',
        url: ''
      },
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }

  enterZoom(event: any, curso: any) {
    console.log(curso);
    event.stopPropagation();
    this.dialogService.open(EnterZoomComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        item: curso,
      },
      closeOnBackdropClick: true,
      closeOnEsc: true
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.changeEmit.emit();
      }
    });
  }

}
