import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { DIRECTORY } from 'src/app/shared/directorios/directory';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-c-unique-option',
  templateUrl: './c-unique-option.component.html',
  styleUrls: ['./c-unique-option.component.scss']
})
export class CUniqueOptionComponent implements OnInit, OnChanges {
  @Input() headParams:any;
  @Input() itemQuiz:any;
  @Input() keyFile:any;
  
  @Output() loadings: EventEmitter<boolean> = new EventEmitter();
  @Output() changeSuccess: EventEmitter<any> = new EventEmitter();
  arrayUnique:any = [
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
    // JSON.parse(JSON.stringify(this.headParams))
    this.headParams = JSON.parse(JSON.stringify(this.headParams));
    this.itemQuiz = JSON.parse(JSON.stringify(this.itemQuiz));
    this.keyFile = JSON.parse(JSON.stringify(this.keyFile));
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
    this.arrayUnique.push(atributios);
  }
  saveQuestion() {
    const array = this.arrayUnique.filter((re:any) => re.checked === true);
    if (array.length>0) {
      this.arrayUnique.map((r:any, index:any) => {
        r.orden = index + 1;
      });
      const newArray = JSON.parse(JSON.stringify(this.arrayUnique));
      newArray.forEach((r:any, index:any) => {
        r.orden = index + 1;
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
                  // const retorna = {
                  //   close: 'ok',
                  //   question: '', 
                  // }
                  // this.changeSuccess.emit(retorna);
                  this.changeSuccess.emit('ok');
                }
              }, () => { this.loadings.emit(false); }, () => { this.loadings.emit(false); });
        } else {
          this.loadings.emit(true);
              this.generalServi.updateNameIdData$(serviceName, this.itemQuiz.id, params).subscribe(r => {
                if (r.success) {
                  // const retorna = {
                  //   close: 'ok',
                  //   question: r.data, 
                  // }
                  // this.changeSuccess.emit(retorna);
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
              this.arrayUnique.splice(i, 1);
            }
          }, () => { this.loading = false; }, () => { this.loading = false; });
        }
      });
    } else {
      this.arrayUnique.splice(i, 1);
    }
  }
  get validButom() {
    if (this.arrayUnique.length>0) {
      const array = this.arrayUnique.filter((r:any) => !r.option || r.puntos < 0 || r.puntos === null || r.puntos === '');
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
      res.correcto = 0;
      res.checked = false;
    });
    item.checked = true;
    item.correcto = 1;
  }
  shift(index1: number, index2: number): void {
    const data = [...this.arrayUnique];
    if (index2 > 0 && index1 < data.length - 1) {
        [data[index1], data[index2]] = [data[index2], data[index1]];
        this.arrayUnique = data;
    }
  }
  setUpdate() {
    this.arrayUnique = [];
    this.arrayUnique = this.itemQuiz.alternativas || [];
    if (this.arrayUnique.length>0) {
      this.arrayUnique.map((r:any) => {
          r.checked = false;
        if (r.correcto === 1) {
          r.checked = true;
        }
      });
    }
  }
}