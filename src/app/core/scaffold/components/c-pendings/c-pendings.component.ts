import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {END_POINTS} from "../../../../providers/utils";
import {AppService} from "../../../state/app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EmitEventsService} from "../../../../shared/services/emit-events.service";

@Component({
  selector: 'app-c-pendings',
  templateUrl: './c-pendings.component.html',
  styleUrls: ['./c-pendings.component.scss']
})
export class CPendingsComponent implements OnInit {

  data: any = [];
  constructor(private generalService: GeneralService,
              private appService: AppService,
              private router: Router,
              public emitEventsService: EmitEventsService,
              private activatedRoute: ActivatedRoute,) {}

  ngOnInit(): void {
    this.getPendings();
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
  getPendings(){
    const serviceName = END_POINTS.base_back.user + '/pendientes-semanal';
    const idPerson = this.appService?.user?.person?.id
    this.generalService.nameIdAndId$(serviceName, idPerson, this.rolSemestre?.semestre.id).subscribe(res =>{
      if(res.success){
        this.data = res.data
      }
      console.log(res)
    })
  }

  locationElement(item: any){
    this.router.navigate([`/pages/asignatures/course/${item.id_carga_curso_docente}/element/${item.element_id}`]);
    this.emitEventsService.enviarUrl(item);
  }
  arrowDown(){

  }

}
