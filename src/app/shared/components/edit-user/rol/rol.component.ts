import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from '../../../../providers';
import { END_POINTS } from '../../../../providers/utils';
import { EditAreaRolComponent } from './edit-area-rol/edit-area-rol.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss'],
})
export class RolComponent implements OnInit {
  @Input() user: any;

  areasRoles: any;
  loading: boolean = false;

  constructor(private generalService: GeneralService, private dialogService: NbDialogService) {}

  ngOnInit(): void {
    this.getAreasRoles();
  }

  getAreasRoles() {
    const serviceName = END_POINTS.base_back.default + 'areasRoles';
    const params = {
      person_id: this.user.person_id,
    };
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.areasRoles = res.data;
        } else {
          this.areasRoles = [];
        }
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  newAreaRol() {
    const dialogConfig = {
      dialogClass: 'dialog-limited-height',
      context: { action: 'new', user: this.user },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    };
    this.dialogService.open(EditAreaRolComponent, dialogConfig).onClose.subscribe(result => {
      if (result === 'ok') {
        this.getAreasRoles();
      }
    });
  }

  editAreaRol(areaRol: any) {
    const dialogConfig = {
      dialogClass: 'dialog-limited-height',
      context: { areaRol: areaRol, action: 'edit', user: this.user },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    };
    this.dialogService.open(EditAreaRolComponent, dialogConfig).onClose.subscribe(result => {
      if (result === 'ok') {
        this.getAreasRoles();
      }
    });
  }

  deleteAreaRol(areaRol: any) {
    if (areaRol && areaRol.id) {
      Swal.fire({
        title: 'Eliminar rol',
        text: `¿Está seguro de eliminar el rol?`,
        backdrop: true,
        icon: 'question',
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          const serviceName = END_POINTS.base_back.default + 'areasRoles';
          this.loading = true;
          this.generalService.deleteNameId$(serviceName, areaRol.id).subscribe(
            (res: any) => {
              if (res.success) {
                this.getAreasRoles();
              }
            },
            () => {
              this.loading = false;
            },
            () => {
              this.loading = false;
            }
          );
        }
      });
    }
  }

  statusToggle(areaRol: any) {
    let toggle = areaRol.estado;
    toggle = toggle === '1' ? '0' : '1';
    const data = {
      estado: toggle,
    };
    this.updateAreaRol(areaRol, data);
  }

  predefinedToggle(areaRol: any) {
    let toggle = areaRol.predefinido;
    toggle = toggle === '1' ? '0' : '1';
    const data = {
      predefinido: toggle,
    };
    this.updateAreaRol(areaRol, data);
  }

  updateAreaRol(areaRol: any, data: any) {
    const serviceName = END_POINTS.base_back.default + 'areasRoles';
    this.loading = true;
    this.generalService.updateNameIdData$(serviceName, areaRol.id, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.getAreasRoles();
        }
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
