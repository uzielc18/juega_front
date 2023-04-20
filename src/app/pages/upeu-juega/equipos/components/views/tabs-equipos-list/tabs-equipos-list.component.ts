import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {GeneralService} from "../../../../../../providers";
import {NbDialogService} from "@nebular/theme";
import {AppService} from "../../../../../../core";
import {MInfoEquiposComponent} from "../../modals/m-info-equipos/m-info-equipos.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-tabs-equipos-list',
  templateUrl: './tabs-equipos-list.component.html',
  styleUrls: ['./tabs-equipos-list.component.scss']
})
export class TabsEquiposListComponent implements OnInit {

  @Input() item: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  data: any = []
  loading = false

  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService,
              private appUserInfo: AppService) {
  }

  ngOnInit(): void {
    this.listEquipos()
  }

  listEquipos() {
    const serviceName = 'equipos-list-cat';
    const params = {
      upeudisciplina_id: this.item.id
    }
    this.loadingsForm.emit(true)
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      if (res.success) {
        this.data = res.data
        this.data.map((f: any) => {
            f.active = false
        })
      }
    }, () => {
      this.loadingsForm.emit(false)
    }, () => {
      this.loadingsForm.emit(false)
    })
  }

  openInfo(item: any, code: any) {
    this.dialogService.open(MInfoEquiposComponent, {
      context: {
        userInfo: this.appUserInfo.user,
        item: item,
        code: code
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(resp => {
      if (resp === 'ok') {
        this.listEquipos();
      }
    })
  }


  delete(item: any){
    const serviceName = 'upeuequipos'
    Swal.fire({
      title: 'Eliminar',
      text: '¿ Desea eliminar ? ',
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
    }).then((result: any) => {
      if (result.isConfirmed) {
        //this.loading = true;
        this.generalService.deleteNameId$(serviceName, item.id).subscribe(r => {
          if (r.success) {
            this.listEquipos();
          }
        },() => {this.loading = false;},() => {this.loading = false;});
      }
    });
  }
}
