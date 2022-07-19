import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import { GeneralService } from '../../../../../../providers';
import { END_POINTS } from '../../../../../../providers/utils';
import {
  MNoteWorksHomeComponent
} from "../../../../../../shared/components/notes-works/modal/m-note-works-home.component";

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit, OnChanges {
  @Input() curso: any;

  loading: boolean = false;
  listStudents: any;
  tempList: any = [];
  anotherTempList: any = [];
  showOneStudent: boolean = false;
  searchstring: any = [];
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
    '=1': '1 minuto.',
    other: '# minutos.',
  };

  isListOpen = false;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(evt: KeyboardEvent) {
    this.isListOpen = false;
  }

  constructor(
    private generalService: GeneralService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.fieldReactive();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.curso) {
    //   this.getStudents();
    // }
  }

  private fieldReactive() {
    const controls = {
      termino: [{ value: '', disabled: false }, [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.formHeader.controls['termino'].setValue('');
    this.formHeader.controls['termino'].valueChanges.subscribe((value: any) => {
      if (value === '') {
        this.isListOpen = false;
      }
    });
  }

  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
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

  getStudents() {
    if (this.curso && this.curso.id_carga_curso) {
      const serviceName = END_POINTS.base_back.default + 'list-student';
      const id_carga_curso_docente = this.curso.id_carga_curso_docente;
      this.loading = true;
      this.generalService.nameId$(serviceName, id_carga_curso_docente).subscribe(
        (res: any) => {
          if (res.success) {
            this.listStudents = res.data;
            this.listStudents.forEach((student: any) => {
              student.expiredDays = 0;
              student.expiredHours = 0;
              student.expiredMinutes = 0;
            });
            this.listStudents.forEach((student: any) => {
              this.countdown(student);
              setInterval(() => {
                this.countdown(student);
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

  syncStudentsLamb() {
    if (this.curso && this.curso.id_carga_curso) {
      const serviceName = END_POINTS.base_back.config + '/get-enrollments';
      const ids = {
        semestre_nombre: this.rolSemestre.semestre.nombre || '',
        id_carga_curso: this.curso.id_carga_curso || '',
        id_3: '0',
        id_4: '0',
      };
      this.loading = true;
      this.generalService.nameIdAndIdAndIdAndId$(serviceName, ids.semestre_nombre, ids.id_carga_curso, ids.id_3, ids.id_4).subscribe(
        (res: any) => {
          if (res.success) {
            this.toastrService.info(status, `${res.message}`);
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
  notesWorks(code: any){
    this.dialogService.open(MNoteWorksHomeComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        code: code,
        items: this.curso
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
       // this.listCursos();
      }
    });

  }

  searchStudent() {
    this.isListOpen = true;
    this.tempList = this.listStudents;
  }

  restoreStudents() {
    this.listStudents = this.anotherTempList;
    this.formHeader.controls['termino'].setValue('');
    this.formHeader.controls['termino'].enable();
    this.showOneStudent = false;
    this.isListOpen = false;
  }

  setTermino(termino: any) {
    this.showOneStudent = true;
    this.isListOpen = false;
    this.formHeader.controls['termino'].setValue(termino.persons_student_nombre);
    this.formHeader.controls['termino'].disable();
    this.anotherTempList = this.listStudents;
    this.tempList = [];
    this.listStudents = [];
    this.listStudents.push(termino);
  }
}
