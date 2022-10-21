import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-m-reporte-notas',
  templateUrl: './m-reporte-notas.component.html',
  styleUrls: ['./m-reporte-notas.component.scss']
})
export class MReporteNotasComponent implements OnInit {

  loading: boolean = false
  nowDate: any = new Date();
  data:any = [];
  @Input() item: any
  @Input() profile:any
  constructor(public activeModal: NbDialogRef<MReporteNotasComponent>) { }

  ngOnInit(): void {
    this.getdata();
  }
  closeModal(){
      this.activeModal.close('close')
  }
  getdata(){
    this.data = this.item.evaluaciones
    this.data.map((x:any)=>{
      let now = new Date().getTime();
      let fecha_fin = new Date(x.fecha_fin).getTime()
      let fecha = now - fecha_fin;

      if(x.fecha_entrega !== null){
        x.estado = 'Entregado';
      } else{
        if(now > fecha_fin){
          x.estado = 'Vencido';
          x.fechaEstado = this.convertMsToTime(fecha);
        }else{
          x.estado = 'Pendiente';
          x.fechaEstado = this.convertMsToTime(fecha);
        }
      }


    })
   // console.log(this.data)

  }
  padTo2Digits(num: any) {
    return num.toString().padStart(2);
  }

  convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000) || 0;
    let minutes = Math.floor(seconds / 60) || 0;
    let hours = Math.floor(minutes / 60) || 0;
    let days = Math.floor(hours / 24) || 0;
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
    return `${this.padTo2Digits(days)}`;
  }

  stylePrint(){

  }
}
