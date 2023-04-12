import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-m-new-encuentros',
  templateUrl: './m-encuentros-barras.component.html',
  styleUrls: ['./m-encuentros-barras.component.scss']
})
export class MEncuentrosBarrasComponent implements OnInit {

  loading: boolean = false
  fromEncuentros: any = FormGroup
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;

  constructor(public activeModal: NbDialogRef<MEncuentrosBarrasComponent>,
              private fb: FormBuilder,
              private datePipe: DatePipe,
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
      local_name: [''],
      rival_name: [''],
      local_codigo: [''],
      rival_codigo: [''],
      local: [''],
      local_color: [''],
      rival_color: [''],
      visitante: [''],
      estado: ['1'],
      e_p: [100],
      r_p: [100],
      e_u: [100],
      r_u: [100],
      r_c_d_j: [''],
      e_c_d_j : [''],
      e_f_i : [''],
      r_f_i : [''],
      e_t_r_c_a: [''],
      r_t_r_c_a : [''],
      e_a_c_b : [''],
      r_a_c_b : ['']
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
      estado_encuentro: this.item.estado_encuentro,
      local_name: this.item.local_name,
      rival_name: this.item.rival_name,
      local_codigo: this.item.local_codigo,
      rival_codigo: this.item.rival_codigo,
      local: this.item.local,
      local_color: this.item.local_color,
      rival_color: this.item.rival_color,
      visitante: this.item.visitante,
      e_p: this.item.e_p,
      r_p: this.item.r_p,
      e_u: this.item.e_u,
      r_u: this.item.r_u,
      r_c_d_j: this.item.r_c_d_j,
      e_c_d_j : this.item.e_c_d_j,
      e_f_i : this.item.e_f_i,
      r_f_i : this.item.r_f_i,
      e_t_r_c_a: this.item.e_t_r_c_a,
      r_t_r_c_a : this.item.r_t_r_c_a,
      e_a_c_b : this.item.e_a_c_b,
      r_a_c_b : this.item.r_a_c_b

    })
  }

  closeModal() {
    this.activeModal.close('close');
  }

  save(estado:any) {
    const serviceName = 'upeuencuentros';
    const forms = this.fromEncuentros.value;
    var hora_int=forms.hora;
    if(this.code === 'NEW'){
      hora_int=this.datePipe.transform(forms.hora, 'HH:mm:ss');
    }

    if (this.code === 'NEW') {
      const params = {
        estado: forms.estado,
        upeuequipo_id: forms.upeuequipo_id,
        upeurival_id: forms.upeurival_id,
        fecha: forms.fecha,
        hora: hora_int,
        lugar: forms.lugar,
        etapa: forms.etapa
      };
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
      const params = {
        estado: forms.estado,
        upeuequipo_id: forms.upeuequipo_id,
        upeurival_id: forms.upeurival_id,
        fecha: forms.fecha,
        hora: hora_int,
        lugar: forms.lugar,
        etapa: forms.etapa,
        empate: forms.empate,
        estado_encuentro: estado,
        e_p: forms.e_p,
        r_p: forms.r_p,
        e_u: forms.e_u,
        r_u: forms.r_u,
        r_c_d_j: forms.r_c_d_j,
        e_c_d_j : forms.e_c_d_j,
        e_f_i : forms.e_f_i,
        r_f_i : forms.r_f_i,
        e_t_r_c_a: forms.e_t_r_c_a,
        r_t_r_c_a : forms.r_t_r_c_a,
        e_a_c_b : forms.e_a_c_b,
        r_a_c_b : forms.r_a_c_b
      };
      this.loading = true;
      this.generalService.updateNameIdData$(serviceName, this.item.id, params).subscribe((res: any) => {
        if (res.success) {
          this.item.estado_encuentro=res.data.estado_encuentro;
          if(estado!=='encurso'){
            this.activeModal.close('ok');
          }
        }
      }, () => {
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    }
  }

}
