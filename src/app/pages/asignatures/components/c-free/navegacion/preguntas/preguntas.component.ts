import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from '../../../../../../providers';
import { END_POINTS } from '../../../../../../providers/utils';
import { AnswerQuestionsComponent } from '../../../modals/answer-questions/answer-questions.component';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss'],
})
export class PreguntasComponent implements OnInit {
  @Input() curso: any;
  @Input() userInfo: any;
  loading: boolean = false;

  mostrar: any;
  questions: any[] = [];

  formHeader: any = FormGroup;

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

  constructor(
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.fieldReactive();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.curso) {
      this.getQuestions();
    }
  }

  private fieldReactive() {
    const controls = {
      consulta: ['', [Validators.required, Validators.maxLength(200)]],
      mostrar: [true, [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
  }

  countdown(question: any) {
    if (question && question.created_at) {
      const countDate = new Date(question.created_at).getTime();
      const now = new Date().getTime();
      const expired = now - countDate;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      question.expiredDays = Math.floor(expired / day);
      question.expiredHours = Math.floor((expired % day) / hour);
      question.expiredMinutes = Math.floor((expired % hour) / minute);
    } else {
      question.expiredDays = 0;
      question.expiredHours = 0;
      question.expiredMinutes = 0;
    }
  }

  sendQuestion() {
    if (this.curso && this.curso.id_carga_curso) {
      const serviceName = END_POINTS.base_back.inquiries;
      const data = {
        person_id: this.userInfo._user.person.id || '',
        tabla: 'courses' || '',
        tabla_id: this.curso.id || '',
        id_carga_curso_docente: this.curso.id_carga_curso_docente || '',
        consulta: this.formHeader.value.consulta || '',
        codigo: this.userInfo._user.person.codigo || '',
        mostrar: this.formHeader.value.mostrar ? 'privado' : 'publico' || '',
      };
      this.loading = true;
      this.generalService.addNameData$(serviceName, data).subscribe(
        (res: any) => {
          if (res.success) {
            this.getQuestions();
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
  }

  getQuestions() {
    if (this.curso && this.curso.id_carga_curso) {
      const serviceName = END_POINTS.base_back.inquiries;
      const params = {
        tabla: 'courses' || '',
        tabla_id: this.curso.id || '',
        person_id: this.userInfo._user.person.id || '',
        id_carga_curso_docente: this.curso.id_carga_curso_docente || '',
      };
      this.loading = true;
      this.generalService.nameParams$(serviceName, params).subscribe(
        (res: any) => {
          if (res.success) {
            this.questions = res.data;
            this.questions.forEach(question => {
              question.expiredDays = 0;
              question.expiredHours = 0;
              question.expiredMinutes = 0;
            });
            this.questions.forEach(question => {
              this.countdown(question);
              setInterval(() => {
                this.countdown(question);
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
  }

  upVoteQuestion(question: any) {
    const serviceName = END_POINTS.base_back.default + 'ratings';
    const data = {
      codigo: 'mas_uno' || '',
      type_rating_id: 1 || '',
      valor: 1 || '',
      tabla: 'inquiries' || '',
      tabla_id: question.id || '',
      person_id: this.userInfo._user.person.id || '',
    };
    this.loading = true;
    this.generalService.addNameData$(serviceName, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.getQuestions();
          question.puntos = question.puntos + 1;
          question.puntos_activo = 0;
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

  answerQuestionOnModal(question: any) {
    this.dialogService
      .open(AnswerQuestionsComponent, {
        dialogClass: 'dialog-limited-height',
        context: { question: question, userInfo: this.userInfo },
        closeOnBackdropClick: true,
        closeOnEsc: true,
      })
      .onClose.subscribe(result => {
        if (result === 'changed') {
          this.getQuestions();
        }
      });
  }
}
