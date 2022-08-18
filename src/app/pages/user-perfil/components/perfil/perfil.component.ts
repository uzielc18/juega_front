import {Component, Input, OnInit} from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {EditUserComponent} from "../../../../shared/components/edit-user/edit-user.component";
import {NbDialogService} from "@nebular/theme";
import Swal from "sweetalert2";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  @Input() profile:any;

  loading: boolean = false

  constructor( private generalService: GeneralService,
               private dialogService: NbDialogService) { }

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

  editUser(){
    this.dialogService
      .open(EditUserComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          user: this.profile,
          rol: 'user' },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
      if (result === 'ok') {
        //this.getTeachers();
      }
    });
  }
  sincCourse(){
    const serviceName = END_POINTS.base_back.config + '/cursos';
    Swal.fire({
      title: 'Sincronizar curso',
      text: '¿ Desea sincronizar ? ',
      backdrop: true,
      icon: 'question',
      // animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#014776',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      // timer: 2000,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.generalService.nameIdAndIdAndIdAndId$(serviceName, this.rolSemestre?.semestre?.nombre, 0, 0, this.profile.user.usuario_upeu).subscribe(res => {
          if(res.success){
          }
        }, () => {this.loading = false}, () => {this.loading = false})
      }
    });

  }
  sincronizarDatos(){
    const serviceName = END_POINTS.base_back.config + '/get-info-user';
    const params = {
      user: this.profile.user.usuario_upeu,
    }
    Swal.fire({
      title: 'Sincronizar datos',
      text: '¿ Desea sincronizar ? ',
      backdrop: true,
      icon: 'question',
      // animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#014776',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      // timer: 2000,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.generalService.nameParams$(serviceName, params).subscribe(res => {
          console.log(res)
        },() =>{this.loading = false}, () => {this.loading = false})
      }
    });


  }
}
