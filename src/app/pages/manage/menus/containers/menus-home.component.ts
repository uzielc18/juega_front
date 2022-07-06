import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { MMenuMComponent } from '../components/modals/m-menu-m/m-menu-m.component';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/core';
import { EmitEventsService } from 'src/app/shared/services/emit-events.service';
@Component({
  selector: 'app-menus-home',
  templateUrl: './menus-home.component.html',
  styleUrls: ['./menus-home.component.scss']
})
export class MenusHomeComponent implements OnInit {
  loading:boolean = false;
  list:any = [];
  constructor( private dialogService: NbDialogService, private generalService: GeneralService, public emitEventsService: EmitEventsService) { }

  ngOnInit(): void {
    this.getMenusComp();
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol){
      return val;
    } else {
      return '';
    }
  }
  opemMenus(nivel:any, item:any, code:any) {
    this.dialogService
      .open(MMenuMComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          nivel: nivel,
          item: item,
          code: code,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result === 'ok') {
          this.getMenusComp();
          this.emitEventsService.reloadMenuEmit(true);
        }
      });
  }
  refrehsss() {
    this.getMenusComp();
  }
  getMenusComp() {
    const serviceName = 'list-menus';
    this.loading = true;
    this.generalService.nameId$(serviceName, 0).subscribe((res:any) => {
      this.list =  res.data || [];
    }, () => {this.loading = false;}, () => {this.loading = false;});
  }
  deleteMenu(item:any) {
    const serviceName = 'menus';
    Swal.fire({
      title: 'ELIMINAR',
      text: '¿ Desea eliminar menu ? ',
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
          this.generalService.deleteNameId$(serviceName, item.id).subscribe((res:any) => {
            if (res.success) {
              this.getMenusComp();
              this.emitEventsService.reloadMenuEmit(true);
            }
           });
          }
        });
  }
}