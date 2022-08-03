import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { GeneralService } from "src/app/providers";
import { END_POINTS } from "src/app/providers/utils";
import { ConfirmFinishExamComponent } from "../components/modals/confirm-finish-exam/confirm-finish-exam.component";

@Component({
  selector: "app-exam-home",
  templateUrl: "./exam-home.component.html",
  styleUrls: ["./exam-home.component.scss"],
})
export class ExamHomeComponent implements OnInit {
  pending_id: any = this.activatedRoute.snapshot.paramMap.get('pending_id');
  person_id: any = this.activatedRoute.snapshot.paramMap.get('person_id');
  page: any = this.activatedRoute.snapshot.queryParams['page'] || 1;
  collapsed: boolean = false;
  loading: boolean = false;
  textImg = [
    {
      option: "Comprensivo",
      id: 1,
      selected: 0,
      checked: false,
      imagen: "https://imagenes.20minutos.es/files/article_amp/uploads/imagenes/2022/01/12/vaca.jpeg",
    },
    {
      option: "Pasivo",
      id: 2,
      selected: 0,
      checked: false,
      imagen: "https://cdn.pixabay.com/photo/2018/05/03/22/34/lion-3372720_1280.jpg",
    },
    {
      option: "Sentimental",
      id: 3,
      selected: 0,
      checked: false,
      imagen: "https://definicion.de/wp-content/uploads/2015/02/ganado.jpg",
    },
    {
      option: "Dinámico",
      id: 4,
      selected: 0,
      checked: false,
      imagen: "https://www.lavanguardia.com/files/og_thumbnail/uploads/2021/04/26/60868c00d04fc.jpeg",
    },
    {
      option: "Adaptativo",
      id: 5,
      selected: 0,
      checked: false,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MjEcbf2UEaJlkunkvFYf3Xm6d61Gcabluw&usqp=CAU",
    },
  ];
  images = [
    {
      option: "",
      id: 1,
      selected: 0,
      checked: false,
      imagen: "https://imagenes.20minutos.es/files/article_amp/uploads/imagenes/2022/01/12/vaca.jpeg",
    },
    {
      option: "",
      id: 2,
      selected: 0,
      checked: false,
      imagen: "https://cdn.pixabay.com/photo/2018/05/03/22/34/lion-3372720_1280.jpg",
    },
    {
      option: "",
      id: 3,
      selected: 0,
      checked: false,
      imagen: "https://definicion.de/wp-content/uploads/2015/02/ganado.jpg",
    },
    {
      option: "",
      id: 4,
      selected: 0,
      checked: false,
      imagen: "https://www.lavanguardia.com/files/og_thumbnail/uploads/2021/04/26/60868c00d04fc.jpeg",
    },
    {
      option: "",
      id: 5,
      selected: 0,
      checked: false,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7MjEcbf2UEaJlkunkvFYf3Xm6d61Gcabluw&usqp=CAU",
    },
  ];
  texts = [
    {
      option: "Comprensivo",
      id: 1,
      selected: 0,
      checked: false,
      imagen: "",
    },
    {
      option: "Pasivo",
      id: 2,
      selected: 0,
      checked: false,
      imagen: "",
    },
    {
      option: "Sentimental",
      id: 3,
      selected: 0,
      checked: false,
      imagen: "",
    },
    {
      option: "Dinámico",
      id: 4,
      selected: 0,
      checked: false,
      imagen: "",
    },
    {
      option: "Adaptativo",
      id: 5,
      selected: 0,
      checked: false,
      imagen: "",
    },
  ];

  relation = {
    arrayA: [
      {
        id: 119,
        relacion: "happy",
        imagen: "https://www.livehappy.com/wp-content/uploads/2018/02/happy.jpg",
      },
      {
        id: 121,
        relacion: "down",
        imagen: "https://www.pngitem.com/pimgs/m/71-715425_down-arrow-png-transparent-icon-transparent-arrow-down.png",
      },
      {
        id: 123,
        relacion: "day",
        imagen:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmvz-l_AQzoRZ7wihLlDZBE-uEw3KqgydDc_WRA5yVi4ja1j8KsXu7JOJ3hdxywT4DxtM&usqp=CAU",
      },
      {
        id: 125,
        relacion: "kid",
        imagen: "https://en.pimg.jp/040/904/171/1/40904171.jpg",
      },
    ],
    arrayB: [
      {
        id: 120,
        relacion: "sad",
        imagen: "https://whatemoji.org/wp-content/uploads/2020/07/Frowning-Face-Emoji-1024x1024.png",
      },
      {
        id: 122,
        relacion: "up",
        imagen: "https://www.pngitem.com/pimgs/m/512-5126598_transparent-arrow-pointing-up-png-png-download.png",
      },
      {
        id: 124,
        relacion: "night",
        imagen:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/%D0%A1%D0%B2%D0%B5%D1%82_%D0%BE%D1%82_%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D0%B8_-_panoramio.jpg/640px-%D0%A1%D0%B2%D0%B5%D1%82_%D0%BE%D1%82_%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D0%B8_-_panoramio.jpg",
      },
      {
        id: 126,
        relacion: "old",
        imagen:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT02-1XKSVkVIGKmyI9CDt9IvSgkJFIxI2DSxJsBV4CBX2f6Se9f80fne861jV3kO5awvE&usqp=CAU",
      },
    ],
  };

