import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-element-home',
  templateUrl: './element-home.component.html',
  styleUrls: ['./element-home.component.scss'],
})
export class ElementHomeComponent implements OnInit {
  formHeader: any = FormGroup;

  listOfCourses: any = [];
  listOFTopics: any = [];
  selectedTopics: any = [];

  filteredGroups$!: Observable<any[]>;

  loading: boolean = false;

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
      termino: ['', [Validators.required]],
      terminoUnidad: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.getListOfCourses();
  }

  initTopics() {
    if (this.listOfCourses.length > 0) {
      this.filteredGroups$ = of(this.listOfCourses);
      this.filteredGroups$ = this.formHeader.controls['termino'].valueChanges.pipe(
        startWith(''),
        map((filterString: any) => this.filter(filterString))
      );
    }
  }

  getListOfCourses() {
    const serviceName = END_POINTS.base_back.default + 'get-courses-topics';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe(
      (res: any) => {
        if (res.success) {
          this.listOfCourses = res.data;
          this.listOfCourses.map((course: any) => {
            course.topics.map((topic: any) => {
              topic.checked = false;
              topic.course_name = course.nombre;
            });
          });
          console.log(this.listOfCourses);
          //
          this.initTopics();
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

  private filterChildren(children: any, filterValue: any) {
    return children.filter((optionValue: any) => optionValue.tema.toLowerCase().includes(filterValue));
  }

  private filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.listOfCourses
      .map((group: any) => {
        return {
          nombre: group.nombre,
          topics: this.filterChildren(group.topics, filterValue),
        };
      })
      .filter((group: any) => group.topics.length);
  }

  trackByFn(index: any, item: any) {
    return item.nombre;
  }

  setCourse(item: any) {
    this.listOFTopics = item.topics;
    this.formHeader.controls['termino'].setValue(item.nombre);
  }

  setTopics(item: any) {
    item.checked = !item.checked;
    if (item.checked) {
      this.selectedTopics.push(item);
    } else {
      this.selectedTopics = this.selectedTopics.filter((topic: any) => topic.id !== item.id);
    }
    // order by course_name
    this.selectedTopics = this.selectedTopics.sort((a: any, b: any) => {
      if (a.course_name < b.course_name) {
        return -1;
      }
      if (a.course_name > b.course_name) {
        return 1;
      }
      return 0;
    });
    console.log(this.selectedTopics);
    this.formHeader.controls['termino'].setValue('');
  }

  searchCourses() {}

  resetCourses() {
    this.formHeader.controls['termino'].setValue('');
    this.listOFTopics = [];
  }

  closeCourses(event: any) {
    console.log(event, 'hola');
  }
}
