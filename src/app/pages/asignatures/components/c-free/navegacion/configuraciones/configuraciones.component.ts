import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {MUnitSessionComponent} from "../../../../../../shared/components/unit-session/modal/m-unit-session.component";
import {NbDialogService} from "@nebular/theme";
import {FormControl} from "@angular/forms";
@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss']
})
export class ConfiguracionesComponent implements OnInit, OnChanges {
  loading: boolean = false
  mostrar_fecha_session =  new FormControl(false);
  @Input() curso:any;
  @Input() userInfo: any;
  @Input() zoom: any;
  @Output() changeLoad: EventEmitter<any> = new EventEmitter();
  constructor(private generalService: GeneralService,
              private router:Router,
              private dialogService: NbDialogService,) { }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    console.log(this.zoom)
    this.zoom = this.zoom;
    this.setValueDate()
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
  addUnitAndSession(){
    this.dialogService.open(MUnitSessionComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        userInfo: this.userInfo?.user,
        items: this.curso
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        //this.getCourseZoom();
      }
    });
  }
  setValueDate(){
    this.mostrar_fecha_session.setValue(this.zoom?.mostrar_fecha_session === 0 || null? false : true);
  }
  configurationShowDate(event: any){
    const serviceName = 'courses';
    const params = {
      mostrar_fecha_session: event? 1: 0,
    }
    this.loading = true;
    this.generalService.updateNameIdData$(serviceName, this.zoom?.id, params).subscribe(res => {
        if( res.success){
          this.changeLoad.emit('ok');
        }
    }, () => {this.loading = false}, () => {this.loading = false})
  }


}
