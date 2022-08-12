import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {GeneralService} from "../../../../providers";
import {AppService} from "../../../../core";

@Component({
  selector: 'app-m-notifications',
  templateUrl: './m-notifications.component.html',
  styleUrls: ['./m-notifications.component.scss']
})
export class MNotificationsComponent implements OnInit {

  data: any = [];
  loading: boolean = false;
  constructor(private generalService: GeneralService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.getNotifications();
  }
  closeModal(){

  }
  getNotifications(){
    this.loading = true
    const serviceName = 'notificationUsers';
    const params = {
      user_id: this.appService.user.id
    }
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      this.data = res.data
      this.data.reverse()
        this.data.map((res: any) => {
          if(res.tipo === 'preguntas'){
            res.iconName = 'question-mark-circle-outline';
          }
          if(res.tipo === 'calificaciones'){
            res.iconName = 'file-text-outline';
          }
          if(res.tipo === 'elementos'){
            res.iconName = 'list-outline';
          }
          if(res.tipo === 'justificaciones'){
            res.iconName = 'clipboard-outline';
          }
        })

    },() => {this.loading = false}, () => {this.loading = false})
  }
}
