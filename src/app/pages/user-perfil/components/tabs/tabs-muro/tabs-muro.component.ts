import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from "../../../../../providers";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../../providers/utils";
import {AppService} from "../../../../../core";

@Component({
  selector: 'app-tabs-muro',
  templateUrl: './tabs-muro.component.html',
  styleUrls: ['./tabs-muro.component.scss']
})
export class TabsMuroComponent implements OnInit {

  reponderComentario: boolean = false
  valid: boolean = false;
  showImput: boolean = false;
  userInfo: any;
  @Input() profile: any;
  @Input() listInquiries: any;
  @Input() listTutoria: any;
  @Input() listElections: any;
  formHeader: any = FormGroup;
  loading: boolean = false
  constructor(private generalService: GeneralService,
              private formBuilder: FormBuilder,
              private userService: AppService,) { }

  ngOnInit(): void {
    this.userInfo = this.userService
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      comentario: ['']
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  loadingsFiles($event: boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 200);
  }
  showComment(item : any){
    if(!item.checked){
      item.checked = true;
      this.showImput = true;
    }else{
      item.checked = false;
    }

  }
  formatDate(date: any) {
    if (date) {
      const fec = date.split(' ');
      const da = fec[0];
      const time = fec[1];
      const fecha = da.split('-');
      var n = `${fecha[2]}/${fecha[1]}/${fecha[0]} ${time}`;
      if (n) {
        return n;
      } else {
        return 'Sin fecha';
      }
    } else {
      return 'Sin fecha';
    }
  }
  responder() {
    if(!this.reponderComentario){
      this.reponderComentario = true;
    }else{
      this.reponderComentario = false;
    }

  }
  loadingsForm($event: boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 100);
  }
  valueEmmit($event: any){
    console.log($event, "aaaaaaaaaaaaa")

  }
}
