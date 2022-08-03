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
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-card-list-course',
  templateUrl: './card-list-course.component.html',
  styleUrls: ['./card-list-course.component.scss']
})
export class CardListCourseComponent implements OnInit {
  // cursosDocente:any = [];
  // cursosEstudiante:any = [];
  mysCursos:any = [];
  loading:boolean = false;
  form: any = FormGroup;
  nombreSubscription: any = Subscription;
  theRolSemestre:any;
  valida: boolean = false;
  constructor( private formBuilder: FormBuilder,   private generalService: GeneralService, private emitEventsService: EmitEventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private dialogService: NbDialogService,
    private breakpointObserver: BreakpointObserver,) {

    //https://helpdesk.upeu.edu.pe
    //this.form = this.formBuilder.group({
    //  tipo: '1',
    // });
    //this.breakpointObserver.observe(['(max-width: 768px)']).subscribe((result: BreakpointState) => {
    // if (result.matches) {
    //  this.form.get('tipo').setValue('1')
    // } else {
    //    this.form.get('tipo').setValue('2')
    //  }
    // });

     }

  ngOnInit(): void {
    this.fieldReactive();
      //this.updateBreadcrumb();
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
  reloadList() {
    this.getCourses();
  }
  getCourses() {
    const serviceName = END_POINTS.base_back.resourse + '/enrollment-student';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe((res:any) => {
      this.mysCursos = res.data || [];
      if (this.mysCursos.length>0) {
        this.mysCursos.map((r:any) => {
          // r.link_activo.diferencia = 14;
          if (r.cursos.length>0) {
            r.cursos.map((a:any) => {
              const cv = a.link_activo.diferencia;
              a.verIconZoom = false;
              if(cv !== '') {
                if (cv >= -15 && cv <= 15) {
                  a.verIconZoom = true;
                }
              }
          });
          }
        });
        this.mysCursos.map((m:any) => {
          if(m.cursos.length > 0){
            m.cursos.map((c: any) => {
              if(c.cod_category === null && c.portada_miniatura === null){
                c.imageFront = 'assets/books.jpg'
              }
              if(c.cod_category !== null && c.portada_miniatura === null){
                c.imageFront = `assets/${c.cod_category}.png`
              }
              if(c.cod_category === null && c.portada_miniatura !== null){
                c.imageFront = c.portada_miniatura
              }
              if(c.cod_category !== null && c.portada_miniatura !== null){
                c.imageFront = c.portada_miniatura
              }
            })
          }
        })
      }

    }, () => { this.loading =false; }, () => { this.loading =false; });
  }
  navigate(item:any): any {
    this.router.navigate([`../asignatures/course/${item.id_carga_curso_docente}`], { relativeTo: this.activatedRoute.parent});
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
    // console.log(curso);
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

      }
    });
  }
  status(value:any) {
    // console.log(value);

    if (value <= 33) {
      return 'danger';
    } else if (value <= 66) {
      return 'warning';
    } else {
      return 'success';
    }
  }



}
