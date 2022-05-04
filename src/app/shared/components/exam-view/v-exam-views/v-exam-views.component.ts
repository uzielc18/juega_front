import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-v-exam-views',
  templateUrl: './v-exam-views.component.html',
  styleUrls: ['./v-exam-views.component.scss']
})
export class VExamViewsComponent implements OnInit {
  questions:any = [];
  @Input() person_id: any;
  @Input() pending_id: any;
  loading:boolean = false;
  constructor(private service: GeneralService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getViewQuestions();
    }, 2000);
  }
  getViewQuestions() {
      const serviceName = END_POINTS.base_back.quiz + '/quiz-play';
      if (this.person_id && this.pending_id) {
        this.loading = true;
        this.service.nameIdAndId$(serviceName, this.pending_id, this.person_id).subscribe(res => {
          this.questions = res.data && res.data.data || [];
          if (this.questions.length>0) {
            this.questions.map((re:any, index:any) => {
              if (re.nivel === '2'){
               re.numeracion = index;
              }
            });
          }
        }, () => {this.loading = false;}, () => {this.loading = false;});
      }
  }
}
