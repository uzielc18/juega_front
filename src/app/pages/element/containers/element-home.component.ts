import { AfterViewInit, Component, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbSelectComponent } from '@nebular/theme';
import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-element-home',
  templateUrl: './element-home.component.html',
  styleUrls: ['./element-home.component.scss'],
})
export class ElementHomeComponent implements OnInit {
  formHeader: any = FormGroup;

  listOfTeachers: any = [];
  listOfCourses: any = [];
  selectedTopics: any = [];

  filteredGroups$!: Observable<any[]>;

  loading: boolean = false;
  showTeachers: boolean = false;

  @ViewChildren('secondSelect') select2!: QueryList<NbSelectComponent>;

  constructor(private generalService: GeneralService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.fieldReactive();
  }

  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }

  fieldReactive() {
    const controls = {
      termino: ['', Validators.required],
    };
    this.formHeader = this.formBuilder.group(controls);
    // this.formHeader.controls['termino'].setValue('');
    this.formHeader.controls['termino'].valueChanges.subscribe((value: any) => {
      console.log(typeof value, value);
      if (value === '') {
        this.showTeachers = false;
      }
    });
    this.getListOfTeachers();
    this.getListOfCourses();
  }

  getListOfTeachers() {
    const serviceName = END_POINTS.base_back.default + 'get-teachers';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe(
      (res: any) => {
        if (res.success) {
          this.listOfTeachers = res.data;
          console.log(this.listOfTeachers);
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

  searchTeachers() {
    this.showTeachers = true;
  }

  resetTeachers() {
    this.formHeader.controls['termino'].setValue('');
    this.showTeachers = false;
  }

  setTeacher(teacher: any) {
    this.showTeachers = false;
    this.formHeader.controls['termino'].setValue(teacher.nombres_completos);
  }

  getListOfCourses() {
    const serviceName = END_POINTS.base_back.default + 'get-courses-topics';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe(
      (res: any) => {
        if (res.success) {
          this.listOfCourses = res.data;
          this.listOfCourses.map((course: any) => {
            course.show = false;
            course.topics.map((topic: any) => {
              topic.course_name = course.nombre;
              topic.checked = false;
            });
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

  toggleOption(course: any) {
    course.show = !course.show;
    // remove from selectedTopics if course.id_carga_curso is already in selectedTopics
    if (!course.show) {
      this.selectedTopics = this.selectedTopics.filter((topic: any) => topic.id_carga_curso !== course.id_carga_curso);
    }
  }

  toggleTopicOption(event: any, i: any) {
    event.stopPropagation();

    if (this.select2.toArray()[i].isOpen) {
      this.select2.toArray()[i].hide();
    } else {
      this.select2.toArray()[i].show();
    }
  }

  uncheckTopicsByCourse(id_carga_curso: any) {
    this.listOfCourses.map((course: any) => {
      course.topics.map((item: any) => {
        if (item.id_carga_curso === id_carga_curso) {
          item.checked = false;
          this.selectedTopics.map((selectedTopic: any) => {
            if (selectedTopic.id_carga_curso === item.id_carga_curso) {
              this.selectedTopics = this.selectedTopics.filter((selectedTopic: any) => selectedTopic.id !== item.id);
            }
          });
        }
      });
    });
  }

  saveTopics(event: any, topic: any) {
    event.stopPropagation();
    this.uncheckTopicsByCourse(topic.id_carga_curso);
    topic.checked = !topic.checked;
    if (topic.checked) {
      this.selectedTopics.push(topic);
    } else {
      this.selectedTopics = this.selectedTopics.filter((topic: any) => topic.id !== topic.id);
    }
    console.log(this.selectedTopics);
  }

  // deleteTopic(topic: any) {
  //   this.selectedTopics = this.selectedTopics.filter((item: any) => item.id !== topic.id);
  //   topic.checked = false;
  //   console.log(this.selectedTopics);
  // }
}
