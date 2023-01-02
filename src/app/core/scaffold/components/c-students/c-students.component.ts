import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {AppService} from "../../../state/app.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-c-students',
  templateUrl: './c-students.component.html',
  styleUrls: ['./c-students.component.scss']
})
export class CStudentsComponent implements OnInit, OnDestroy {

  data: any =[];
  a: any;
  @Input() events: any;
  @Output() eventOpenChat = new EventEmitter<any>();
  eventsSubscription: any = Subscription;
  constructor(private generalService: GeneralService,
              private appService: AppService,) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getStudents();
    },6000)
    this.eventsSubscription = this.events.subscribe((res: any) => {
      this.a = res
      console.log(this.a)

    });

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
  getStudents(){
    const serviceName = END_POINTS.base_back.user + '/amigos-online';
    const idPerson = this.appService?.user?.person?.id;
    this.generalService.nameIdAndId$(serviceName, idPerson, this.rolSemestre?.semestre?.id).subscribe(res => {
    this.data = res.data;
      this.data.map((m: any) => {
        m.winStateChat = false
      })
    })
  }

  openChat(item: any){
    //this.eventOpenChat.emit(item)
  }

}
