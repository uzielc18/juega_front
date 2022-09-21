import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {AppService} from "../../../../core";
import Swal from "sweetalert2";
import {EditCommentForumComponent} from "../../children-comments/edit-comment-forum/edit-comment-forum.component";
import {NbDialogService} from "@nebular/theme";
import {MAnswersQuestionsComponent} from "./components/modals/m-answers-questions/m-answers-questions.component";

@Component({
  selector: 'app-answers-questions',
  templateUrl: './answers-questions.component.html',
  styleUrls: ['./answers-questions.component.scss']
})
export class AnswersQuestionsComponent implements OnInit {

  @Input() profile: any;
  @Input() asnwerQuestions: any;
  @Input() emmitComment: any;
  @Input() visibilidad: any;
  @Input() code: any;
  formHeader: any = FormGroup;
  pagination: any = {
    page: 1,
    per_page: 20,
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };
  next: any;
  list: any = [];
  respuesta: any = new FormControl('', Validators.required)
  loading: boolean = false;
  questions: any[] = [];
  answers: any = [];
  mostrar: any;
  me: any;

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
              private generalService: GeneralService,
              private userService: AppService,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.me = this.userService
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      comentario: ['', [Validators.required]]
    };
    this.formHeader = this.formBuilder.group(controls);
    this.loading = true
    this.getAnswers('');
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
  formatDate(date: any) {
    if (date) {
      const fec = date.split(' ');
      const da = fec[0];
      const time = fec[1];
      const fecha = da.split('-');
      var n = `${fecha[2]}/${fecha[1]}/${fecha[0]} ${time}`;
      if (n) {
        return n;
      } else {
        return 'Sin fecha';
      }
    } else {
      return 'Sin fecha';
    }
  }
  answerQuestion(item: any) {
    this.loading = true
    const serviceName = END_POINTS.base_back.default + 'inquirieAnswers';
    const data = {
      inquirie_id: this.asnwerQuestions.id,
      respuesta: this.respuesta.value,
      inquirie_answer_id: item.id,
      person_id: this.userService.user.person.id
    };
    this.generalService.addNameData$(serviceName, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.getAnswers('');
        }
      },
      () => {
        this.loading = false;
      }
    );
  }
  getAnswers(code: any) {
    this.loading = true
    const serviceName = END_POINTS.base_back.default + 'inquirieAnswers';
    const params = {
      inquirie_id: this.asnwerQuestions?.id,
      per_page: 2,
      page: this.pagination.page,
      paginate: 'S'
    };
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        if (res.success) {
            code
            this.next = res.links.next
            if(res.meta.from === 1){
              this.list = res.data
              this.answers = this.list;
            }else{
              this.list = this.list.concat(res.data);
              this.answers = this.list
            }
            this.answers.map((m: any) => {
              m.checked = false
              m.validateVerMas = false
            })

          this.answers.forEach((answer: any) => {
            answer.expiredDays = 0;
            answer.expiredHours = 0;
            answer.expiredMinutes = 0;
          });
          this.answers.forEach((answer: any) => {
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
  loadPage($event: any): any {
    console.log($event)
    this.loading = true;
    const v = this.pagination.page += 1;
    this.getAnswers(v)
  }
  comentar() {
    const serviceName = END_POINTS.base_back.default + 'inquirieAnswers';
    const data = {
      person_id: this.userService?.user?.person?.id || '',
      userid: this.userService?.user?.id || '',
      tabla: 'tutoria' || '',
      inquirie_answer_id: 0,
      tabla_id: 0,
      id_carga_curso_docente: 0,
      respuesta: this.formHeader.value.comentario || '',
      codigo: this.userService?.user?.person?.codigo || '',
      mostrar: 'publico',
      inquirie_id: this.asnwerQuestions?.id,
    };
    this.loading = true;
    this.generalService.addNameData$(serviceName, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.formHeader.controls['comentario'].setValue('');
          this.getAnswers('');
        }
      },
      () => {
        this.loading = false;
      }
    );
  }
  responderComentario(comentario:any) {
    if (comentario.checked) {
      comentario.checked = false;
    } else {
      comentario.checked = true;
    }

  }
  verMasRespuestas(item: any){
    if (item.validateVerMas) {
      item.validateVerMas = false;
    } else {
      item.validateVerMas = true;
    }
  }
  editComment(item: any){

    this.dialogService.open(MAnswersQuestionsComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        item: item,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.loading = true;
        this.getAnswers('');
      }
    });
  }
  deleteComment(item: any){
    const serviceName = END_POINTS.base_back.default + 'inquirieAnswers';
    if (item.id) {
      Swal.fire({
        title: 'Eliminar',
        text: '¿ Desea eliminar el comentario ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#00244E',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.generalService.deleteNameId$(serviceName, item.id).subscribe(r => {
            if (r.success) {
              this.getAnswers('');

            }
          },() => {this.loading = false}, () => {this.loading = false});
        }
      });
    }
  }
  actualizarComentarios(){
    this.loading = true;
    this.pagination.page = 1
    this.getAnswers('');
  }
  showMoreAnswers(){

  }
}
