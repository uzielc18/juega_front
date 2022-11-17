import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GeneralService} from "../../../../../providers";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../../providers/utils";
import {AppService} from "../../../../../core";
import {EditUserComponent} from "../../../../../shared/components/edit-user/edit-user.component";
import {NbDialogService} from "@nebular/theme";
import {ViewImgComponent} from "./components/view-img/view-img.component";

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
  emmitDatos: any;
  @Input() listTeachers: any = []
  codigo_CP: any;
  @Input() profile: any;
  @Input() listInquiries: any;
  @Input() listTutoria: any;
  @Input() listElections: any;
  @Output() valueEmmit2: EventEmitter<boolean> = new EventEmitter();
  @Output() valueEmmitteacher: EventEmitter<boolean> = new EventEmitter();
  formHeader: any = FormGroup;
  loading: boolean = false
  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService,
              private formBuilder: FormBuilder,
              private userService: AppService,) { }

  ngOnInit(): void {
    this.userInfo = this.userService
    this.fieldReactive();
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
    this.valueEmmit2.emit($event)
  }
  validateDate(item: any){
    const y = new Date().getFullYear();
    const m = new Date().getMonth();
    const d = new Date().getDate();
    const now2 =  new Date(y, m, d,).getTime();
    const now = new Date(now2).getTime();
    const fecha_fin = new Date(item.fecha_fin).getTime();
    if(fecha_fin === now){
      return true
    }
    return false
  }
  validateConfigurationElection(){
   const a = this.userInfo?.configurations.find((f:any) => {
      if(f.nombre === "ACTIVAR_ELECCION"){
        return f.valor === "1";
      }else{
        return false
      }
    });
    return !!a;


  }
  renderDate(date: any) {
    if (date) {
      const fecha = date.split('-');
      var n = new Date(`${fecha[0]}-${fecha[1]}-${fecha[2]}`);
      n.setMinutes(n.getMinutes() + n.getTimezoneOffset()); //para solucionar la diferencia de minutos
      if (n.getDate()) {
        return n;
      } else {
        return '';
      }
    }
    return '';
  }
  validateDateTeacher(){
    const y = new Date().getFullYear();
    const m = new Date().getMonth();
    const d = new Date().getDate();
    const now =  new Date(y, m, d,).getTime();
    const fecha_fin = this.renderDate('2022-11-17');
    const a = new Date(fecha_fin).getTime();
    if(a === now){
      return true
    }
    return false
  }
  valueEmmitDocente($event: any){
    if($event === 'refresh'){
      this.valueEmmitteacher.emit($event);
    }
    //this.codigo_CP = $event
  }

  viewImage(item : any){
    this.dialogService
      .open(ViewImgComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          item: item
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
      if (result === 'ok') {
        //this.getTeachers();
      }
    });
  }
}
