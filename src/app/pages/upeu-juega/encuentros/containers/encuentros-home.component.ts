import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NbDialogService} from "@nebular/theme";
import {MEncuentrosComponent} from "../components/modals/m-encuentros/m-encuentros.component";
import Swal from "sweetalert2";
import {AppService} from "../../../../core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {MNewEncuentrosComponent} from "../components/modals/m-new-encuentros/m-new-encuentros.component";
import {MEncuentrosBarrasComponent} from "../components/modals/m-encuentros-barras/m-encuentros-barras.component";
import {BehaviorSubject, Observable} from "rxjs";
@Component({
  selector: 'app-encuentros-home',
  templateUrl: './encuentros-home.component.html',
  styleUrls: ['./encuentros-home.component.scss']
})
export class EncuentrosHomeComponent implements OnInit {

  allDisabled = false;
  selectedIdx = -1;
  loading:boolean = false;
  formHeader: any = FormGroup;
  formBody: any = FormGroup;
  campeonatos:any = [];
  disciplinasData: any = [];
  mostrar_div:any= false;
  Datas: any [] = [];
  toogleActivo: boolean = false;
  listaFiltrada: any [] = [];
  private listaFiltradaSubject = new BehaviorSubject<any[]>([]);

  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private appUserInfo: AppService) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const control_body={
      fecha:[''],
      hora:[''],
      lugar:[''],
    };
    this.formBody = this.fb.group(control_body);
    const controls = {
      campeonato: [''],
      diciplina: [{ value: '', disabled: true }, [Validators.required]],
      categoria: [{ value: ''}]
    };
    this.formHeader = this.fb.group(controls);
    this.listCampeonatos();
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

  getDisciplina(campeonato: any){
    const serviceName = 'upeudisciplinas';
    const param={campeonato_id: campeonato || null,};
    this.loading = true;
    this.generalService.nameParams$(serviceName,param).subscribe(res => {
      this.disciplinasData = res.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }

/*  delete(item: any){
    const serviceName = 'upeuencuentros'
    Swal.fire({
      title: 'Eliminar',
      text: '¿ Desea eliminar ? ',
      backdrop: true,
      icon: 'question',
      // animation: true,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#7f264a',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      // timer: 2000,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.generalService.deleteNameId$(serviceName, item.id).subscribe(r => {
          if (r.success) {
            this.getData();
          }
        },() => {this.loading = false;},() => {this.loading = false;});
      }
    });
  }*/
  filter() {
      const serviceName = 'listar-encuentros';
      const form = this.formHeader.value;
      const parmas = {
        campeonato_id: form.campeonato.id,
        disciplina_id: form.diciplina,
      }
      this.loading = true;
      this.generalService.nameParams$(serviceName, parmas).subscribe(res => {
        if(res.success) {
          this.Datas = res.data

          this.Datas.forEach((f: any) => {
            f.encuentros.map((m: any) => {
              m.seleccionado = false;
              this.mostrar_div=false;
            })
          })
          this.listaFiltrada = this.Datas
        }
      }, () => {this.loading = false}, () => {this.loading = false})
  }

  onCheckboxChange(event: any, idxj: number, idxi: number) {

    this.Datas.forEach((f: any, index: any) => {
      if(index === idxj) {
        f.encuentros.forEach((m: any, i: number) => {
          if (i === idxi) {
              m.seleccionado = true;
              this.mostrar_div=true;
          }
        })
      }
    });
  }
  nuevoEncuentro() {
    this.dialogService.open(MEncuentrosComponent, {
      context: {
        userInfo: this.appUserInfo.user,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(resp => {
      if(resp === 'ok'){
      }
    })
  }
  encuentro(item: any,code: any){
    if(item.fecha && item.hora){
      this.dialogService.open(MNewEncuentrosComponent, {
        context: {
          userInfo: this.appUserInfo.user,
          code: code,
          item: item,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      }).onClose.subscribe(resp => {
        if(resp === 'ok'){
          this.filter();
        }
      })
    }
  }

  barras(item: any,code: any){
    if(item.fecha && item.hora){
      this.dialogService.open(MEncuentrosBarrasComponent, {
        context: {
          userInfo: this.appUserInfo.user,
          code: code,
          item: item,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      }).onClose.subscribe(resp => {
        if(resp === 'ok'){
          this.filter();
        }
      })
    }
  }

  saveEncuentro() {
    const encuentros_array:any=[];
    this.Datas.forEach((f: any) => {
      f.encuentros.map((m: any) => {
        if(m.seleccionado===true){
          encuentros_array.push(m);
        }
      })
    })
    const serviceName = 'encuentros-update';
    const forms = this.formBody.value;
    const params = {
      fecha: forms.fecha,
      lugar: forms.lugar,
      hora: this.datePipe.transform(forms.hora, 'HH:mm:ss'),
      encuentros:encuentros_array,
    };
    this.generalService.addNameData$(serviceName, params).subscribe((res:any) => {
        if (res.success) {
          this.filter();
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});
  }

  showEstadoEncuentro(event: any) {
    this.toogleActivo = event.target.checked
  }

  buscarEncuentros(event: any) {
    const valorBusqueda = event.target.value.toLowerCase();
    this.listaFiltrada = this.Datas.map((d: any) => {
      return {
        ...d,
        encuentros: d.encuentros.filter((encuentro: any) => {
          return encuentro.local_name.toLowerCase().includes(valorBusqueda)
            || encuentro.local.toLowerCase().includes(valorBusqueda)
            || encuentro.local.toLowerCase().includes(valorBusqueda)
          })

      }
    });
    // console.log(this.listaFiltrada)
  }

}
