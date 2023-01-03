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
  daysLeft: any;
  hoursLeft: any;
  minutesLeft: any;
  secondsLeft: any;
  expiredDays: any;
  expiredHours: any;
  expiredMinutes: any;
  expiredSeconds: any;
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
      this.grabacionesData.map((m: any) => {
        m.duration_re = this.durationRecord(m);
        m.sizeRecord = this.sizeRecording(m);
      })
      }, () => {this.loading = false}, () => {this.loading = false}
    )
  }
  getCourseList(){
    this.loading = true
    const serviceName = 'record-zoom-person';
    this.generalService.nameId$(serviceName, this.userService.user.person.id).subscribe(res => {
      this.grabacionesData = res.data

      this.grabacionesData.map((m: any) => {
        m.duration_re = this.durationRecord(m);
        m.sizeRecord = this.sizeRecording(m);
      })
    },() => {this.loading = false}, () => {this.loading = false})
  }
  durationRecord(item: any){
    const start = new Date(item.recording_start).getTime()
    const end = new Date(item.recording_end).getTime();
    const duration = start - end;
    const expired = end - start;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;


    this.daysLeft = Math.floor(duration / day);
    this.hoursLeft = Math.floor((duration % day) / hour);
    this.minutesLeft = Math.floor((duration % hour) / minute);
    this.secondsLeft = Math.floor((duration % minute) / second);

    this.expiredDays = Math.floor(expired / day);
    this.expiredHours = Math.floor((expired % day) / hour);
    this.expiredMinutes = Math.floor((expired % hour) / minute);
    this.expiredSeconds = Math.floor((expired % minute) / second);
      console.log(this.expiredDays,this.expiredHours, this.expiredMinutes, this.expiredSeconds)
      if(this.expiredHours === 0 && this.expiredMinutes === 0){
        console.log('sec')
        return `${this.expiredSeconds}sec.`
      }else if(this.expiredHours === 0 && this.expiredMinutes !== 0 ){
        return `${this.expiredMinutes} min.`
      }else {
        return `${this.expiredHours}hrs ${this.expiredMinutes}min.`
      }
  }
  sizeRecording(item: any){
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (item.file_size == 0) return '0 Byte';
    const i = parseInt(String(Math.floor(Math.log(item.file_size) / Math.log(1024))));
    // @ts-ignore
    return Math.round(item.file_size / Math.pow(1024, i), 2) + ' ' + sizes[i];

  }
  addSession(item: any,tipo: any){
    this.dialogService.open(MAddSessionComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        items: item,
        tipo: tipo,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.getCourseList();
      }
    });
  }
  updateSession(item: any,tipo: any){
    this.dialogService.open(MAddSessionComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        items: item,
        tipo: tipo,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.getCourseList();
      }
    });
  }
}
