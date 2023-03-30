import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NbDialogService} from "@nebular/theme";
import Swal from "sweetalert2";
import {AppService} from "../../../../core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {MNewEncuentrosComponent} from "../../encuentros/components/modals/m-new-encuentros/m-new-encuentros.component";

@Component({
  selector: 'app-resultados-home',
  templateUrl: './resultados-home.component.html',
  styleUrls: ['./resultados-home.component.scss']
})
export class ResultadosHomeComponent implements OnInit {

  allDisabled = false;
  selectedIdx = -1;
  loading:boolean = false;
  formHeader: any = FormGroup;
  formBody: any = FormGroup;
  campeonatos:any = [];
  disciplinasData: any = [];
  categoriasData: any = [];
  Datas: any [] = [];
  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private appUserInfo: AppService) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {

    const controls = {
      campeonato: [''],
      diciplina: [{ value: '', disabled: true }, [Validators.required]],
      categoria: [{ value: ''}]
    };
    this.formHeader = this.fb.group(controls);
    this.listCampeonatos();
    this.getCategorias()
  }

  listCampeonatos(){
    this.loading = true
    const serviceName = 'upeucampeonatos';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
      this.campeonatos = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }


  selectCampeonato(item:any){
    this.disciplinasData = [];
    this.formHeader.controls['diciplina'].setValue();
    this.formHeader.controls['campeonato'].setValue(item);
    this.formHeader.controls['diciplina'].enable();
    this.getDisciplina(item.id);
  }
  selectCat(cat:any){
    this.formHeader.controls['categoria'].setValue(cat);
  }

  getDisciplina(campeonato: any){
    const serviceName = 'upeudisciplinas';
    const param={campeonato_id: campeonato || null,};
    this.loading = true;
    this.generalService.nameParams$(serviceName,param).subscribe(res => {
      this.disciplinasData = res.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

  getCategorias(){
    const serviceName = 'upeucategoriasEquipos';
    const param={estado:  1,};
    this.loading = true;
    this.generalService.nameParams$(serviceName,param).subscribe(res => {
      this.categoriasData = res.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }
  filter() {
    const serviceName = 'resultados';
    const form = this.formHeader.value;
    const parmas = {
      campeonato_id: form.campeonato.id,
      disciplina_id: form.diciplina,
      categorias_equipo_id: form.categoria || null,
    }
    this.loading = true;
    this.generalService.nameParams$(serviceName, parmas).subscribe(res => {
      if(res.success) {
        this.Datas = res.data;
      }
    }, () => {this.loading = false}, () => {this.loading = false})
  }

  nuevoEncuentro() {
    this.dialogService.open(MNewEncuentrosComponent, {
      context: {
        userInfo: this.appUserInfo.user,
        code: 'NEW',
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(resp => {
      if(resp === 'ok'){
      }
    })
  }


  saveEncuentro() {
    const encuentros_array:any=[];
    const serviceName = 'encuentros-update';
    const forms = this.formBody.value;
    const params = {
      fecha: forms.fecha,
      lugar: forms.lugar,
      hora: this.datePipe.transform(forms.hora, 'HH:mm:ss'),
      encuentros:encuentros_array,
    };
    console.log(encuentros_array);
    this.generalService.addNameData$(serviceName, params).subscribe((res:any) => {
      if (res.success) {
        this.filter();
      }
    }, () => {this.loading = false;}, () => {this.loading = false;});
  }
}
