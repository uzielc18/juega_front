import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { GeneralService } from '../../../providers';
import { END_POINTS } from '../../../providers/utils';
import { EditAreaRolComponent } from './edit-area-rol/edit-area-rol.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  @Input() user: any;
  @Input() rol: any = '';
  profile: any;
  areasRoles: any;
  perfilInfo: boolean = false;
  view: string = 'mini';
  loading: boolean = false;
  formHeader: any = FormGroup;

  @Output() changeEmit: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NbDialogRef<EditUserComponent>,
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      codigo: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', [Validators.required]],
      apellido_materno: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      ubigeo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]],
      estado_civil: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.getUserInfo();
    this.getAreasRoles();
  }

  getUserInfo() {
    const serviceName = END_POINTS.base_back.user + '/perfil';
    const person_id = this.user.person_id;
    const user_id = this.user.user_id;
    const params = {
      view: this.view,
    };
    this.loading = true;
    this.generalService.nameIdAndIdParams$(serviceName, person_id, user_id, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.profile = res.data;
          this.formHeader.patchValue({
            codigo: this.profile.person.codigo,
            nombre: this.profile.person.nombres,
            apellido_paterno: this.profile.person.apellido_paterno,
            apellido_materno: this.profile.person.apellido_materno,
            dni: this.profile.person.dni,
            correo: this.profile.user.email,
            genero: this.profile.person.genero || '',
            nacionalidad: this.profile.person.nacionalidad || '',
            ubigeo: this.profile.person.ubigeo || '',
            estado_civil: this.profile.person.estado_civil || '',
            religion: this.profile.person.religion || '',
            fecha_nacimiento: new Date(this.profile.person.fecha_nacimiento) || new Date(),
          });
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

  saveInfo() {
    const serviceName = END_POINTS.base_back.people;
    const person_id = this.user.person_id;
    this.loading = true;
    const data = {
      person: {
        genero: this.formHeader.controls['genero'].value,
        nacionalidad: this.formHeader.controls['nacionalidad'].value,
        ubigeo: this.formHeader.controls['ubigeo'].value,
        estado_civil: this.formHeader.controls['estado_civil'].value,
        religion: this.formHeader.controls['religion'].value,
        fecha_nacimiento: this.formHeader.controls['fecha_nacimiento'].value,
      },
      user: {
        email: this.formHeader.controls['correo'].value,
      },
    };
    this.generalService.updateNameIdData$(serviceName, person_id, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.getUserInfo();
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

  getAreasRoles() {
    const serviceName = END_POINTS.base_back.default + 'areasRoles';
    const params = {
      person_id: this.user.person_id,
    };
    this.generalService.nameParams$(serviceName, params).subscribe((res: any) => {
      if (res.success) {
        this.areasRoles = res.data;
        console.log(this.areasRoles);
      }
    });
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
        this.changeEmit.emit();
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
        this.changeEmit.emit();
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
          this.generalService.deleteNameId$(serviceName, areaRol.id).subscribe((res: any) => {
            if (res.success) {
              this.getAreasRoles();
            }
          });
        }
      }),
        () => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        };
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

  closeModal() {
    this.activeModal.close('close');
  }
}
