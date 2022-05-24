import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService, NbMenuItem } from '@nebular/theme';
import { GeneralService } from '../../../../../providers';
import { END_POINTS } from '../../../../../providers/utils';
import { AnswerQuestionsComponent } from '../../modals/answer-questions/answer-questions.component';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss'],
})
export class NavegacionComponent implements OnInit {
  @Input() curso: any;
  silabu: any;

  loading: boolean = false;

  @Output() changeEmit: EventEmitter<any> = new EventEmitter();

  constructor(private generalService: GeneralService,  private dialogService: NbDialogService) {}

  ngOnInit(): void {}

  getSilabu() {
    const serviceName = END_POINTS.base_back.config + '/syllable-viewer';
    const id_carga_curso = this.curso.id_carga_curso;
    this.loading = true;
    this.generalService.nameId$(serviceName, id_carga_curso).subscribe(res => {
      if (res.success) {
        this.silabu = res.data;
        const pdf_newTab = window.open('about:blank');
        // const pdf_newTab = window.open('', '_blank', 'toolbar=0,location=0,menubar=0,scrollbars=yes,resizable=yes');
        if (pdf_newTab) {
          pdf_newTab?.document.write(
            "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
              encodeURI(this.silabu) +
              "'></iframe>"
          );
        }
      }
    }, () => { this.loading = false; }, () => { this.loading = false; });
  }

  answerQuestionOnModal() {
    this.dialogService.open(AnswerQuestionsComponent, {
      dialogClass: 'dialog-limited-height',
      context: {

      },
      closeOnBackdropClick: true,
      closeOnEsc: true
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.changeEmit.emit();
      }
    });
  }

  upVote(event: any) {
    // event.stopPropagation();
    console.log('+1 vote');
  }

  answerQuestion(event: any) {
    // event.stopPropagation();
    console.log('answer');
  }
}
