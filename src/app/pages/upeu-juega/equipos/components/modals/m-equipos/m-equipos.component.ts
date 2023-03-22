import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-equipos',
  templateUrl: './m-equipos.component.html',
  styleUrls: ['./m-equipos.component.scss']
})
export class MEquiposComponent implements OnInit {

  @Input() campeonato:any;
  @Input() tabID: any;
  loading: boolean = false;
  equipos: any = []
  disciplinasData: any = []
  categoriasData: any = []
  formHeader: any = FormGroup;
  constructor(public activeModal: NbDialogRef<MEquiposComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldReactive()
  }
  private fieldReactive() {
    const controls = {
      diciplina: [this.tabID, [Validators.required]],
      categoria: ['', [Validators.required]],
      equipos: ['', [Validators.required]],
      grupos: ['', [Validators.required]],

    }
    this.formHeader = this.fb.group(controls);
    this.getDisciplina();
    this.getCategory();
  }

  closeModal() {
    this.activeModal.close('')
  }

  getDisciplina(){
    const serviceName = 'upeudisciplinas';
    const param={campeonato_id:this.campeonato.id,};
    this.loading = true;
    this.generalService.nameParams$(serviceName,param).subscribe(res => {
      this.disciplinasData = res.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

  getCategory(){
    this.loading = true
    const serviceName = 'upeucategoriasEquipos';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
      this.categoriasData = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }
  procesar(){
    this.loading = true
    const forms = this.formHeader.value;
    const param={
      disciplina_id:forms.diciplina,
      categorias_equipo_id:forms.categoria,
      grupo:forms.grupos,
      campeonato_id:this.campeonato.id || forms.campeonato_id,
      equi_x_grupo:forms.equipos,
    }
    const serviceName = 'equipos-procesar';
    this.generalService.nameParams$(serviceName,param).subscribe(resp => {
      this.equipos = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

  save(){
    const serviceName = 'equipos-procesar-save';
    const params = {
      equipos: this.equipos.equipos_save
    };
      this.loading = true;
      this.generalService.addNameData$(serviceName, params).subscribe((res:any) => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});

  }
}