  relationText = {
    arrayA: [
      {
        id: 119,
        relacion: "happy",
        imagen: null,
      },
      {
        id: 121,
        relacion: "down",
        imagen: null,
      },
      {
        id: 123,
        relacion: "day",
        imagen: null,
      },
      {
        id: 125,
        relacion: "kid",
        imagen: null,
      },
    ],
    arrayB: [
      {
        id: 120,
        relacion: "sad",
        imagen: null,
      },
      {
        id: 122,
        relacion: "up",
        imagen: null,
      },
      {
        id: 124,
        relacion: "night",
        imagen: null,
      },
      {
        id: 126,
        relacion: "old",
        imagen: null,
      },
    ],
  };
  questions:any = [];
  info:any = '';
  tiempoRestante:any = {
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
    tiempo_vencido: false,
  };
  time: number = 0;
  loadingSave: boolean = false;
  questionResponse: number = 0;

  private scrollHeight = 500;
  showButtom:boolean = true;
  constructor(private activatedRoute: ActivatedRoute, private service: GeneralService, public router: Router, private rou: ActivatedRoute,
    private dialogService: NbDialogService) {
      setInterval(() => {
        if (this.info) {
          this.countdown();
        }
      }, 1000);
      setInterval(() => {
        if (this.info) {
          this.timeResponse();
        }
      }, 1000);
  }
  // @HostListener('window:scroll')
  // onWindowScroll(): void {
  //   const yOffSet = window.pageXOffset;
  //   const scrollTop = this.document.documentElement.scrollTop;
  //   this.showButtom = (yOffSet || scrollTop) > this.scrollHeight;

  //   let y:any = window.scrollY;
  //   let x:any = window.scrollX;
  //   // console.log('hola:Scroll', x, y);

  // }

  ngOnInit(): void {
    setTimeout(() => {
      this.getQuestions();
    }, 2000);
  }
  //  onScrollTop(): void {
  //   const boxes:any = document.getElementsByClassName('box');
  //       const result = boxes[0].getBoundingClientRect();

  //    const sum = this.document.documentElement.scrollTop + result['x'];

  //   this.document.documentElement.scrollTop = sum;
  //   console.log(this.document.documentElement.scrollTop,  window.pageXOffset);
  //   // let y:any = window.scrollY;
  //   // let x:any = window.scrollX;
  //   // // let x = ContainerElement.scrollLeft;
  //   // // var y = ContainerElement.scrollTop;
  //   // // console.log(x); // scroll position from Left
  //   // console.log('y', y, 'x', x); // scroll position from top
  //   // this.getPosition();
  // }
  timeResponse() {
    this.time ++;
  }
  countdown() {
    // const countDate = new Date('2022-03-31 11:30:00').getTime();
    const countDate = new Date(this.info.fecha_fin).getTime();
    const now = new Date().getTime();
    const left = countDate - now;
    // const expired = now - countDate;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days= Math.floor(left / day);
    const hours = Math.floor((left % day) / hour);
    const miunets = Math.floor((left % hour) / minute);
    const seconsts = Math.floor((left % minute) / second);

    // this.expiredDays = Math.floor(expired / day);
    // this.expiredHours = Math.floor((expired % day) / hour);
    // this.expiredMinutes = Math.floor((expired % hour) / minute);
    // this.expiredSeconds = Math.floor((expired % minute) / second);
    if (days <= 0 && hours <= 0 && miunets <= 0 && seconsts <= 0) {
      this.tiempoRestante.tiempo_vencido = true;
    } else {
      this.tiempoRestante.tiempo_vencido = false;
    }
    if (days >= 0 && hours >= 0 && miunets >= 0 && seconsts >= 0) {
      this.tiempoRestante.dias = days;
      this.tiempoRestante.horas = hours;
      this.tiempoRestante.minutos = miunets;
      this.tiempoRestante.segundos = seconsts;
    } else {
      // this.tiempoRestante.dias = 0;
      // this.tiempoRestante.horas = 0;
      // this.tiempoRestante.minutos = 0;
      // this.tiempoRestante.segundos = 0;
    }
  }

  collapse() {
    this.collapsed = !this.collapsed;
  }

