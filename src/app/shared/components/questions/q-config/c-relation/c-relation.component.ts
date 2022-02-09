import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { DIRECTORY } from 'src/app/shared/directorios/directory';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-c-relation',
  templateUrl: './c-relation.component.html',
  styleUrls: ['./c-relation.component.scss']
})
export class CRelationComponent implements OnInit {
  @Input() headParams: any;
  @Input() item: any;
  @Output() loadings: EventEmitter<boolean> = new EventEmitter();
  directorio: any = DIRECTORY.base;
  key_file: any;
  key_file_resp: any;

  abecedario: any = [
         "a", "b", "c", "d",
    "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n",
    "o", "p", "q", "r", "s",
    "t", "u", "v", "w", "x",
    "y", "z"
  ];

  secondList: any[] = [];
  relationList: any = [
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

  constructor(private generalServi: GeneralService) { }
  ngOnChanges(): void {
    this.headParams = this.headParams;
    this.item = this.item;
  }
  ngOnInit(): void {
    this.valueKey();
  }
  valueKey() {
    this.key_file = 'rrrr' + '_' + '00000000001' + '_' + Math.floor(Math.random() * 90000) + 10000;
    this.key_file_resp = 'rsrs' + '_' + '00000000001' + '_' + Math.floor(Math.random() * 90000) + 10000;
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
    });
    this.relationList.forEach((object: any) => {
      delete object['resp'];
      delete object['resp_imagen'];
      delete object['resp_imagen_base64'];
    });

    const alternativas = {
      'arrayA': this.relationList,
      'arrayB': this.secondList
    };

    console.log(alternativas);
    this.relationList = [
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

    const serviceName = END_POINTS.base_back.quiz + '/questions';
    const params: any = {
      section_id: this.item.section_id,
      type_alternative_id: this.headParams.type_alternative.id,
      exam_id: this.item.exam_id,
      pregunta: this.headParams.pregunta,
      help: '',
      url_video: this.headParams.url_video || '',
      key_video: this.headParams.key_video || '',
      adjunto: this.headParams.adjunto || '',
      codigo: this.headParams.type_alternative.codigo,
      alternatives: alternativas || {},
    };
    if (params && params.pregunta && Object.keys(params.alternatives).length > 0) {
      this.loadings.emit(true);
      this.generalServi.addNameData$(serviceName, params).subscribe(r => {
        if (r.success) {
        }
      }, () => { this.loadings.emit(true); }, () => { this.loadings.emit(true); });
    }

  }
  deleteItemFile(item: any) {
    item.base64 = '';
  }
  deleteSecondItemFIle(itema: any) {
    itema.resp_imagen_base64 = '';
  }
  deleteOption(i: any) {
    this.relationList.splice(i, 1);
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
    this.relationList = [];
  }
}
