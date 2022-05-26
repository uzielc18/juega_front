import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from '../../../../../providers';
import { END_POINTS } from '../../../../../providers/utils';

@Component({
  selector: 'app-answer-questions',
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.scss'],
})
export class AnswerQuestionsComponent implements OnInit {
  @Input() question: any;
  @Input() userInfo: any;

  responder: boolean = false;
  answers: any[] = [];
  formHeader: any = FormGroup;

  expiredDays: any;
  expiredHours: any;
  expiredMinutes: any;

  daysMap = {
    '=0': '',
    '=1': '1 dia,',
    other: '# dias,',
  };

  hoursMap = {
    '=0': '',
    '=1': '1 hora,',
    other: '# horas,',
  };

  minutesMap = {
    '=0': '',
    '=1': '1 minuto,',
    other: '# minutos,',
  };

  loading: boolean = false;

  constructor(
    public activeModal: NbDialogRef<AnswerQuestionsComponent>,
    private generalService: GeneralService,
    private formBuilder: FormBuilder
  ) {
    setInterval(() => {
      this.countdown();
    }, 60 * 1000);
  }

  ngOnInit(): void {
    this.countdown();
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      consulta: ['', [Validators.required, Validators.maxLength(200)]],
      mostrar: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.formHeader.controls['mostrar'].setValue(this.question.mostrar === 'privado' ? 'Privado' : 'Público');
    this.getAnswers();
  }

  countdown() {
    if (this.question && this.question.created_at) {
      const countDate = new Date(this.question.created_at).getTime();
      const now = new Date().getTime();
      const expired = now - countDate;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      this.expiredDays = Math.floor(expired / day);
      this.expiredHours = Math.floor((expired % day) / hour);
      this.expiredMinutes = Math.floor((expired % hour) / minute);
    } else [(this.expiredDays = 0), (this.expiredHours = 0), (this.expiredMinutes = 0)];
  }

  getAnswers() {
    const serviceName = END_POINTS.base_back.default + 'inquirieAnswers';
    this.loading = true;
    this.generalService.nameId$(serviceName, this.question.id).subscribe(
      (res: any) => {
        if (res.success) {
          this.answers = res.data;
          console.log(this.answers);
        }
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  upVoteQuestion() {
    const serviceName = END_POINTS.base_back.default + 'ratings';
    const data = {
      codigo: 'mas_uno' || '',
      type_rating_id: 1 || '',
      valor: 1 || '',
      tabla: 'inquiries' || '',
      tabla_id: this.question.id || '',
      person_id: this.userInfo._user.person.id || '',
    };
    this.loading = true;
    this.generalService.addNameData$(serviceName, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.getAnswers();
          this.question.puntos = this.question.puntos + 1;
          this.question.puntos_activo = 0;
        }
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  upVoteAnswer(answer: any) {
    const serviceName = END_POINTS.base_back.default + 'ratings';
    const data = {
      codigo: 'mas_uno' || '',
      type_rating_id: 1 || '',
      valor: 1 || '',
      tabla: 'inquiries' || '',
      tabla_id: answer.id || '',
      person_id: this.userInfo._user.person.id || '',
    };
    this.loading = true;
    this.generalService.addNameData$(serviceName, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.getAnswers();
          answer.puntos = answer.puntos + 1;
          answer.puntos_activo = 0;
        }
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  showInput() {
    this.responder = !this.responder;
  }

  answerQuestion() {
    const serviceName = END_POINTS.base_back + 'inquirieAnswers';
    const data = {
      inquirie_id: this.question.id,
      respuesta: this.formHeader.value.consulta,
      person_id: this.userInfo._user.person.id,
      mostrar: this.formHeader.value.mostrar,
    };
    console.log(data);
  }

  closeModal() {
    this.activeModal.close('ok');
  }
}
