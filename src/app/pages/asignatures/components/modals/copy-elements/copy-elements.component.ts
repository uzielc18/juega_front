import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {NbDialogRef, NbSelectComponent} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../../providers/utils";
import {AppService} from "../../../../../core";
import {GeneralService} from "../../../../../providers";

@Component({
  selector: 'app-copy-elements',
  templateUrl: './copy-elements.component.html',
  styleUrls: ['./copy-elements.component.scss']
})
export class CopyElementsComponent implements OnInit {

  loading: boolean = false;

  listOfCourses: any = [];
  topicsMove: any = [];
  selectedTopics: any = [];

  origen: any[] = [];
  destino: any[] = [];

  @Input() item: any;
  @Input() curso: any;
  formHeader: any = FormGroup;
  @ViewChildren('secondSelect') select2!: QueryList<NbSelectComponent>;
  constructor(public activeModal: NbDialogRef<CopyElementsComponent>,
              private fb: FormBuilder,
              private appService: AppService,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      copiar: [false],
      mover: [false],
      course_id: [''],
      unit_id: ['', [Validators.required]],
      section_id: ['',[Validators.required]],
      section_id_select: [''],
      topics_id: ['',[Validators.required]],
    };
    this.formHeader = this.fb.group(controls);
    this.getListOfCourses();
  }
  closeModal(){
    this.activeModal.close('close');
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol) {
      return val;
    } else {
      return '';
    }
  }
  selectTopicsMove(topics: any){
    this.formHeader.get('section_id_select').setValue(topics.id)
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
  valueChange(){
    if(this.formHeader.get('copiar').value === false){
      this.selectedTopics = []
    }
  }
  valueChangemove(){
    if(this.formHeader.get('mover').value === false){
      this.formHeader.get('section_id').setValue('')
    }
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

  // Courses and topics
  getListOfCourses() {
    const serviceName = END_POINTS.base_back.default + 'get-courses-topics';
    this.loading = true;
    const params = {
      person_id: this.curso.persons_teacher_id
    };
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.listOfCourses = res.data;
          //console.log(this.listOfCourses, "asdasd")
          this.listOfCourses.map((course: any) => {
            course.show = false;
            course.topics.map((topic: any) => {
              topic.course_id = course.id;
              topic.course_name = course.nombre;
              topic.checked = false;
            });
          });
          this.filterTopicsForCourse(this.listOfCourses);
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
  filterTopicsForCourse(item: any){
    item.filter((f:any) => {
      if(f.id_carga_curso_docente === this.curso.id_carga_curso_docente){
        return this.topicsMove = f.topics;
      }
    })

  }

  copyAndmove(){
    if(this.formHeader.get('mover').value === false){
      const datos = {
        element_id: this.item.id
      }
      const arr = []
      arr.push(datos)
      this.origen = arr;

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
          const valueClose = {
            value_close: 'ok',
            value: data,
            response: res.data,
          };
          this.activeModal.close(valueClose);
        },
        () => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }else{
      const serviceName = END_POINTS.base_back.elements;
      const params = {
        topic_id: this.formHeader.get('section_id_select').value,
      }
      if (this.item.id) {
        this.loading = true;
        this.generalService.updateNameIdData$(serviceName, this.item.id, params).subscribe(r => {
          if(r.success){
            const data = r.data || '';
            const valueClose = {
              value_close: 'ok',
              value: params,
              response: r.data,
              type_element: r.data.type_element
            };
            this.activeModal.close(valueClose);

          }
        }, () => { this.loading = false; }, () => { this.loading  = false; });
    }
    }
  }
}
