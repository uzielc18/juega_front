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
  verRespuestas: boolean = true;
  mostrarChanged: boolean = false;
  answers: any[] = [];
  formHeader: any = FormGroup;

  mostrarArray: any = ['Privado', 'Público', 'Ayuda'];

  MOSTRAR_OPTIONS: any = {
    Privado: 'privado',
    Público: 'publico',
    Ayuda: 'help',
  };

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
    '=1': '1 minuto.',
    other: '# minutos.',
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
      respuesta: ['', [Validators.required, Validators.maxLength(200)]],
      mostrar: ['', [Validators.required]],
    };
    const RECOVER_MOSTRAR: any = {
      privado: 'Privado',
      publico: 'Público',
      help: 'Ayuda',
    };
    this.formHeader = this.formBuilder.group(controls);
    this.formHeader.controls['mostrar'].setValue(RECOVER_MOSTRAR[this.question.mostrar]);
    this.getAnswers();
  }

  updateMostrar(item: any) {
    if (item !== this.formHeader.value.mostrar) {
      this.formHeader.controls['mostrar'].setValue(item);
      const serviceName = END_POINTS.base_back.inquiries;
      const mostrar = this.MOSTRAR_OPTIONS[this.formHeader.value.mostrar] || '';
      const data = {
        mostrar: mostrar,
      };
      this.generalService.updateNameIdData$(serviceName, this.question.id, data).subscribe((res: any) => {
        if (res.success) {
          this.mostrarChanged = true;
        }
      });
    }
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

  countdownAnswers(answer: any) {
    if (answer && answer.created_at) {
      const countDate = new Date(answer.created_at).getTime();
      const now = new Date().getTime();
      const expired = now - countDate;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      answer.expiredDays = Math.floor(expired / day);
      answer.expiredHours = Math.floor((expired % day) / hour);
      answer.expiredMinutes = Math.floor((expired % hour) / minute);
    } else {
      answer.expiredDays = 0;
      answer.expiredHours = 0;
      answer.expiredMinutes = 0;
    }
  }

  getAnswers() {
    const serviceName = END_POINTS.base_back.default + 'inquirieAnswers';
    const params = {
      inquirie_id: this.question.id,
    };
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.answers = res.data;
          console.log(this.answers);
          this.answers.forEach(answer => {
            answer.expiredDays = 0;
            answer.expiredHours = 0;
            answer.expiredMinutes = 0;
          });
          this.answers.forEach(answer => {
            this.countdownAnswers(answer);
            setInterval(() => {
              this.countdownAnswers(answer);
            }, 60 * 1000);
          });
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
      tabla: 'inquirie_answers' || '',
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

  showAnswers() {
    this.verRespuestas = !this.verRespuestas;
  }

  answerQuestion() {
    const serviceName = END_POINTS.base_back.default + 'inquirieAnswers';
    const mostrar = this.MOSTRAR_OPTIONS[this.formHeader.value.mostrar] || '';
    const data = {
      inquirie_id: this.question.id,
      respuesta: this.formHeader.value.respuesta,
      person_id: this.userInfo._user.person.id,
      mostrar: mostrar,
    };
    this.loading = true;
    this.generalService.addNameData$(serviceName, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.responder = false;
          this.getAnswers();
          this.formHeader.reset();
          this.formHeader.controls['mostrar'].setValue(this.question.mostrar === 'privado' ? 'Privado' : 'Público');
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

  closeModal() {
    if (this.mostrarChanged) {
      this.activeModal.close('changed');
    }
    this.activeModal.close('ok');
  }
}
