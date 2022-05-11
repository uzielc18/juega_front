import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-m-details-calendar',
  templateUrl: './m-details-calendar.component.html',
  styleUrls: ['./m-details-calendar.component.scss']
})
export class MDetailsCalendarComponent implements OnInit {
  loading:boolean = false;
  @Input() datos:any;
  constructor(public activeModal: NbDialogRef<MDetailsCalendarComponent>) { }

  ngOnInit(): void {
    console.log(this.datos);
    
  }
  closeModal() {
    this.activeModal.close('close');
  }
  redirect() {
      var a = document.createElement('a');
      a.target="_blank";
      if (this.datos && this.datos.id_carga_curso_docente && this.datos.id_element) {
        a.href=environment.pages + '/asignatures/course/' + this.datos.id_carga_curso_docente + '/element/' + this.datos.id_element;
        a.click();
      }
      if (this.datos && this.datos.id_carga_curso_docente && !this.datos.id_element) {
        a.href=environment.pages + '/asignatures/course/' + this.datos.id_carga_curso_docente;
        a.click();
      }
      
    }
}
