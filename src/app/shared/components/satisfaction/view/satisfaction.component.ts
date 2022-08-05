import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {GeneralService} from "../../../../providers";
import {AppService} from "../../../../core";

@Component({
  selector: 'app-satisfaction',
  templateUrl: './satisfaction.component.html',
  styleUrls: ['./satisfaction.component.scss']
})
export class SatisfactionComponent implements OnInit {
  user: any;
  loading: boolean = false;
  valor: any
  items: any = [];
  @Input() activeModal: any;
  constructor(private generalService: GeneralService,
              private appService: AppService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){

    this.loading = true;
    const serviceName = 'sin-perception';
    const today = new Date();
    let date = today.toISOString().split('T')[0];
    let hour = today.getHours();
    let sec = today.getMinutes();
    let fullHour = hour +':'+ sec
    this.user = this.appService.user
    this.generalService.nameIdAndIdAndIdAndId$(serviceName, this.user.person.id, this.user.person.codigo, date, fullHour).subscribe(res => {
      this.items = res.data
      if(this.items.length === 0){
        this.activeModal.close('ok')
      }
    }, () => {this.loading = false}, () => {this.loading = false})
  }

  satisfactionFace(code: any, item: any){
    if(code == 1){
      this.valor = 1
    }
    if(code == 2) {
      this.valor = 2
    }
    if(code == 3){
      this.valor = 3
    }
    if(code == 4){
      this.valor = 4
    }
    if(code == 5){
      this.valor = 5
    }
    this.loading = true
    const serviceName = 'ratings';
    const params = {
      codigo: 'caritas',
      type_rating_id: 3,
      valor: this.valor,
      tabla: 'schedules',
      tabla_id: item.tabla_id,
      person_id: this.user.person.id
    }
    this.generalService.addNameData$(serviceName, params).subscribe(res => {
      if(res.success){
        this.getData();
      }
    });

  }


}
