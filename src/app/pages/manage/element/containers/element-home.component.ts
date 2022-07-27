import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  elementAction: string = '';

  listOfTeachers: any = [];
  listOfCourses: any = [];
  listOfSemesters: any = [];
  selectedTopics: any = [];
  listOfTeachersToImport: any = [];
  listOfCoursesToImport: any = [];
  listOfTopicsToImport: any = [];
  elementsByTopic: any = [];
  selectedElements: any = [];

  origen: any[] = [];
  destino: any[] = [];

  loading: boolean = false;
  showTeachers: boolean = false;
  resetTeacherButton: boolean = false;
  showTeachersToImport: boolean = false;
  resetTeacherImportButton: boolean = false;

  // rol temporal como admin
  rolSemestre = {
    rol: {
      name: 'Admin',
    },
    semestre: {
      id: 2,
    },
  };

  @ViewChildren('secondSelect') select2!: QueryList<NbSelectComponent>;

  constructor(private generalService: GeneralService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.fieldReactive();
  }

  // get rolSemestre() {
  //   const sesion: any = sessionStorage.getItem('rolSemesterLeng');
  //   if (sesion) {
  //     return JSON.parse(sesion);
  //   } else {
  //     return '';
  //   }
  // }

  fieldReactive() {
    const controls = {
      termino: [{ value: '', disabled: false }, [Validators.required]],
      teacherToImportName: [{ value: '', disabled: true }, Validators.required],
      teacherToImport: ['', Validators.required],
      ciclo: ['', Validators.required],
      curso: [{ value: '', disabled: true }, Validators.required],
      sesion: [{ value: '', disabled: true }, Validators.required],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.formHeader.controls['termino'].valueChanges.subscribe((value: any) => {
      if (value === '') {
        this.showTeachers = false;
      }
    });
    this.formHeader.controls['teacherToImport'].valueChanges.subscribe((value: any) => {
      if (value === '') {
        this.showTeachersToImport = false;
      }
    });
    this.getSemesters();
    this.getListOfTeachers();
  }

  // Buttons to toggle between import and create
  newElements() {
    this.elementAction = 'new';
  }

  importElements() {
    this.elementAction = 'import';
  }

  // Teachers
  getListOfTeachers() {
    if (this.rolSemestre.rol.name === 'Admin') {
      const serviceName = END_POINTS.base_back.default + 'get-teachers';
      this.loading = true;
      this.generalService.nameAll$(serviceName).subscribe(
        (res: any) => {
          if (res.success) {
            this.listOfTeachers = res.data;
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

  getListOfTeachersBySemester(semester: any) {
    const serviceName = END_POINTS.base_back.default + 'get-teachers';
    const params = {
      semester_id: semester.id,
    };
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.listOfTeachersToImport = res.data;
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
    this.resetTeacherButton = true;
  }

  resetTeachers() {
    this.formHeader.controls['termino'].setValue('');
    this.resetTeacherButton = false;
    this.showTeachers = false;
    this.listOfCourses = [];
  }

  setTeacher(teacher: any) {
    this.showTeachers = false;
    this.formHeader.controls['termino'].setValue(teacher.nombres_completos);
    this.getListOfCourses(teacher.id);
  }

  // to import teachers
  searchTeachersToImport() {
    this.showTeachersToImport = true;
    this.resetTeacherImportButton = true;
  }

  resetTeachersToImport() {
    this.formHeader.controls['curso'].setValue('');
    this.formHeader.controls['sesion'].setValue('');
    this.formHeader.controls['sesion'].disable();
    this.formHeader.controls['teacherToImportName'].setValue('');
    this.formHeader.controls['teacherToImport'].setValue('');
    this.resetTeacherImportButton = false;
    this.showTeachersToImport = false;
  }

  setTeacherToImport(teacher: any) {
    this.showTeachersToImport = false;
    this.formHeader.controls['curso'].setValue('');
    this.formHeader.controls['sesion'].setValue('');
    this.formHeader.controls['sesion'].disable();
    this.formHeader.controls['teacherToImportName'].setValue(teacher.nombres_completos);
    this.formHeader.controls['teacherToImport'].setValue(teacher);
    this.formHeader.controls['curso'].enable();
    this.getListOfCoursesToImport(this.formHeader.controls['ciclo'].value, teacher.id);
  }

  // Courses and topics
  getListOfCourses(teacher_id: any) {
    const serviceName = END_POINTS.base_back.default + 'get-courses-topics';
    this.loading = true;
    const params = {
      person_id: this.rolSemestre.rol.name === 'Admin' ? teacher_id : '',
    };
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.listOfCourses = res.data;
          console.log(this.listOfCourses, "asdasd")
          this.listOfCourses.map((course: any) => {
            course.show = false;
            course.topics.map((topic: any) => {
              topic.course_id = course.id;
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

  getListOfCoursesToImport(semester_id: any, teacher_id: any = '') {
    const serviceName = END_POINTS.base_back.default + 'get-courses-by-semester';
    this.loading = true;
    const params = {
      semester_id: semester_id,
      person_id: teacher_id,
    };
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.listOfCoursesToImport = res.data;
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

  getTopicsByCourse(course_id: any) {
    const serviceName = END_POINTS.base_back.default + 'get-elements-topics';
    const params = {
      course_id: course_id,
    };
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res) => {
        if (res.success) {
          this.listOfTopicsToImport = res.data.topics;
          this.selectedElements = [];
          this.elementsByTopic = res.data.elements;
          this.elementsByTopic.map((element: any) => {
            element.checked = false;
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

  getElementsByTopic(topic_id: any) {
    const serviceName = END_POINTS.base_back.default + 'get-elements-by-topic';
    const params = {
      topic_id: topic_id,
    };
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.selectedElements = [];
          this.elementsByTopic = res.data;
          this.elementsByTopic.map((element: any) => {
            element.checked = false;
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

  toggleOption(course: any, i: any) {
    course.show = !course.show;
    if (!course.show) {
      this.selectedTopics = this.selectedTopics.filter((topic: any) => topic.id_carga_curso !== course.id_carga_curso);
      this.select2.toArray()[i].writeValue('');
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
  }

  // Semesters
  getSemesters() {
    const serviceName = END_POINTS.base_back.default + 'get-semesters';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe(
      (res: any) => {
        if (res.success) {
          this.listOfSemesters = res.data;
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

  setSemester(semester: any) {
    if (this.rolSemestre.rol.name === 'Admin') {
      this.formHeader.controls['teacherToImportName'].setValue('');
      this.formHeader.controls['teacherToImport'].setValue('');
      this.formHeader.controls['curso'].setValue('');
      this.formHeader.controls['curso'].disable();
      this.formHeader.controls['sesion'].setValue('');
      this.formHeader.controls['sesion'].disable();
      this.formHeader.controls['teacherToImportName'].enable();
      this.getListOfTeachersBySemester(semester);
    } else if (this.rolSemestre.rol.name === 'Docente') {
      this.formHeader.controls['curso'].setValue('');
      this.formHeader.controls['sesion'].setValue('');
      this.formHeader.controls['sesion'].disable();
      this.formHeader.controls['curso'].enable();
      this.getListOfCoursesToImport(semester.id);
    }
  }

  setCourse(course: any) {
    this.formHeader.controls['sesion'].setValue('');
    this.formHeader.controls['sesion'].enable();
    this.getTopicsByCourse(course.id);
  }

  setTopic(topic: any) {
    // console.log(topic);
    this.getElementsByTopic(topic.id);
  }

  selectElements(element: any) {
    element.checked = !element.checked;
    if (element.checked) {
      this.selectedElements.push(element);
    } else {
      this.selectedElements = this.selectedElements.filter((item: any) => item.id !== element.id);
    }
    // console.log(this.selectedElements);
  }

  saveElements() {
    this.origen = this.selectedElements.map((element: any) => {
      return {
        element_id: element.id,
      };
    });

    this.destino = this.selectedTopics.map((topic: any) => {
      return {
        course_id: topic.course_id,
        topic_id: topic.id,
      };
    });

    const serviceName = END_POINTS.base_back.default + 'save-elements-imported';
    const data = {
      origen: this.origen,
      destino: this.destino,
    };
    this.loading = true;
    this.generalService.addNameData$(serviceName, data).subscribe(
      (res: any) => {
        console.log(res);
        if (res.success) {
          this.elementsByTopic.map((element: any) => {
            element.checked = false;
          });
          this.resetTeachers();
          this.selectedElements = [];
          this.selectedTopics = [];
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
