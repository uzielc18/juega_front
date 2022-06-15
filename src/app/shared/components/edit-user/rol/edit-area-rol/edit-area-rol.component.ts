import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from '../../../../../providers';
import { END_POINTS } from '../../../../../providers/utils';

@Component({
  selector: 'app-edit-area-rol',
  templateUrl: './edit-area-rol.component.html',
  styleUrls: ['./edit-area-rol.component.scss'],
})
export class EditAreaRolComponent implements OnInit {
  @Input() user: any;
  @Input() action: any = 'new';
  @Input() areaRol: any;
  loading: boolean = false;
  formHeader: any = FormGroup;

  sedes: any;
  nivelEnsenanza: any;
  facultades: any;
  programa_estudios: any;
  roles: any;

  constructor(
    public activeModal: NbDialogRef<EditAreaRolComponent>,
    private formBuilder: FormBuilder,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.fieldReactive();
    // console.log(this.action);
    // console.log(this.areaRol);
  }

  private fieldReactive() {
    const controls = {
      sede: ['', [Validators.required]],
      nivel_ensenanza: [{ value: '', disabled: true }, [Validators.required]],
      facultad: [{ value: '', disabled: true }, [Validators.required]],
      programa_estudio: [{ value: '', disabled: true }],
      rol: ['', [Validators.required]],
      predefinido: [true, [Validators.required]],
      estado: [true, [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.listSedes();
    this.listRoles();
    if (this.action === 'edit') {
      this.formHeader.controls['predefinido'].setValue(this.areaRol.predefinido === '1' ? true : false);
      this.formHeader.controls['estado'].setValue(this.areaRol.estado === '1' ? true : false);
    }
  }

  listSedes() {
    const serviceName = END_POINTS.base_back.default + 'sedes';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe(
      (res: any) => {
        this.sedes = res.data || [];
        if (this.action === 'edit') {
          this.formHeader.controls['sede'].setValue(this.areaRol.sede_id);
          this.formHeader.controls['nivel_ensenanza'].enable();
          this.listNivelEnsenanza(this.areaRol.sede_id);
        }
      },
      () => {
        if (this.action === 'new') {
          this.loading = false;
        }
      },
      () => {
        if (this.action === 'new') {
          this.loading = false;
        }
      }
    );
  }

  listNivelEnsenanza(sede_id: any) {
    const serviceName = END_POINTS.base_back.nivel_ensenanza;
    if (this.sedes.length > 0) {
      this.loading = true;
      this.generalService.nameId$(serviceName, sede_id).subscribe(
        (res: any) => {
          this.nivelEnsenanza = res.data || [];
          if (this.action === 'edit') {
            this.formHeader.controls['nivel_ensenanza'].setValue(this.areaRol.nivel_ensenanza_id);
            this.formHeader.controls['facultad'].enable();
            this.listFacultades(this.areaRol.nivel_ensenanza_id, this.areaRol.sede_id);
          }
        },
        () => {
          if (this.action === 'new') {
            this.loading = false;
          }
        },
        () => {
          if (this.action === 'new') {
            this.loading = false;
          }
        }
      );
    }
  }

  listFacultades(nivel_ense_id: any, sede_id: any) {
    const serviceName = END_POINTS.base_back.sede_areas;
    if (this.nivelEnsenanza.length > 0) {
      this.loading = true;
      this.generalService.nameIdAndId$(serviceName, nivel_ense_id, sede_id).subscribe(
        (res: any) => {
          this.facultades = res.data || [];
          if (this.action === 'edit') {
            this.formHeader.controls['facultad'].setValue(this.areaRol.area_id);
            this.formHeader.controls['programa_estudio'].enable();
            this.listProgramaEstudios(this.areaRol.nivel_ensenanza_id, this.areaRol.sede_id, this.areaRol.area_id);
          }
        },
        () => {
          if (this.action === 'new') {
            this.loading = false;
          }
        },
        () => {
          if (this.action === 'new') {
            this.loading = false;
          }
        }
      );
    }
  }

  listProgramaEstudios(nivel_ense_id: any, sede_id: any, fac_id: any) {
    const serviceName = END_POINTS.base_back.programa_estudios;
    if (this.facultades.length > 0) {
      this.loading = true;
      this.generalService.nameIdAndIdAndId$(serviceName, nivel_ense_id, sede_id, fac_id).subscribe(
        (res: any) => {
          this.programa_estudios = res.data || [];
          if (this.programa_estudios.length > 0) {
            this.programa_estudios.map((r: any) => {
              r.name_programa_estudio = r.nombre_corto + ' ' + (r.sede_nombre ? r.sede_nombre : '');
              if (r.semiprecencial_nombre) {
                r.name_programa_estudio =
                  r.nombre_corto + ' (' + r.sede_nombre + ' - ' + r.semiprecencial_nombre + ' )';
              }
            });
            if (this.action === 'edit') {
              this.formHeader.controls['programa_estudio'].setValue(this.areaRol.programa_estudio_id);
            }
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

  listRoles() {
    const serviceName = END_POINTS.base_back.default + 'roles';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe(
      (res: any) => {
        if (res.success) {
          this.roles = res.data || [];
          if (this.action === 'edit') {
            this.formHeader.controls['rol'].setValue(this.areaRol.role_id);
          }
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

  selectedSede(sede_id: any) {
    this.formHeader.controls['sede'].setValue(sede_id);
    this.formHeader.controls['nivel_ensenanza'].enable();
    this.nivelEnsenanza = [];
    this.facultades = [];
    this.programa_estudios = [];
    this.formHeader.controls['nivel_ensenanza'].setValue('');
    this.formHeader.controls['facultad'].setValue('');
    this.formHeader.controls['programa_estudio'].setValue('');
    this.listNivelEnsenanza(sede_id);
  }

  selectedNivel(nivel_id: any) {
    this.formHeader.controls['nivel_ensenanza'].setValue(nivel_id);
    this.formHeader.controls['facultad'].enable();
    this.facultades = [];
    this.programa_estudios = [];
    this.formHeader.controls['facultad'].setValue('');
    this.formHeader.controls['programa_estudio'].setValue('');
    this.listFacultades(nivel_id, this.formHeader.get('sede').value);
  }

  selectedFacultad(fac_id: any) {
    this.formHeader.controls['facultad'].setValue(fac_id);
    this.formHeader.controls['programa_estudio'].enable();
    this.programa_estudios = [];
    this.formHeader.controls['programa_estudio'].setValue('');
    this.listProgramaEstudios(this.formHeader.get('nivel_ensenanza').value, this.formHeader.get('sede').value, fac_id);
  }

  selectedProgramaEstudio(prog_id: any) {
    this.formHeader.controls['programa_estudio'].setValue(prog_id);
  }

  selectedRol(rol_id: any) {
    this.formHeader.controls['rol'].setValue(rol_id);
  }

  savePerfil() {
    const serviceName = END_POINTS.base_back.default + 'areasRoles';
    this.loading = true;
    const data = {
      person_id: this.user.person_id || 0,
      user_id: this.user.user_id || 0,
      role_id: this.formHeader.get('rol').value || 0,
      sede_id: this.formHeader.get('sede').value || 0,
      nivel_ensenanza_id: this.formHeader.get('nivel_ensenanza').value || 0,
      area_id: this.formHeader.get('facultad').value || '',
      programa_estudio_id: this.formHeader.get('programa_estudio').value || 0,
      predefinido: this.formHeader.get('predefinido').value ? '1' : '0',
      estado: this.formHeader.get('estado').value ? '1' : '0',
    };
    if (this.action === 'new') {
      this.generalService.addNameData$(serviceName, data).subscribe(
        (res: any) => {
          if (res.success) {
            this.activeModal.close('ok');
          }
        },
        () => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    } else if (this.action === 'edit') {
      this.generalService.updateNameIdData$(serviceName, this.areaRol.id, data).subscribe(
        (res: any) => {
          if (res.success) {
            this.activeModal.close('ok');
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

  closeModal() {
    this.activeModal.close('ok');
  }
}
