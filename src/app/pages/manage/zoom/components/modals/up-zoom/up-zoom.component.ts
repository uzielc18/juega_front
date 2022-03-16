import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';

@Component({
  selector: 'app-up-zoom',
  templateUrl: './up-zoom.component.html',
  styleUrls: ['./up-zoom.component.scss']
})
export class UpZoomComponent implements OnInit {
  loading:boolean = false;
  @Input() item:any;
  @Input() code:any;
  @Input() datosMe:any;
  listProgramStudy:any = [];
  formHeader: any = FormGroup;
  ciclos = [{ciclo: '1'}, {ciclo:'2'}, {ciclo:'3'}, {ciclo:'4'}, {ciclo:'5'}, {ciclo:'6'}, {ciclo:'7'}, {ciclo:'8'}, {ciclo:'9'}, {ciclo:'10'}, {ciclo:'11'}, {ciclo:'12'}, {ciclo:'13'}, {ciclo:'14'}];
  constructor(public activeModal: NbDialogRef<UpZoomComponent>, private generalServi: GeneralService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.getProgramStudy()
  }
  private fieldReactive() {
    const controls = {
      id: ['', [Validators.required]],
      ciclo: ['', [Validators.required, Validators.max(12), Validators.maxLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
      grupo: ['UNICO', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    if (this.code === 'UPDATE') {
      this.setUpdate();
    }
  }
  closeModal() {
    this.activeModal.close('close');
  }
  getProgramStudy() {
    const serviceName = 'mis-programas';
    const ids = {
      person_id: this.datosMe.user.id || '',
    };
    if (ids && ids.person_id) {
      this.generalServi.nameId$(serviceName, ids.person_id).subscribe((res:any) => {
        this.listProgramStudy = res.data || [];
    });
  }
  }
  saveZoom() {
    const serviceName = 'zoomAcounts';
    const forms = this.formHeader.value;
    const val = this.listProgramStudy.find((re:any) => re.id === forms.id);
    const params = {
      programa_estudio_id: forms.id,
      id_programa_estudio: val.id_programa_estudio || '',
      ciclo: forms.ciclo,
      correo: forms.correo,
      clave: forms.clave,
      grupo: forms.grupo,
    };
    if (params && params.programa_estudio_id && params.id_programa_estudio) {
      this.loading = true;
      if (this.code === 'NEW') {
        this.generalServi.addNameData$(serviceName, params).subscribe((re:any) => {
          if (re.success) {
            this.activeModal.close('ok');
          }
        }, () => { this.loading =false; }, () => { this.loading =false; });
      } else {
        this.generalServi.updateNameIdData$(serviceName, this.item.id, params).subscribe((re:any) => {
          if (re.success) {
            this.activeModal.close('ok');
          }
        }, () => { this.loading =false; }, () => { this.loading =false; });
      }
    }
  }
  setUpdate() {
    const serviceName = 'zoomAcounts';
    if (this.item.id) {
      this.loading = true;
      this.generalServi.nameId$(serviceName, this.item.id).subscribe((re:any) => {
        if (re.success) {
          const items = re.data || '';
            this.formHeader.patchValue({
              id: items.id,
              ciclo: items.ciclo,
              correo: items.correo,
              clave: items.clave,
              grupo: items.grupo,
            })
        }
      }, () => { this.loading =false; }, () => { this.loading =false; });
    }
  }
}
