import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AppService } from 'src/app/core';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-questions-config',
  templateUrl: './questions-config.component.html',
  styleUrls: ['./questions-config.component.scss']
})
export class QuestionsConfigComponent implements OnInit {
  loading:boolean = false;
  @Input() item:any;
  userInfo: any;
  infoExam:any;
  constructor(private userService: AppService, public activeModal: NbDialogRef<QuestionsConfigComponent>,
    private generalServi: GeneralService) { }

  ngOnInit(): void {
    this.getUserInfo();
    // console.log(this.item, 'itemsss');
    
  }
  closeModal() {
    this.activeModal.close('close');
  }
  getUserInfo() {
    this.userInfo = this.userService.user;
  }
  saveValues($event:any) {
    if ($event && $event.save_close === 'ok') {
      this.activeModal.close($event);
    }

  }
  loadingsss($event: boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 100);
  }
  valueChangeTab($event:any) {
    const code = $event.tabId;
    switch (code) {
      case 'CONFIG':
        this.infoQuestion();
        break;
    
      default:
        break;
    }
  }
  infoQuestion() {
    this.loading = true;
    const serviceName = END_POINTS.base_back.quiz + '/quizinfo';
    this.generalServi.nameId$(serviceName, this.item.exam.id).subscribe(r => {
      const questions = r.data.num_preguntas || 0;
      this.infoExam = r.data;
      this.infoExam['array'] =this.recorre(questions) || [];
      // console.log(this.infoExam);
      
    }, () => { this.loading = false; }, () => { this.loading = false; });
  }
  recorre(num:any) {
    const arrays = [];
    for (let index = 0; index < num; index++) {
      arrays.push((index+1).toString());
    }
    return arrays;
  }
}
