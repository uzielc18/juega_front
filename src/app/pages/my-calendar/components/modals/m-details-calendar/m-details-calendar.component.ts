import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-m-details-calendar',
  templateUrl: './m-details-calendar.component.html',
  styleUrls: ['./m-details-calendar.component.scss']
})
export class MDetailsCalendarComponent implements OnInit {
  loading:boolean = false;
  @Input() datos:any;
  @Input() email:any;
  constructor(public activeModal: NbDialogRef<MDetailsCalendarComponent>, private service: GeneralService) { }

  ngOnInit(): void {
    // console.log(this.datos);
    
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
    deleteGoogle() {
      const serviceName = END_POINTS.base_back.calendar + '/destroy';
      const params = {
        email: this.email,
        id: this.datos.id,
        codigo: this.datos.codigo,
      }
      Swal.fire({
        title: 'Eliminar',
        text: '¿ Desea eliminar el evento ?',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
          if (result.isConfirmed) {
            this.loading = true;
            this.service.deleteNameParams$(serviceName, params).subscribe((res:any) => {
              if (res.success) {
                this.activeModal.close('ok');
              }
            }, () => {this.loading = false}, ()=> {this.loading=false});
          }
      });
    }
}
