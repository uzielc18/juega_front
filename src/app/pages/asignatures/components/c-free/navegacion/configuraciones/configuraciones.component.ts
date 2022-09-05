import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss']
})
export class ConfiguracionesComponent implements OnInit {
  loading: boolean = false
  @Input() curso:any;
  @Output() changeLoad: EventEmitter<any> = new EventEmitter();
  constructor(private generalService: GeneralService,
              private router:Router) { }

  ngOnInit(): void {
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }

  syncEstLamb() {
    const serviceName = END_POINTS.base_back.config + '/get-enrollments';
    const params = {
      semestre: this.rolSemestre.semestre.codigo || '',
      idCargCurDoc: this.curso.id_carga_curso || '',
      id_1: '0',
      id_2: '0',
    }
     if(params && params.semestre && params.idCargCurDoc) {
      Swal.fire({
        title: 'Sincronizar',
        text: '¿ Desea sincronizar estudiantes lamb ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#00244E',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
          if (result.isConfirmed) {
       this.generalService.nameIdAndIdAndIdAndId$(serviceName, params.semestre, params.idCargCurDoc, params.id_1, params.id_2).subscribe((res:any) => {
        if (res.success) {
          // this.changeLoad.emit('ok');
        }
       });
      }
    });
     }
  }
  syncSessionesLamb() {
    const serviceName = END_POINTS.base_back.config + '/silabus';
    const params = {
      semestre: this.rolSemestre.semestre.codigo || '',
      idCargCurDoc: this.curso.id_carga_curso_docente || '',
      id_1: '0',
    }
     if(params && params.semestre && params.idCargCurDoc) {
      Swal.fire({
        title: 'Sincronizar sesiones',
        text: 'Usted está a punto de eliminar todas las unidades, sesiones y contenido del curso.',
        titleText:'¿ Desea continuar ?',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#00244E',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
          if (result.isConfirmed) {
            this.loading = true
       this.generalService.nameIdAndIdAndId$(serviceName, params.semestre, params.idCargCurDoc, params.id_1).subscribe((res:any) => {
        if (res.success) {

          this.changeLoad.emit('ok');
        }
       }, () => {this.loading = false}, () => {this.loading = false});
      }
    });
     }
  }
  actSalaZoom(option:any) {
    const serviceName = 'zoom-operador';
     if(this.curso.id) {
      Swal.fire({
        title: 'Actualizar',
        text: '¿ Desea actualizar sala zoom ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#00244E',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
          if (result.isConfirmed) {
      this.generalService.nameIdAndId$(serviceName, this.curso.id, option).subscribe((res:any) => {
        if (res.success) {
          // this.changeLoad.emit('ok');
        }
       });
      }
    });
     }
  }
  syncNotes(){
    this.router.navigate([`/pages/asignatures/course/${this.curso.id_carga_curso_docente}/notes`],);
  }
}
