import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";

@Component({
  selector: 'app-answers-questions',
  templateUrl: './answers-questions.component.html',
  styleUrls: ['./answers-questions.component.scss']
})
export class AnswersQuestionsComponent implements OnInit {

  @Input() profile: any;
  formHeader: any = FormGroup;
  loading: boolean = false;
  questions: any[] = [];
  showQuestion: boolean = false;
  mostrar: any;

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
  constructor(private formBuilder: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      consulta: ['', [Validators.required, Validators.maxLength(200)]],
      mostrar: [true, [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.getQuestions();
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
      const serviceName = END_POINTS.base_back.inquiries;
      const data = {
        person_id: this.profile?.user?.person?.id || '',
        tabla: 'tutoria' || '',
        tabla_id: 0,
        id_carga_curso_docente: 0,
        consulta: this.formHeader.value.consulta || '',
        codigo: this.profile?.user?.person?.codigo || '',
        mostrar: 'publico',
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
  getQuestions() {
      const serviceName = END_POINTS.base_back.inquiries;
      const params = {
        tabla: 'tutoria',
        tabla_id: 0 ,
        person_id: this.profile?.user?.person?.id || '',
        id_carga_curso_docente: 0 ,
      };
      this.loading = true;
      this.showQuestion = false
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

  upVoteQuestion(question: any) {
    const serviceName = END_POINTS.base_back.default + 'ratings';
    const data = {
      codigo: 'mas_uno' || '',
      type_rating_id: 1 || '',
      valor: 1 || '',
      tabla: 'inquiries' || '',
      tabla_id: question.id || '',
      person_id: this.profile?.user?.person?.id || '',
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
}
