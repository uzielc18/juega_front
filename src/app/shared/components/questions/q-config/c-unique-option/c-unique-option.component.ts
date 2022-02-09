import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { DIRECTORY } from 'src/app/shared/directorios/directory';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-c-unique-option',
  templateUrl: './c-unique-option.component.html',
  styleUrls: ['./c-unique-option.component.scss']
})
export class CUniqueOptionComponent implements OnInit, OnChanges {
  @Input() headParams:any;
  @Output() loadings: EventEmitter<boolean> = new EventEmitter();
  arrayUnique:any = [
    {
        id: 0,
        question_id: 0,
        option: '',
        puntos: 0,
        correcto: 0,
        checked: false,
        orden: 1,
        estado: 1,
        imagen: '',
        base64: '',
    },
    {
        id: 0,
        question_id: 0,
        option: '',
        puntos: 0,
        correcto: 0,
        checked: false,
        orden: 1,
        estado: 1,
        imagen: '',
        base64: '',
    }
  ];
  key_file:any;
  directorio = DIRECTORY.base;
  constructor(private generalServi: GeneralService) { }
  ngOnChanges():void {
    this.headParams = this.headParams;
    console.log(this.headParams);
    
  }
  ngOnInit(): void {
    this.valueKey();
  }
  valueKey() {
    this.key_file = 'bbbbb' + '_' + '00000000001' + '_' + Math.floor(Math.random() * 90000) + 10000;
  }

  valueFile($event: any, item:any) {
    item.imagen = $event.value.nombre_s3;
    item.base64 = $event.value.base64;
  }
  pushedObject() {
    const atributios:any = {
        id: 0,
        question_id: 0,
        option: '',
        puntos: 0,
        correcto: 0,
        checked: false,
        orden: 1,
        estado: 1,
        imagen: '',
        base64: '',
    };
    this.arrayUnique.push(atributios);
  }
  saveQuestion() {
    const array = this.arrayUnique.filter((re:any) => re.checked === true);
    if (array.length>0) {
      this.arrayUnique.map((r:any) => {
        if (r.checked === true) {
          r.correcto = 1;
        } else {
          r.correcto = 0;
        }
      });
    const serviceName = '';
    const params:any = {
      section_id: 0,
      type_alternative_id: 0,
      exam_id: 0,
      question_id: 0,
      pregunta: this.headParams.pregunta,
      help: '',
      orden: this.headParams.orden || '',
      url_video: this.headParams.url_video || '',
      key_video: this.headParams.key_video || '',
      adjunto: this.headParams.adjunto || '',
      estado: this.headParams.estado,
      codigo: '01',
      nombre: 'Opcion unica',
      component: 'multiple-choice',
      componentEdit: false,
      alternatives: this.arrayUnique || [], 
    };
    if (params && params.pregunta && params.alternatives.length>0) {
      this.loadings.emit(true);
          this.generalServi.addNameData$(serviceName, params).subscribe(r => {
            if (r.success) {
            }
          }, () => { this.loadings.emit(true); }, () => { this.loadings.emit(true); });
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
  deleteOption(i:any) {
    this.arrayUnique.splice(i, 1);
  }
  get validButom() {
    if (this.arrayUnique.length>0) {
      const array = this.arrayUnique.filter((r:any) => !r.nombre || r.puntos < 0 || r.puntos === null || r.puntos === '');
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
    this.arrayUnique = [];
  }
  valueChange(item:any) {

    this.arrayUnique.map((res:any) => {
      res.checked = false;
    });
    item.checked = true;
  }
}