import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { DIRECTORY, DIRECTORY_ELEMENTS } from 'src/app/shared/directorios/directory';
import { MProcessUrlComponent } from './modals/m-process-url/m-process-url.component';
import Swal from 'sweetalert2';
import { MSectionComponent } from './modals/m-section/m-section.component';

@Component({
  selector: 'app-q-config',
  templateUrl: './q-config.component.html',
  styleUrls: ['./q-config.component.scss']
})
export class QConfigComponent implements OnInit {
  @Input() item: any = [];
  @Input() userInfo: any;
  // directorio: any = DIRECTORY.base;
  directorio: any = DIRECTORY.exam;
  arrayFile: any = [];
  formHeader: any = FormGroup;
  loading: boolean = false;
  loadingQuestion: boolean = false;
  optionsType:any = [];
  key_file:any;
  questions:any = [];
  dragQuestions:any = [];
  // movies = [
  //   'Episode I - The Phantom Menace',
  //   'Episode II - Attack of the Clones',
  //   'Episode III - Revenge of the Sith',
  //   'Episode IV - A New Hope',
  //   'Episode V - The Empire Strikes Back',
  //   'Episode VI - Return of the Jedi',
  //   'Episode VII - The Force Awakens',
  //   'Episode VIII - The Last Jedi',
  //   'Episode IX – The Rise of Skywalker',
  // ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dragQuestions, event.previousIndex, event.currentIndex);
    setTimeout(() => {
      this.armarOrdenLista();
    }, 1000);
  }
  @Output() loadings: EventEmitter<boolean> = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private dialogService: NbDialogService, private generalServi: GeneralService) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.getQuestions();
    this.getTypeAlternative();
  }
  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  // }
  private fieldReactive() {
    const controls = {
      pregunta: ['', [Validators.required]],
      tipo_adjunto: [''],
      help: [''],
      orden: [''],

      url_video: [''],
      key_video: [''],

      adjunto: [''],
      file: [''],

      estado: ['1'],
      type_alternative: [''],
      drag_drop: [false],
      code:['NEW'],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.key_file = this.userInfo?.person?.codigo + '-' + this.item.id;
  }
  getQuestions() {
    const serviceName = END_POINTS.base_back.quiz + '/get-questions';
    if (this.item && this.item.exam && this.item.exam.id) {
      this.loadings.emit(true);
      this.generalServi.nameId$(serviceName, this.item.exam.id).subscribe(r => {
        this.questions = r.data || [];
        if (this.questions.length> 0) {
          const ultimoRegistro = this.questions[this.questions.length - 1];
          this.questions.map((r:any) => {
            r.checked = false;
            r.pluss = false;
            r.ultimo = false;
            r.editValid = false;
            if (r.nivel === 1) {
              r.section_id = r.id;
              r.eliminar = true;
            }

            if (ultimoRegistro && r.id === ultimoRegistro.id) {
              r.ultimo = true;
            }
          });

          if (this.questions[0].nivel === 1) { // No puedes eliminar la primera sección
            this.questions[0].eliminar = false;
          }

          if (this.item && this.item?.pendientes_realizados !== 0) { // Solo para no editar cuando es mayor a cero (0)
            this.formHeader.controls['drag_drop'].setValue(true);
            this.dragQuestions = JSON.parse(JSON.stringify(this.questions));
          }
        }
      }, () => { this.loadings.emit(false); }, () => { this.loadings.emit(false); });
      }
  }

  changeValueCheck(item:any, i:any) {
    this.questions.map((r:any) => {
      r.checked = false;
      r.editValid = false;
    });
    this.fieldReactive();
    item.checked = true;
    const qqq = this.questions.filter((a:any) => a.nivel === 2);
    this.formHeader.controls['orden'].setValue(item.nivel === 1 ? (item.anterior + 1) : item.nivel === 2 ? (item.orden + 1) : qqq.length +1);
    if (this.optionsType.length>0) {
      this.optionsType.map((res:any) => {
        res.checked = false;
      });
    }
    setTimeout(() => {
      this.questionToAgreee(i);
    }, 100);

  }
  changeValueEdit(item:any, i:any) {
      this.questions.map((r:any) => {
        r.checked = false;
        r.editValid = false;
      });
      this.fieldReactive();
      item.checked = true;
      item.editValid = true;
      this.formHeader.patchValue({
        pregunta: item.pregunta,
        help: item.help,
        orden:item.orden,
        url_video: item.url_video,
        key_video: item.key_video,
        adjunto: item.adjunto,
        code: 'UPDATE',
      });
      if (this.optionsType.length>0) {
        this.optionsType.map((res:any) => {
          res.checked = false;
          if (item.type_alternative_id === res.id) {
            res.checked = true;
            this.formHeader.controls['type_alternative'].setValue(res);
          }
        });
      }
      setTimeout(() => {
        this.questionToAgreee(i);
      }, 100);
  }
  changeSection(quiz:any, codes: any, i:any) {
    this.fieldReactive();
    if (this.optionsType.length>0) {
      this.optionsType.map((res:any) => {
        res.checked = false;
      });
    }
    const settions = this.questions.filter((a:any) => a.nivel === 1);
    this.dialogService.open(MSectionComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        quiz: quiz,
        codes: codes,
        index: settions.length + 1,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.getQuestions();
        this.fieldReactive();
        if (this.optionsType.length>0) {
          this.optionsType.map((res:any) => {
            res.checked = false;
          });
        }
      }
    });
  }
  changeCancel(item:any) {
    item.checked = false;
    item.pluss = false;
    item.editValid = false;

    if (this.formHeader.value.code === 'UPDATE') {
      const serviceName = END_POINTS.base_back.quiz + '/questions';
      this.generalServi.nameId$(serviceName, item.id).subscribe((res:any) => {
        if (res.success) {
          const items = res.data;
          if (items.codigo === '05') {
            item.alternativas = {
              arrayA: items.arrayA,
              arrayB: items.arrayB,
            }
          } else {
            item.alternativas = items.options;
          }
        }
      });
    }
    this.fieldReactive();
    if (this.optionsType.length>0) {
      this.optionsType.map((res:any) => {
        res.checked = false;
      });
    }
  }

  changePluss(item:any) {
    this.questions.map((r:any) => {
      r.pluss = false;
      r.checked = false;
      r.editValid = false;
    });
      this.fieldReactive();
      item.pluss = true;
      if (this.optionsType.length>0) {
        this.optionsType.map((res:any) => {
          res.checked = false;
        });
      }
  }

  getTypeAlternative() {
    const serviceName = END_POINTS.base_back.quiz + '/typeAlternatives';
      this.loading = true;
      this.generalServi.nameAll$(serviceName).subscribe(r => {
        this.optionsType = r.data || [];
        if (this.optionsType.length > 0) {
          this.optionsType.map((r:any) => {
            r.icon = 'keypad-outline';
            r.checked = false;
            r.color = '#934054'
          })
        }
      }, () => { this.loading = false; }, () => { this.loading  = false; });
  }

  valueFile($event:any) {
    if ($event && $event.value) {
      this.formHeader.controls['tipo_adjunto'].setValue('ARCHIVO');
      this.formHeader.controls['adjunto'].setValue($event.value.nombre_s3);
      this.formHeader.controls['file'].setValue($event.value);

      this.formHeader.controls['url_video'].setValue('');
      this.formHeader.controls['key_video'].setValue('');

    } else {
      this.formHeader.controls['file'].setValue('');
      this.formHeader.controls['adjunto'].setValue('');
    }
  }
  changeButtom(item:any) {
    if (this.optionsType.length>0) {
      this.optionsType.map((res:any) => {
        res.checked = false;
      });
      item.checked = true;
      this.formHeader.controls['type_alternative'].setValue(item);

    }
  }
  openUrlYoutube() {
    this.dialogService.open(MProcessUrlComponent, {
      dialogClass: 'dialog-limited-height',
      context: {},
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result && result.close === 'ok') {
        this.formHeader.controls['tipo_adjunto'].setValue('URL');

        this.formHeader.controls['url_video'].setValue(result.value.url_externa);
        this.formHeader.controls['key_video'].setValue(result.value.key_video);

        this.formHeader.controls['adjunto'].setValue('');
        this.formHeader.controls['file'].setValue('');
      }
    });
  }
  deleteFile() {
    this.formHeader.controls['adjunto'].setValue('');
    this.formHeader.controls['file'].setValue('');

    this.formHeader.controls['tipo_adjunto'].setValue('');
  }
  deleteLink() {
    this.formHeader.controls['url_video'].setValue('');
    this.formHeader.controls['key_video'].setValue('');

    this.formHeader.controls['tipo_adjunto'].setValue('');
  }

  changeLoadings($event: boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 1000);
  }
  changeSuccess($event:any) {
    setTimeout(() => {
      if ($event === 'ok') {
        this.getQuestions();
        this.fieldReactive();
      }
      // if ($event.close === 'ok') {
      //   if (this.formHeader.value.code === 'UPDATE') {
      //         this.questions.map((re:any) => {
      //           if (re.nivel === 2 && re.id === $event.question.id) {
      //             re = $event.question;
      //             re.checked = false;
      //             re.pluss = false;
      //             re.editValid = false;
      //             re.alternativas = $event.question.options;
      //           }
      //         });
      //         this.fieldReactive();
      //       }
      //   } else {
      //     this.getQuestions();
      //     this.fieldReactive();
      //   }
      //   console.log(this.questions);
    }, 100);
  }
  deleteQuestion(event:any, el: any) {
    event.stopPropagation();
    const serviceName = END_POINTS.base_back.quiz + '/questions';
    if (el.id) {
      Swal.fire({
        title: 'Eliminar',
        text: '¿ Desea eliminar ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.generalServi.deleteNameId$(serviceName, el.id).subscribe(r => {
            if (r.success) {
              this.getQuestions();
              this.fieldReactive();
              if (this.optionsType.length>0) {
                this.optionsType.map((res:any) => {
                  res.checked = false;
                });
              }
            }
          }, () => { this.loading = false; }, () => { this.loading = false; });
        }
      });
    }
  }
  reloadList() {
    this.getQuestions();
    this.fieldReactive();
    if (this.optionsType.length>0) {
      this.optionsType.map((res:any) => {
        res.checked = false;
      });
    }
  }
  toogleValue($event:any) {
    // console.log($event);
    if ($event) {
      this.dragQuestions = JSON.parse(JSON.stringify(this.questions));
      this.armarOrdenLista();
    }
  }
  armarOrdenLista() {
    if (this.dragQuestions.length>0) {
      let ordenSeccion = 1;
      let ordenPregunta = 1;
      let idSection = 0;
      this.dragQuestions.map((item:any, index:any) => {
        if (item.nivel === 1) {
          idSection = item.id;
          item.orden = ordenSeccion++;
        } else {
          item.id_section = idSection;
          item.orden = ordenPregunta++;
        }
      });
    }
  }
  changeOrden() {
    if (this.dragQuestions.length>1) {
      const val = this.dragQuestions[0];
      let valid = false;
      if (val.nivel === 1) {
        valid = true;
      }

      if (valid) {
        const array = JSON.parse(JSON.stringify(this.dragQuestions));
        const arrayOrder:any = [];
        array.forEach((re:any) => {
          if (re.nivel === 2) {
            const object = {
              id_question: re.id,
              id_section: re.id_section,
              orden: re.orden,
            };
            arrayOrder.push(object);
          }
        });
        const serviceName = END_POINTS.base_back.quiz + '/save-order'
        const params = {
          drag_and_drop: arrayOrder
        }
        // console.log(params);
        
        this.loading = true;
        this.generalServi.addNameData$(serviceName, params).subscribe((res:any) => {
          if (res.success) {
            this.getQuestions();
            this.fieldReactive();
            if (this.optionsType.length>0) {
              this.optionsType.map((res:any) => {
                res.checked = false;
              });
            }
          }
        }, () => { this.loading = false; }, () => { this.loading = false; });
        // console.log(valid, 'Plopppppppp', arrayOrder, this.dragQuestions);
      }

    }

  }
  deleteSection(event:any, el: any) {
    event.stopPropagation();
    const serviceName = END_POINTS.base_back.quiz + '/sections';
    if (el.id) {
      Swal.fire({
        title: 'Eliminar',
        text: 'Recuerda que al eliminar la sección tambien eliminará las preguntas de la sección.  ¿ Desea eliminar ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.loading = true;
          this.generalServi.deleteNameId$(serviceName, el.id).subscribe(r => {
            if (r.success) {
              this.getQuestions();
              this.fieldReactive();
              if (this.optionsType.length>0) {
                this.optionsType.map((res:any) => {
                  res.checked = false;
                });
              }
            }
          }, () => { this.loading = false; }, () => { this.loading = false; });
        }
      });
    }
  }
  questionToAgreee(index:any) { //para la siguiente pregunta
    var elem = document.getElementsByClassName("pregunta"+ (index));
    if(elem){
      elem[0].scrollIntoView({block: "center",behavior:"smooth"});
    }
  }
}
