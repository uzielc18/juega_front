import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { DIRECTORY, DIRECTORY_ELEMENTS } from 'src/app/shared/directorios/directory';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-c-multi-option',
  templateUrl: './c-multi-option.component.html',
  styleUrls: ['./c-multi-option.component.scss']
})
export class CMultiOptionComponent implements OnInit, OnChanges {
  @Input() headParams:any;
  @Input() itemQuiz:any;
  @Input() item: any = [];
  @Input() keyFile:any;
  @Output() loadings: EventEmitter<boolean> = new EventEmitter();
  @Output() changeSuccess: EventEmitter<any> = new EventEmitter();
  arrayMultiple:any = [
    {
      option: '',
      puntos: 0,
      correcto: 0,
      checked: false,
      orden: '',
      imagen: '',
      base64: '',
  },
  {
      option: '',
      puntos: 0,
      correcto: 0,
      checked: false,
      orden: '',
      imagen: '',
      base64: '',
  }
  ];
  directorio = DIRECTORY.exam;
  loading: boolean = false;
  constructor(private generalServi: GeneralService) { }
  ngOnChanges():void {
    this.headParams = JSON.parse(JSON.stringify(this.headParams));
    this.itemQuiz = JSON.parse(JSON.stringify(this.itemQuiz));
    this.keyFile = JSON.parse(JSON.stringify(this.keyFile));
    // console.log(this.itemQuiz);

    if (this.headParams?.code === 'UPDATE') {
      this.setUpdate();
    }

  }
  ngOnInit(): void {
  }


  valueFile($event: any, item:any) {
    item.imagen = $event.value.nombre_s3;
    item.base64 = $event.value.base64;
  }
  pushedObject() {
    const atributios:any = {
      option: '',
      puntos: 0,
      correcto: 0,
      checked: false,
      orden: '',
      imagen: '',
      base64: '',
    };
    this.arrayMultiple.push(atributios);
  }
  saveQuestion() {
    const array = this.arrayMultiple.filter((re:any) => re.checked === true);
    if (array.length>0) {
      const newArray = JSON.parse(JSON.stringify(this.arrayMultiple));
      newArray.forEach((r:any, index:any) => {
        r.orden = index + 1;
        if (r.checked === true) {
          r.correcto = 1;
        } else {
          r.correcto = 0;
        }
        delete r['base64'];
        delete r['checked'];
        delete r['nivel'];
        if (this.headParams.code === 'UPDATE') {
          r.question_id = this.itemQuiz.id;
        }
      });
    const serviceName = END_POINTS.base_back.quiz + '/questions';
    const params:any = {
      section_id: this.itemQuiz.section_id,
      type_alternative_id: this.headParams.type_alternative.id,
      exam_id: this.itemQuiz.exam_id,
      pregunta: this.headParams.pregunta,
      help: '',
      orden: this.headParams.orden || '',
      url_video: this.headParams.url_video || '',
      key_video: this.headParams.key_video || '',
      adjunto: this.headParams.adjunto || '',
      // estado: this.headParams.estado,
      codigo: this.headParams.type_alternative.codigo,
      alternativas: newArray || [],
    };
    if (params && params.pregunta && params.alternativas.length>0) {
      if (this.headParams.code === 'NEW') {
        this.loadings.emit(true);
            this.generalServi.addNameData$(serviceName, params).subscribe(r => {
              if (r.success) {
                this.changeSuccess.emit('ok');
              }
            }, () => { this.loadings.emit(false); }, () => { this.loadings.emit(false); });
      } else {
        this.loadings.emit(true);
            this.generalServi.updateNameIdData$(serviceName, this.itemQuiz.id, params).subscribe(r => {
              if (r.success) {
                this.changeSuccess.emit('ok');
              }
            }, () => { this.loadings.emit(false); }, () => { this.loadings.emit(false); });
      }
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
  deleteOption(i:any, item:any) {
    const serviceName = END_POINTS.base_back.quiz + '/options';
    if (item && item.id) {
      Swal.fire({
        title: 'Eliminar',
        text: '¿ Desea eliminar ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.generalServi.deleteNameId$(serviceName, item.id).subscribe(r => {
            if (r.success) {
              this.arrayMultiple.splice(i, 1);
            }
          }, () => { this.loading = false; }, () => { this.loading = false; });
        }
      });
    } else {
      this.arrayMultiple.splice(i, 1);
    }
  }
  get validButom() {
    if (this.arrayMultiple.length>0) {
      const array = this.arrayMultiple.filter((r:any) => !r.option || r.puntos < 0 || r.puntos === null || r.puntos === '');
      if (array.length>0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  cancel() {
    this.arrayMultiple = [];
  }
  valueChange(item:any) {
    item.puntos = '';
  }
  shift(index1: number, index2: number): void {
    const data = [...this.arrayMultiple];
    if (index2 > 0 && index1 < data.length - 1) {
        [data[index1], data[index2]] = [data[index2], data[index1]];
        this.arrayMultiple = data;
    }
  }
  setUpdate() {
    this.arrayMultiple = [];
    this.arrayMultiple = this.itemQuiz.alternativas  || [];
    if (this.arrayMultiple.length>0) {
      this.arrayMultiple.map((r:any) => {
          r.checked = false;
        if (r.correcto === 1) {
          r.checked = true;
        }
      });
    }
  }
}