  loadingsFiles($event: boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 200);
  }
  getQuestions() {
    if (!this.tiempoRestante.tiempo_vencido) {
      const serviceName = END_POINTS.base_back.quiz + '/quiz-play';
      if (this.person_id && this.pending_id) {
        this.loading = true;
        const params = {
          page: this.page
        }
        this.service.nameIdAndIdParams$(serviceName, this.pending_id, this.person_id, params).subscribe(res => {
          this.questions = res.data && res.data.data || [];
          this.info = res.data && res.data.info || '';
          this.questionResponse = res.data && res.data.info.preguntas_respondidas || 0;
          if (this.questions.length>0) {
            this.questions.map((re:any, index:any) => {
              if (re.nivel === '2'){
               re.numeracion = index;
              }
            });

            if (this.info && this.info.bloqueo === 1) {
              this.backGo;
            }
          }
        }, () => {this.loading = false;}, () => {this.loading = false;});
      }
    }
  }
  get questionsNoResponse():any {
    if (this.questions.length > 0) {
      return this.questions.filter((r:any) => r.nivel === '2' && r.estado_respuesta === 'SIN-RESPONDER');
    } else {
      return [];
    }
  }
  get sectionsResponse():any {
    if (this.questions.length > 0) {
      return this.questions.filter((r:any) => r.nivel === '1');
    } else {
      return [];
    }
  }
  // valueScroll(value:any) {
  //   // console.log(value);

  //   const boxes:any = document.getElementsByClassName(value);
  //   const result = boxes[0].getBoundingClientRect();
  //   const sum = this.document.documentElement.scrollTop + result['top'];

  //   this.document.documentElement.scrollTop = sum;

  //   // console.log(result);

  // }
  refresquestion() {
    this.getQuestions();
  }
  nextContinue() {
    const valor = Number(this.page) + 1;
    this.router.navigate([], { queryParams: { page: valor } });
    this.page = valor;
    this.getQuestions();
  }
  backContinue() {
    const valor = Number(this.page) - 1;
    this.router.navigate([], { queryParams: { page: valor } });
    this.page = valor;
    this.getQuestions();
  }
  save($event:any, item:any, index:any) {
    let serviceName = '';
    if (item.codigo === '05') {
      serviceName = END_POINTS.base_back.quiz + '/relationsAnswers';
    } else {
      serviceName = END_POINTS.base_back.quiz + '/elections';
    }

    const params = {
      alternativas: $event,
      codigo: item.codigo,
      question_student_id: item.id,
      question_id: item.question_id,
      segundos: this.time,
      exam_student_id: item.exam_student_id,
    }
    if (serviceName && params.codigo && params.question_student_id && params.question_id && params.exam_student_id) {
      this.loadingSave = true;
      this.service.addNameData$(serviceName, params).subscribe(res => {
        if (res.success) {
          this.time = 0;
          this.getQuestions();
          this.questionResponse = res.data && res.data.preguntas_respondidas || 0;
          // this.valueScroll(classs);
          if (res.data && res.data.bloqueo === 1) {
            this.backGo;
          }
          this.nextQuestion(index);
        }
      }, () => {this.loadingSave = false;}, () => {this.loadingSave = false;});
    }
  }
  nextQuestion(index:any) { //para la siguiente pregunta
    var elem = document.getElementsByClassName("pregunta"+ (index + 1));
    // var elem = document.getElementById("pregunta"+ (index + 1));
     console.log(elem);
    if(elem){
      // elem.scrollIntoView({block: "center",behavior:"smooth"});
      elem[0]?.scrollIntoView({block: "center",behavior:"smooth"});
    }
  }
  nextIds(index:any) { //para la siguiente pregunta
    var elem = document.getElementById("pregunta"+ index );
    // console.log(elem);
    if(elem){
      elem?.scrollIntoView({block: "center",behavior:"smooth"});
    }
  }
  deleteItem($event:any) {
    const serviceName = END_POINTS.base_back.quiz + '/elections';
    this.loadingSave = true;
    this.service.deleteNameId$(serviceName, $event.id_election).subscribe(res => {
      if (res.success) {
        this.getQuestions();
      }
    }, () => {this.loadingSave = false;}, () => {this.loadingSave = false;});
  }
  backGo() {
    this.router.navigate([`/pages/asignatures/course/${this.info?.curso?.id_carga_curso_docente}/element/${this.info?.element_id}`]);
  }

  openFinish() {
    const values = {
      quest_sn_response: this.questionsNoResponse.length,
      exam_student_id: this.info.exam_student_id,
    }
    this.dialogService.open(ConfirmFinishExamComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        datos: values,
        // response: params,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.backGo();
      }
      if (result === 'view-question') {
        // this.filtrar();
        this.collapsed = true;
      }
    });
  }
}
