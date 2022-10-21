import {Component, Input, OnInit} from '@angular/core';
import {NbDateService, NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../../providers";

@Component({
  selector: 'app-m-session',
  templateUrl: './m-session.component.html',
  styleUrls: ['./m-session.component.scss']
})
export class MSessionComponent implements OnInit {

  loading: any = false;
  FormSession:any = FormGroup;
  min:any;
  @Input()unit: any;
  @Input()topics: any;
  @Input()code: any;
  @Input()userInfo: any;
  constructor(public activeModal: NbDialogRef<MSessionComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService,
              dateService: NbDateService<Date>) {
    let date: any;
    date = dateService.today();
    this.min = dateService.addDay(date, -1);
  }

  ngOnInit(): void {
    this.reactiveForms();
    if(this.code == 'UPDATE'){
    }
  }

  private reactiveForms(){
    const controls = {
      tema: [''],
      contenido: ['',[Validators.required]],
      fecha_tema: ['',[Validators.required]],
      //fecha_inicio: ['',[Validators.required]],
      //fecha_fin: ['',[Validators.required]],
      modo: ['',[Validators.required]],
      numero_semana: ['',[Validators.required]],
      orden_tema: [this.unit.topics.length + 1 || '', [Validators.required]]
    };
    this.FormSession = this.fb.group(controls);
    if(this.code == 'UPDATE'){
      this.setSession();
    }
  }
  renderDate(date: any) {
    if (date) {
      const fecha = date.split('-');
      var n = new Date(`${fecha[0]}-${fecha[1]}-${fecha[2]}`);
      n.setMinutes(n.getMinutes() + n.getTimezoneOffset()); //para solucionar la diferencia de minutos
      if (n.getDate()) {
        return n;
      } else {
        return '';
      }
    }
    return '';
  }
  setSession(){
    this.FormSession.patchValue({
      tema: this.topics.tema,
      contenido: this.topics.contenido,
      fecha_tema: this.renderDate(this.topics.fecha_tema),
      fecha_inicio: this.renderDate(this.topics.fecha_inicio),
      fecha_fin: this.renderDate(this.topics.fecha_fin),
      modo: this.topics.modo,
      numero_semana: this.topics.numero_semana,
      orden_tema: this.topics.orden_tema
    })
  }

  closeModal(){
    this.activeModal.close('close');
  }
  saveSession(){
    const serviceName = 'topics';
    const forms = this.FormSession.value;
    const params = {
      unit_id: this.unit.id,
      id_carga_curso_docente: this.unit.id_carga_curso_docente,
      id_carga_curso: this.unit.id_carga_curso,
      id_carga_tema: "0",
      orden_tema: forms.orden_tema,
      tema: forms.tema,
      contenido: forms.contenido,
      fecha_tema: forms.fecha_tema,
      fecha_inicio: forms.fecha_inicio,
      fecha_fin: forms.fecha_fin,
      modo: forms.modo,
      numero_semana: 2,
    };
    const paramsEdit = {
      unit_id: this.unit.unit_id,
      id_carga_curso_docente: this.unit.id_carga_curso_docente,
      id_carga_curso: this.unit.id_carga_curso,
      id_carga_tema: this.unit.id_carga_tema,
      orden_tema: forms.orden_tema,
      tema: forms.tema,
      contenido: forms.contenido,
      fecha_tema: forms.fecha_tema,
      fecha_inicio: forms.fecha_inicio,
      fecha_fin: forms.fecha_fin,
      modo: forms.modo,
      numero_semana: 2,
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
      this.generalService.updateNameIdData$(serviceName, this.topics.id, paramsEdit).subscribe((res:any) => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});
    }
  }
}
