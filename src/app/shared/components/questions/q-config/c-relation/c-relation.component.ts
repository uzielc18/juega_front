import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { DIRECTORY } from 'src/app/shared/directorios/directory';
import { END_POINTS } from 'src/app/providers/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-relation',
  templateUrl: './c-relation.component.html',
  styleUrls: ['./c-relation.component.scss']
})
export class CRelationComponent implements OnInit {
  @Input() headParams: any;
  @Input() itemQuiz: any;
  @Input() keyFile:any;
  @Input() relationList: any = [
    {
      relacion: '',
      imagen: '',
      base64: '',
      resp: '',
      resp_imagen: '',
      resp_imagen_base64: '',
      puntos: 0,
    },
  ]
  secondList: any[] = [];
  @Input() code: any;
  @Output() loadings: EventEmitter<boolean> = new EventEmitter();
  @Output() changeSuccess: EventEmitter<any> = new EventEmitter();
  directorio: any = DIRECTORY.exam;
  loading: boolean = false;

  abecedario: any = [
    "a", "b", "c", "d",
    "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n",
    "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x",
    "y", "z"
  ];

  constructor(private generalServi: GeneralService) { }
  ngOnChanges(): void {
    this.headParams = JSON.parse(JSON.stringify(this.headParams));
    this.itemQuiz = JSON.parse(JSON.stringify(this.itemQuiz));
    this.keyFile = JSON.parse(JSON.stringify(this.keyFile));
    if (this.headParams?.code === 'UPDATE') {
      this.setUpdate();
    }
  }
  ngOnInit(): void {
  }

  valueFile($event: any, item: any) {
    item.imagen = $event.value.nombre_s3;
    item.base64 = $event.value.base64;
  }

  valueFileResp($event: any, item: any) {
    item.resp_imagen = $event.value.nombre_s3;
    item.resp_imagen_base64 = $event.value.base64;
  }

  pushedObject() {
    const option = {
      relacion: '',
      imagen: '',
      base64: '',
      resp: '',
      resp_imagen: '',
      resp_imagen_base64: '',
      puntos: 0,
    }
    this.relationList.push(option);
  }
  saveQuestion() {
    this.secondList = JSON.parse(JSON.stringify(this.relationList));
    this.secondList.forEach((object: any) => {
      object.relacion = object.resp;
      object.imagen = object.resp_imagen;
      object.base64 = object.resp_imagen_base64;
      object.puntos = 0;
      delete object['resp'];
      delete object['resp_imagen'];
      delete object['resp_imagen_base64'];
      if (this.headParams.code === 'UPDATE') {
        object.question_id = this.itemQuiz.id;
      }
    });
    this.relationList.forEach((object: any) => {
      delete object['resp'];
      delete object['resp_imagen'];
      delete object['resp_imagen_base64'];
      if (this.headParams.code === 'UPDATE') {
        object.question_id = this.itemQuiz.id;
      }
    });

    const alternativas = {
      'arrayA': this.relationList,
      'arrayB': this.secondList
    };

    const serviceName = END_POINTS.base_back.quiz + '/questions';
    const params: any = {
      section_id: this.itemQuiz.section_id,
      type_alternative_id: this.headParams.type_alternative.id,
      exam_id: this.itemQuiz.exam_id,
      pregunta: this.headParams.pregunta,
      help: '',
      orden: this.headParams.orden || '',
      url_video: this.headParams.url_video || '',
      key_video: this.headParams.key_video || '',
      adjunto: this.headParams.adjunto || '',
      codigo: this.headParams.type_alternative.codigo,
      alternativas: alternativas || {},
    };
    if (params && params.pregunta && Object.keys(params.alternativas).length > 0) {
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

    this.relationList = [];
  }
  deleteItemFile(item: any) {
    item.base64 = '';
  }
  deleteSecondItemFIle(itema: any) {
    itema.resp_imagen_base64 = '';
  }
  deleteOption(i: any, item: any) {
    const serviceName = END_POINTS.base_back.quiz + '/options';
    if (item && item.id) {
      Swal.fire({
        title: 'Eliminar',
        text: '¿ Desea eliminar ? ',
        backdrop: true,
        icon: 'question',
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.loading = true;
          // console.log(item, 'hihjo');
          this.generalServi.deleteNameId$(serviceName, item.id).subscribe(r => {
            if (r.success) {
              this.relationList.splice(i, 1);
            }
          }, () => { this.loading = false; }, () => { this.loading = false; });
        }
      });
    } else {
      this.relationList.splice(i, 1);
    }
  }

  get validButom() {
    if (this.relationList.length > 0) {
      const array = this.relationList.filter((r: any) => !r.relacion || !r.resp || r.puntos < 0 || r.puntos === null);
      if (array.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  cancel() {
    this.relationList = {};
  }

  shift(index1: number, index2: number): void {
    const data = [...this.relationList];
    if (index2 > 0 && index1 < data.length - 1) {
      [data[index1], data[index2]] = [data[index2], data[index1]];
      this.relationList = data;
    }
  }

  setUpdate() {
    this.relationList = [];
    this.secondList = [];
    this.relationList = this.itemQuiz.alternativas.arrayA || [];
    this.secondList = this.itemQuiz.alternativas.arrayB || [];

    this.secondList.forEach((object: any) => {
      object.resp = object.relacion;
      object.resp_imagen = object.imagen;
      delete object['relacion'];
      delete object['imagen'];
    });

    this.relationList.forEach((object: any, i: any) => {
      object.resp = this.secondList[i].resp;
      object.resp_imagen = this.secondList[i].resp_imagen;
    })
  }
}
