import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-c-open',
  templateUrl: './c-open.component.html',
  styleUrls: ['./c-open.component.scss']
})
export class COpenComponent implements OnInit, OnChanges {
  @Input() headParams:any;
  @Input() item:any;
  @Output() loadings: EventEmitter<boolean> = new EventEmitter();
  @Output() changeSuccess: EventEmitter<any> = new EventEmitter();
  arrayOpen:any = [
    {
      option: '',
      puntos: 0,
      correcto: 0,
      checked: false,
      orden: '',
      imagen: '',
      base64: '',
    },
  ]
  constructor(private generalServi: GeneralService) { }
  ngOnChanges():void {
    this.headParams = this.headParams;
    this.item = this.item;
  }
  ngOnInit(): void {
  }
  get validButom() {
    if (this.arrayOpen.length>0) {
      const array = this.arrayOpen.filter((r:any) => !r.option || r.puntos < 0 || r.puntos === null || r.puntos === '');
      if (array.length>0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  saveQuestion() {
    this.arrayOpen.map((r:any, index:any) => {
        r.orden = index + 1;
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
      alternativas: this.arrayOpen || [],
    };
    if (params && params.pregunta && params.alternativas.length>0) {
      this.loadings.emit(true);
          this.generalServi.addNameData$(serviceName, params).subscribe(r => {
            if (r.success) {
              this.changeSuccess.emit('ok');
            }
          }, () => { this.loadings.emit(false); }, () => { this.loadings.emit(false); });
    }

  }
}
