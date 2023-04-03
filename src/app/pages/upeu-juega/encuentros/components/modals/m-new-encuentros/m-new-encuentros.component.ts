import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";


@Component({
  selector: 'app-m-new-encuentros',
  templateUrl: './m-new-encuentros.component.html',
  styleUrls: ['./m-new-encuentros.component.scss']
})
export class MNewEncuentrosComponent implements OnInit {

  loading: boolean = false
  fromEncuentros: any = FormGroup
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;

  constructor(public activeModal: NbDialogRef<MNewEncuentrosComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) {
  }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      upeuequipo_id: ['', [Validators.required]],
      upeurival_id: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      lugar: ['', [Validators.required]],
      etapa: ['', [Validators.required]],
      empate: [''],
      estado_encuentro: [''],
      score_equipo: [''],
      e_rojas: [''],
      e_amarillas: [''],
      e_faltas: [''],
      e_ganador: [''],
      score_rival: [''],
      r_rojas: [''],
      r_amarillas: [''],
      r_faltas: [''],
      r_ganador: [''],
      local_name: [''],
      rival_name: [''],
      local_codigo: [''],
      rival_codigo: [''],
      local: [''],
      local_color: [''],
      rival_color: [''],
      visitante: [''],
      estado: ['1'],
    };
    this.fromEncuentros = this.fb.group(controls)
    if (this.code === 'UPDATE') {
      this.setData();
    }
  }

  setData() {
    this.fromEncuentros.patchValue({
      estado: this.item.estado,
      upeuequipo_id: this.item.upeuequipo_id,
      upeurival_id: this.item.upeurival_id,
      fecha: this.item.fecha,
      hora: this.item.hora,
      lugar: this.item.lugar,
      etapa: this.item.etapa,
      empate: this.item.empate,
      estado_encuentro: this.item.estado_encuentro,
      score_equipo: this.item.score_equipo,
      e_rojas: this.item.e_rojas,
      e_amarillas: this.item.e_amarillas,
      e_faltas: this.item.e_faltas,
      e_ganador: this.item.e_ganador,
      score_rival: this.item.score_rival,
      r_rojas: this.item.r_rojas,
      r_amarillas: this.item.r_amarillas,
      r_faltas: this.item.r_faltas,
      r_ganador: this.item.r_ganador,
      local_name: this.item.local_name,
      rival_name: this.item.rival_name,
      local_codigo: this.item.local_codigo,
      rival_codigo: this.item.rival_codigo,
      local: this.item.local,
      local_color: this.item.local_color,
      rival_color: this.item.rival_color,
      visitante: this.item.visitante

    })
  }

  closeModal() {
    this.activeModal.close('close');
  }

  save(estado:any) {
    const serviceName = 'upeuencuentros';
    const forms = this.fromEncuentros.value;
    const params = {
      estado: forms.estado,
      upeuequipo_id: forms.upeuequipo_id,
      upeurival_id: forms.upeurival_id,
      fecha: forms.fecha,
      hora: forms.hora,
      lugar: forms.lugar,
      etapa: forms.etapa,
      empate: forms.empate,
      estado_encuentro: estado,
      score_equipo: forms.score_equipo,
      e_rojas: forms.e_rojas,
      e_amarillas: forms.e_amarillas,
      e_faltas: forms.e_faltas,
      e_ganador: forms.e_ganador,
      score_rival: forms.score_rival,
      r_rojas: forms.r_rojas,
      r_amarillas: forms.r_amarillas,
      r_faltas: forms.r_faltas,
      r_ganador: forms.r_ganador,
    };
    if (this.code === 'NEW') {
      this.loading = true;
      this.generalService.addNameData$(serviceName, params).subscribe((res: any) => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {
        this.loading = false;
      }, () => {
        this.loading = false;
      });

    } else {
      this.loading = true;
      this.generalService.updateNameIdData$(serviceName, this.item.id, params).subscribe((res: any) => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    }
  }

}
