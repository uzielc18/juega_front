import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MUnitSessionComponent} from "../../../shared/components/unit-session/modal/m-unit-session.component";
import {MAddSessionComponent} from "../components/modals/m-add-session/m-add-session.component";
import {NbDialogService} from "@nebular/theme";
import {END_POINTS} from "../../../providers/utils";
import {GeneralService} from "../../../providers";
import {AppService} from "../../../core";

@Component({
  selector: 'app-films-home',
  templateUrl: './films-home.component.html',
  styleUrls: ['./films-home.component.scss']
})
export class FilmsHomeComponent implements OnInit {

  loading:boolean = false;
  formHeader: any = FormGroup;
  user: any;
  items: any = [];
  grabacionesData: any = [];
  constructor(private fb: FormBuilder,
              private dialogService: NbDialogService,
              private generalService: GeneralService,
              private userService: AppService,) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.SelectCoursesList();
    this.getCourseList()
    console.log()

  }

  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }

  private fieldReactive() {
    const controls = {
      curso_id: [''],
    };
    this.formHeader = this.fb.group(controls);
  }

  SelectCoursesList(){
    this.loading = true
    const serviceName = 'select-course';
    const params:any = {
      semester_id: this.rolSemestre.semestre.id,
    };
    this.generalService.nameIdParams$(serviceName,this.userService.user.person.id, params).subscribe(res => {
        this.items = res.data || [];
      },() => {this.loading = false}, ()=>{this.loading = false}
    )
}
  listarGrabaciones(){
    this.loading = true
    const serviceName = END_POINTS.base_back.config + '/zoom-control';
    const id = this.formHeader.controls['curso_id'].value;
    this.generalService.nameIdAndId$(serviceName,id,6).subscribe(res => {
       this.grabacionesData = res.data
      }, () => {this.loading = false}, () => {this.loading = false}
    )
  }
  getCourseList(){
    this.loading = true
    const serviceName = 'record-zoom-person';
    this.generalService.nameId$(serviceName, this.userService.user.person.id).subscribe(res => {
      this.grabacionesData = res.data
    },() => {this.loading = false}, () => {this.loading = false})
  }
  addSession(){
    this.dialogService.open(MAddSessionComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        items: 'item',
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        //this.getCourseZoom();
      }
    });
  }
}
