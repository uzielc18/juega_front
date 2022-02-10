import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { DIRECTORY } from 'src/app/shared/directorios/directory';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-c-true-false',
  templateUrl: './c-true-false.component.html',
  styleUrls: ['./c-true-false.component.scss']
})
export class CTrueFalseComponent implements OnInit, OnChanges {
  @Input() headParams:any;
  @Input() item:any;
  @Output() loadings: EventEmitter<boolean> = new EventEmitter();
  @Output() changeSuccess: EventEmitter<any> = new EventEmitter();
  arrayTrueFalse:any = [
    {
      option: 'VERDADERO',
      puntos: 0,
      correcto: 0,
      checked: false,
      orden: '',
      imagen: '',
      base64: '',
      color: 'rgb(155, 247, 151)',
    },
    {
      option: 'FALSO',
      puntos: 0,
      correcto: 0,
      checked: false,
      orden: '',
      imagen: '',
      base64: '',
      color: 'rgb(248, 193, 176)',
    }
  ];
  key_file:any;
  directorio = DIRECTORY.base;
  constructor(private generalServi: GeneralService) { }
  ngOnChanges():void {
    this.headParams = this.headParams;
    this.item = this.item;
  }
  ngOnInit(): void {
    this.valueKey();
  }
  valueKey() {
    this.key_file = 'ssss' + '_' + '00000000001';
  }

  valueFile($event: any, item:any) {
    item.imagen = $event.value.nombre_s3;
    item.base64 = $event.value.base64;
  }

  saveQuestion() {
    const array = this.arrayTrueFalse.filter((re:any) => re.checked === true);
    if (array.length>0) {
      this.arrayTrueFalse.map((r:any, index:any) => {
        r.orden = index + 1;
        if (r.checked === true) {
          r.correcto = 1;
        } else {
          r.correcto = 0;
        }
      });
      const serviceName = END_POINTS.base_back.quiz + '/questions';
      const params:any = {
        section_id: this.item.section_id,
        type_alternative_id: this.headParams.type_alternative.id,
        exam_id: this.item.exam_id,
        pregunta: this.headParams.pregunta,
        help: '',
        orden: this.headParams.orden || '',
        url_video: this.headParams.url_video || '',
        key_video: this.headParams.key_video || '',
        adjunto: this.headParams.adjunto || '',
        // estado: this.headParams.estado,
        codigo: this.headParams.type_alternative.codigo,
        alternativas: this.arrayTrueFalse || [], 
      };
      if (params && params.pregunta && params.alternativas.length>0) {
        this.loadings.emit(true);
            this.generalServi.addNameData$(serviceName, params).subscribe(r => {
              if (r.success) {
                this.changeSuccess.emit('ok');
              }
            }, () => { this.loadings.emit(false); }, () => { this.loadings.emit(false); });
      }
    
    } else {
      Swal.fire({
        title: 'Recuerda',
        text: 'Debe seleccionar una respuesta correcta ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Ok',
        // timer: 2000,
      });
    }

  }
  deleteItemFile(item:any) {
    item.base64 = '';
  }
  get validButom() {
    if (this.arrayTrueFalse.length>0) {
      const array = this.arrayTrueFalse.filter((r:any) => !r.option || r.puntos < 0 || r.puntos === null || r.puntos === '');
      if (array.length>0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  valueChange(item:any) {
    this.arrayTrueFalse.map((res:any) => {
      res.checked = false;
    });
    item.checked = true;
  }
  shift(index1: number, index2: number): void {
    const data = [...this.arrayTrueFalse];
    if (index2 > 0 && index1 < data.length - 1) {
        [data[index1], data[index2]] = [data[index2], data[index1]];
        this.arrayTrueFalse = data;
    }
  }
}
