import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-public-config-question',
  templateUrl: './public-config-question.component.html',
  styleUrls: ['./public-config-question.component.scss']
})
export class PublicConfigQuestionComponent implements OnInit, OnChanges {
  formHeader: any = FormGroup;
  min: any = Date;
  @Input() item:any;
  @Input() userInfo:any;
  loading:boolean = false;
  listIntentos = ['1','2','3','4','5'];
  @Output() saveValues = new EventEmitter<any>();
  @Output() loadings: EventEmitter<boolean> = new EventEmitter();
  @Input() examInfo:any;
  constructor(private formBuilder: FormBuilder, private generalServi: GeneralService, dateService: NbDateService<Date>,public datepipe: DatePipe) {
    let date:any = Date;
    date = dateService.today();
    this.min = dateService.addDay(date, 0);
  }
  ngOnChanges():void {
    if (this.examInfo) {
      this.examInfo = JSON.parse(JSON.stringify(this.examInfo));
      // console.log(this.examInfo, 'daos');
    }
    
  }
  ngOnInit(): void {
    this.fieldReactive();
    
  }
  private fieldReactive() {
    const controls = {
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      hora_fin: ['', [Validators.required]],
      duracion: ['', [Validators.required]],
      aleatorio: ['0', [Validators.required]],
      mostrar_respuestas: [true],
      mostrar_nota: [true],
      supervisado: [false],
      tipo_supervisado: [''],
      paginado: ['none', [Validators.required]],
      intentos: ['', [Validators.required]],
      type_fin_exam: ['fin', [Validators.required]],
      tipo_num_alternativa: ['letras', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    // console.log(this.item, 'holas');
    if (this.item) {
      this.setObjectUpdate();
    }
  }
 
  setObjectUpdate() {
    if (this.item) {
          const f_h_ini = this.item.fecha_inicio.split(' ');
          const f_h_fin = this.item.fecha_fin.split(' ');
          // const f_h_gracia = this.item.fecha_gracia.split(' ');

          this.formHeader.patchValue({

            titulo:                   this.item.titulo,
            descripcion:              this.item.descripcion,

            fecha_inicio:             this.renderDate(f_h_ini[0]),
            fecha_fin:                this.renderDate(f_h_fin[0]),
            hora_inicio:              this.renderTime(f_h_ini[0], f_h_ini[1]),
            hora_fin:                 this.renderTime(f_h_fin[0], f_h_fin[1]),

            duracion:                 this.item.duracion,
            intentos:                 this.item.intentos,

            aleatorio:                this.item.exam?.aleatorio,
            paginado:                 this.item.exam?.paginado,
            mostrar_respuestas:       this.item.exam?.mostrar_respuestas === 'NO' ? false : true,
            mostrar_nota:             this.item.exam?.mostrar_nota  === 'NO' ? false : true,
            supervisado:              (!this.item.exam?.supervisado || this.item.exam?.supervisado === '0') ? false : true,
            tipo_supervisado:         !this.item.exam?.supervisado ? '0' : this.item.exam?.supervisado,

            type_fin_exam:             this.item.exam?.type_fin_exam,
            tipo_num_alternativa:      this.item.exam?.tipo_num_alternativa,
          });
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
  renderTime(date: any, time:any) {
    if (date && time) {
      const fecha = date.split('-');
      const f = (fecha[0]).toString() + '-' + (fecha[1]).toString() + '-' + (fecha[2]).toString() + ' ' + time.toString();
      var n = new Date(f);
      if (n) {
        return n;
      } else {
        return '';
      }
    }
    return '';
  }
  valueToogle($event:any) {
    // console.log($event);
    if (!$event) {
      this.formHeader.controls['tipo_supervisado'].setValue('0');
    }
  }
  get validCampos(): any {
    const form = this.formHeader.value;
    if (
       !form.titulo ||
       !form.descripcion ||
       !form.fecha_inicio ||
       !form.fecha_fin ||
       !form.hora_inicio ||
       !form.hora_fin) {
      return true;
    } else {
      return false;
    }
  }

  saveInfos(val:any) {
    const forms = this.formHeader.value;
    const serviceName = END_POINTS.base_back.elements;

    const f_inicio = this.datepipe.transform(forms.fecha_inicio, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_inicio, 'HH:mm');
    const f_fin = this.datepipe.transform(forms.fecha_fin, 'yyyy-MM-dd') + ' ' + this.datepipe.transform(forms.hora_fin, 'HH:mm');
    const params:any = {
      intentos:                 forms.intentos,

      titulo:                   forms.titulo,
      descripcion:              forms.descripcion,

      fecha_inicio:             f_inicio,
      fecha_fin:                f_fin,
      duracion:                 forms.duracion,

      evaluacion: {
        aleatorio:              forms.aleatorio,
        paginado:               forms.paginado,
        mostrar_respuestas:     forms.mostrar_respuestas === false ? 'NO' : 'SI',
        mostrar_nota:           forms.mostrar_nota === false ? 'NO' : 'SI',
        supervisado:            forms.tipo_supervisado,

        type_fin_exam:          forms.type_fin_exam,
        tipo_num_alternativa:   forms.tipo_num_alternativa,
      }
    };
     if (val === '2') {
      params.visibilidad = '1';
     }

    if (!this.validCampos) {
      this.loadings.emit(true);
      this.generalServi.updateNameIdData$(serviceName, this.item.id, params).subscribe(r => {
        if (r.success) {
            const datos = {
              save_close: 'ok',
              values: r.data,
            }
            this.saveValues.emit(datos);
        }
      }, () => { this.loadings.emit(false); }, () => { this.loadings.emit(false); });
    }
  }

  changeAleatorio($event:any) {
    if ($event !== '0') {
      this.formHeader.controls['paginado'].setValue('none');
    }
  }
}
// api elements