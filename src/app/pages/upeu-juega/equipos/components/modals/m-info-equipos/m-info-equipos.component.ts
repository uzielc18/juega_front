import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";


@Component({
  selector: 'app-m-disciplinas',
  templateUrl: './m-info-equipos.component.html',
  styleUrls: ['./m-info-equipos.component.scss']
})
export class MInfoEquiposComponent implements OnInit {

  loading:boolean = false
  formInfo: any = FormGroup
  defaultIcon:any = 'info-outline';
  //color_active2 = new FormControl('')
  @Input() item: any;
  @Input() code: any;
  @Input() userInfo: any;
  constructor(public activeModal: NbDialogRef<MInfoEquiposComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive() {
    const controls = {
      nombre: ['',[Validators.required]],
      equipo_id: ['',[Validators.required]],
      categorias_equipo_id: ['',[Validators.required]],
      disciplina_id: ['',[Validators.required]],
      delegado: ['',[Validators.required]],
      codigo: ['',[Validators.required]],
      color: ['#000',[Validators.required]],
      estado: ['1'],
    };
    this.formInfo = this.fb.group(controls)
    this.setData();
    console.log(this.item);
  }

  setData(){
    this.formInfo.patchValue({
      nombre: this.item.nombre,
      equipo_id: this.item.id,
      categorias_equipo_id: this.item.upeucategorias_equipo_id,
      disciplina_id: this.item.upeudisciplina_id,
      delegado: this.item.delegado,
      codigo: this.item.codigo,
      color: this.item.color_info,
      estado: this.item.estado,
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
  save(){
    const serviceName = 'upeuInfoequipos';
    const forms = this.formInfo.value;
    const params = {
      nombre: forms.nombre.toUpperCase(),
      equipo_id: forms.equipo_id,
      categorias_equipo_id: forms.categorias_equipo_id,
      disciplina_id: forms.disciplina_id,
      delegado: forms.delegado,
      codigo: forms.codigo,
      color: forms.color,
      estado: forms.estado,
      //userId: this.userInfo.id
    };
    if (this.code === 'NEW') {
      this.loading = true;
      this.generalService.addNameData$(serviceName, params).subscribe((res:any) => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});

    } else {
      this.loading = true;
      this.generalService.updateNameIdData$(serviceName, this.item.info_id, params).subscribe((res:any) => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});
    }
  }

}
