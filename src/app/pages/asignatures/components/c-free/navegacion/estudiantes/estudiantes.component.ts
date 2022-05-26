import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { GeneralService } from '../../../../../../providers';
import { END_POINTS } from '../../../../../../providers/utils';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit, OnChanges {
  @Input() curso: any;

  loading: boolean = false;
  listStudents: any[] = [];
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
    '=1': '1 minuto,',
    other: '# minutos,',
  };

  debouncer: Subject<any>= new Subject();

  constructor(private generalService: GeneralService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.fieldReactive();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.curso) {
      this.getStudents();
    }
  }

  private fieldReactive() {
    const controls = {
      termino: ['', [Validators.required]],
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

  getStudents() {
    if (this.curso && this.curso.id_carga_curso) {
      const serviceName = END_POINTS.base_back.default + 'list-student';
      const id_carga_curso_docente = this.curso.id_carga_curso_docente;
      this.loading = true;
      this.generalService.nameId$(serviceName, id_carga_curso_docente).subscribe(
        (res: any) => {
          if (res.success) {
            this.listStudents = res.data;
            this.listStudents.forEach(student => {
              student.expiredDays = 0;
              student.expiredHours = 0;
              student.expiredMinutes = 0;
            });
            this.listStudents.forEach(student => {
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
      // const semestre =
    }
  }

  searchStudent() {

  }

  setTermino(termino: any) {
  }
}
