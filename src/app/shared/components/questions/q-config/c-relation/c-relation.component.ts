import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { DIRECTORY } from 'src/app/shared/directorios/directory';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-c-relation',
  templateUrl: './c-relation.component.html',
  styleUrls: ['./c-relation.component.scss']
})
export class CRelationComponent implements OnInit {
  @Input() headParams: any;
  @Output() loadings: EventEmitter<boolean> = new EventEmitter();
  directorio: any = DIRECTORY.base;
  key_file: any;

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
      id: 0,
      question_id: 0,
      relacion: '',
      imagen: '',
      base64: '',
      resp: '',
      resp_img: '',
      resp_imagen_base64: '',
      puntos: 0,
      correcto: 0,
      orden: 1,
      estado: 1,
    },
  ]

  constructor(private generalServi: GeneralService) { }
  ngOnChanges(): void {
    this.headParams = this.headParams;
  }
  ngOnInit(): void {
    this.valueKey();
  }
  valueKey() {
    this.key_file = 'rrrr' + '_' + '00000000001' + '_' + Math.floor(Math.random() * 90000) + 10000;
  }

  valueFile($event: any, item: any) {
    console.log($event);
    item.imagen = $event.value.nombre_s3;
    item.base64 = $event.value.base64;
  }

  valueFileResp($event: any, item: any) {
    console.log($event);
    item.resp_imagen = $event.value.nombre_s3;
    item.resp_imagen_base64 = $event.value.base64;
  }

  pushedObject() {
    const option = {
      id: 0,
      question_id: 0,
      relacion: '',
      imagen: '',
      base64: '',
      resp: '',
      resp_imagen: '',
      resp_imagen_base64: '',
      puntos: 0,
      correcto: 0,
      orden: 1,
      estado: 1,
    }
    this.relationList.push(option);
  }
  saveQuestion() {

    this.secondList = JSON.parse(JSON.stringify(this.relationList));
    this.secondList.forEach(object => {
      object.relacion = object.resp;
      object.imagen = object.resp_imagen;
      delete object['resp'];
      delete object['resp_imagen'];
    });

    // const array = this.relationList.filter((re: any) => re.checked === true);
    // if (array.length > 0) {
    //   this.relationList.map((r: any) => {
    //     if (r.checked === true) {
    //       r.correcto = 1;
    //     } else {
    //       r.correcto = 0;
    //     }
    //   });
    //   const serviceName = '';
    //   const params: any = {
    //     section_id: 0,
    //     type_alternative_id: 0,
    //     exam_id: 0,
    //     question_id: 0,
    //     pregunta: this.headParams.pregunta,
    //     help: '',
    //     orden: this.headParams.orden || '',
    //     url_video: this.headParams.url_video || '',
    //     key_video: this.headParams.key_video || '',
    //     adjunto: this.headParams.adjunto || '',
    //     estado: this.headParams.estado,
    //     codigo: '01',
    //     nombre: 'Relacionar',
    //     component: 'multiple-choice',
    //     componentEdit: false,
    //     alternatives: this.relationList || [],
    //   };
    //   if (params && params.pregunta && params.alternatives.length > 0) {
    //     this.loadings.emit(true);
    //     this.generalServi.addNameData$(serviceName, params).subscribe(r => {
    //       if (r.success) {
    //       }
    //     }, () => { this.loadings.emit(true); }, () => { this.loadings.emit(true); });
    //   }
    // } else {
      // Swal.fire({
      //   title: 'Recuerda',
      //   text: 'Debe relacionar',
      //   backdrop: true,
      //   icon: 'question',
      //   // animation: true,
      //   showCloseButton: true,
      //   showCancelButton: true,
      //   showConfirmButton: true,
      //   confirmButtonColor: '#7f264a',
      //   confirmButtonText: 'Ok',
      //   // timer: 2000,
      // });
    // }
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
