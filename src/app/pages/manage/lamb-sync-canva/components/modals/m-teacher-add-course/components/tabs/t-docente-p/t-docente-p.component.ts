import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import Swal from "sweetalert2";
import {GeneralService} from "../../../../../../../../../providers";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-t-docente-p',
  templateUrl: './t-docente-p.component.html',
  styleUrls: ['./t-docente-p.component.scss']
})
export class TDocentePComponent implements OnInit {

  termino: any = new FormControl('');
  selectedItem = 20;
  closeAndGetInfo: boolean = false;
  loading: boolean = false;
  @Input() listCourse: any = [];
  @Input() pagination: any;
  @Input() pagesCount: any = [];
  @Input() teachers_I: any;
  @Input() formHeader: any;
  @Output() eventGetCourse: EventEmitter<boolean> = new EventEmitter();
  @Output() eventTermino: EventEmitter<any> = new EventEmitter();
  @Output() loadPages: EventEmitter<any> = new EventEmitter();
  @Output() sizeTables: EventEmitter<any> = new EventEmitter();

  constructor(private generalService: GeneralService,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
  }

  syncTeacherCourse() {
    const serviceName = 'canva-insert-enrollment-teacher';
    const forms =  this.formHeader;
    const params = {
      programa_estudio_id: forms.programa_estudio?.id,
      semester_id: forms.semestre
    }
    Swal.fire({
      title: 'Sincronizar',
      text: '¿ Esta seguro de sincronizar con canva ? ',
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
        this.loading = true;
        this.generalService.nameParams$(serviceName, params).subscribe( res => {
          if(res.success){
            this.toastrService.info(status, `${res.message}`);
            this.eventGetCourse.emit(true);
          }
        },() => {this.loading= false}, () => {this.loading = false})
      }
    });
  }
  loadPage($event: any): any {
    this.loadPages.emit($event)    ;
  }
  sizeTable($event: any): any {
    this.sizeTables.emit($event);
  }
  searchCourse() {
    this.closeAndGetInfo = true;
    this.eventTermino.emit(this.termino.value)
  }
  limpiarBusqueda() {
    this.closeAndGetInfo = false;
    this.termino.setValue('');
    this.eventTermino.emit(this.termino.value)
  }

}
