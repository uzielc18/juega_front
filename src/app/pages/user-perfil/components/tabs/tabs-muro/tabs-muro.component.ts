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
  @Input() profile: any;
  @Input() listInquiries: any
  formHeader: any = FormGroup;
  loading: boolean = false
  constructor(private generalService: GeneralService,
              private formBuilder: FormBuilder,
              private userService: AppService,) { }

  ngOnInit(): void {
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
  verMasRespuestas(item: any){
    if (!item.vermas){
      item.vermas = true;
    }else{
      item.vermas = false;
    }
  }
  upVoteQuestion(question: any) {
    const serviceName = END_POINTS.base_back.default + 'ratings';
    const data = {
      codigo: 'mas_uno' || '',
      type_rating_id: 1 || '',
      valor: 1 || '',
      tabla: 'inquiries' || '',
      tabla_id: question.id || '',
      person_id: this.profile?.user?.person?.id || '',
    };
    this.loading = true;
    this.generalService.addNameData$(serviceName, data).subscribe(
      (res: any) => {
        if (res.success) {
          question.puntos = question.puntos + 1;
          question.puntos_activo = 0;
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
}
