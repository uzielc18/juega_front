import {Component, Input, OnInit} from '@angular/core';
import {NbDateService, NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../../providers";

@Component({
  selector: 'app-m-unit',
  templateUrl: './m-unit.component.html',
  styleUrls: ['./m-unit.component.scss']
})
export class MUnitComponent implements OnInit {

  loading:boolean = false
  FormUnit: any = FormGroup;
  min: any = Date;
  @Input() item: any;
  @Input() unit:any;
  @Input() code: any;
  @Input() userInfo: any;
  @Input() idCargarDocente: any;
  constructor(public activeModal: NbDialogRef<MUnitComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService,
              dateService: NbDateService<Date>) {

    let date: any;
    date = dateService.today();
    this.min = dateService.addDay(date, -1);
  }

  ngOnInit(): void {
    this.reactiveForm();
    //console.log(this.item)
  }

  private reactiveForm(){
    const controls = {
      orden_unidad: [this.unit.length + 1 || '',[Validators.required]],
      nombre: ['',[Validators.required]],
      fecha_inicio: ['',[Validators.required]],
      fecha_fin: ['',[Validators.required]],
      resultado_unidad: ['',[Validators.required]],
      resultado_aprendizaje:['',[Validators.required]]
    };
    this.FormUnit = this.fb.group(controls);
    if(this.code === 'UPDATE'){
      this.setUnit();
    }
  }
  saveUnit() {
    const serviceName = 'units';
    const forms = this.FormUnit.value;
    const params = {
      id_carga_curso_docente: this.item.id_carga_curso_docente,
      course_id: this.item.id,
      id_unidad: 0,
      userid: this.userInfo.id,
      orden_unidad: Number(forms.orden_unidad),
      nombre: forms.nombre,
      fecha_inicio: forms.fecha_inicio,
      fecha_fin: forms.fecha_fin,
      resultado_unidad: forms.resultado_unidad,
      resultado_aprendizaje: forms.resultado_aprendizaje
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
      this.generalService.updateNameIdData$(serviceName, this.item.id, params).subscribe((res:any) => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});
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
  setUnit(){
    this.FormUnit.patchValue({
      orden_unidad: this.item.orden_unidad,
      nombre: this.item.nombre,
      fecha_inicio: this.renderDate(this.item.fecha_inicio),
      fecha_fin: this.renderDate(this.item.fecha_fin),
      resultado_unidad: this.item.resultado_unidad,
      resultado_aprendizaje: this.item.resultado_aprendizaje,
    })
  }
  closeModal(){
    this.activeModal.close('close');
  }
}
