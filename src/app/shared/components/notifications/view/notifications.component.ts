import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from "../../../../providers";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  @Input() data: any = [];
  noTNF: any;
  loading: boolean = false;
  constructor(private generalService: GeneralService,private router: Router,) { }

  ngOnInit(): void {
  }

  navigation(item: any){

    const serviceName = 'notificationUsers';
    const data = {
      estado: "2"
    }
    if(item.estado === "2"){
      console.log("asdasdasd")
      this.router.navigate([item.url]);
    }else if(item.estado === "1"){
      this.generalService.updateNameIdData$(serviceName, item.id, data).subscribe(res => {
        if(res.success){
          this.router.navigate([item.url]);
          if(res.data.length === 0){
            this.noTNF = res.data.length
          }
        }
      })
    }
  }
}
