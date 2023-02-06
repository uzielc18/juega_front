import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {AppService} from "../../../state/app.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-c-students',
  templateUrl: './c-students.component.html',
  styleUrls: ['./c-students.component.scss']
})
export class CStudentsComponent implements OnInit, OnDestroy, OnChanges {

  data: any =[];
  a: any;
  @Input() events: any;
  @Input() amigosOnlineData: any = [];
  @Output() eventOpenChat = new EventEmitter<any>();
  eventsSubscription: any = Subscription;
  constructor(private generalService: GeneralService,
              private appService: AppService,) { }


  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe((res: any) => {
      this.a = res
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
/*
    this.getStudents();
*/
  }
  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
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


  openChat(item: any){
    //this.eventOpenChat.emit(item)
  }



}
