import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-v-exam-views',
  templateUrl: './v-exam-views.component.html',
  styleUrls: ['./v-exam-views.component.scss']
})
export class VExamViewsComponent implements OnInit, OnChanges {
  questions:any = [];
  info:any = '';
  @Input() person_id: any;
  @Input() pending_id: any;
  @Input() rol: any;
  @Output() loadingsQuestion: EventEmitter<boolean> = new EventEmitter();
  @Output() informacion: EventEmitter<any> = new EventEmitter();

  constructor(private service: GeneralService) { }
  ngOnChanges():void {
    this.person_id = JSON.parse(JSON.stringify(this.person_id));
    this.pending_id = JSON.parse(JSON.stringify(this.pending_id));
    this.rol = JSON.parse(JSON.stringify(this.rol));
    // console.log(this.person_id, this.pending_id, this.rol);
    this.questions = [];
    this.getViewQuestions();

  }
  ngOnInit(): void {
    setTimeout(() => {
      this.getViewQuestions();
    }, 2000);
  }
  getViewQuestions() {
      const serviceName = END_POINTS.base_back.quiz + '/view';
      if (this.person_id && this.pending_id && this.rol) {
        this.loadingsQuestion.emit(true);
        this.service.nameIdAndIdParams$(serviceName, this.pending_id, this.person_id, {rol: this.rol}).subscribe(res => {
          this.questions = res.data && res.data.data || [];
          this.info = res.data && res.data.info || '';
          if (this.questions.length>0) {
            this.questions.map((re:any, index:any) => {
              if (re.nivel === '2'){
               re.numeracion = index;
               re.puntos_copy = re.puntos;
              }
            });
            this.informacion.emit(this.info);
          }
        }, () => {this.loadingsQuestion.emit(false);}, () => {this.loadingsQuestion.emit(false);});
      }
  }
  save($event:any, item:any) {
    let serviceName = END_POINTS.base_back.quiz + '/elections';
    const param = {
      puntos: $event.puntos,
      correcto: $event.puntos === 0 ? 0 : $event.puntos > 0 ? 1 : 0,
    }
    if (serviceName) {
      this.loadingsQuestion.emit(true);
      this.service.updateNameIdData$(serviceName, $event.id_election, param).subscribe(res => {
        if (res.success) {
          this.setValue($event, item, res);
        } else {
          this.setValue($event, item, res);
        }
      }, () => {this.loadingsQuestion.emit(false);}, () => {this.loadingsQuestion.emit(false);});
    }
  }
  setValue($event:any, item:any, response:any) {
    this.questions.map((re:any) => {

        if (re.nivel === '2' && item.id === $event.pregunta_id) {
         if (re.alternativas.length>0) {
           re.alternativas.map((r:any) => {
             if (r.id === $event.id && response.success) {
               r.puntos_copy = this.esEntero(response.data.puntos_pregunta);
               r.puntos = this.esEntero(response.data.puntos_pregunta);
               re.puntos = this.esEntero(response.data.puntos_pregunta);
               this.info.nota = this.esEntero(response.data.nota);
               this.informacion.emit(this.info);
             } else {
               r.puntos = r.puntos_copy;
             }
           })
         }
        }
    })
  }
  esEntero(numero:number){
    if (numero % 1 == 0) {
      // console.log('par');
      return Number(numero).toFixed(0);;
    } else {
      // console.log('impar');

      return Number(numero).toFixed(2);
    }
  }
}
