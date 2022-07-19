import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from "../../../../providers";
import {END_POINTS} from "../../../../providers/utils";

@Component({
  selector: 'app-note-works',
  templateUrl: './note-works.component.html',
  styleUrls: ['./note-works.component.scss']
})
export class NoteWorksComponent implements OnInit {

  loading:boolean = false;
  data: any = [];
  notas: any = [];
  @Input() item:any;
  @Input() code: any;
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loading = true
    const serviceName = END_POINTS.base_back.activities_evaluations + '/registro-actividades';

    if(this.code == 'ASIG'){
      const params = {
        id_carga_curso_docente: this.item.id_carga_curso_docente,
      }
      this.generalService.nameParams$(serviceName, params).subscribe((res:any) => {
       this.data = res.data
      },() => {this.loading = false}, () => {this.loading = false})
    }else{
      const params = {
        id_carga_curso_docente: this.item.id_carga_curso_docente,
        element_id: this.item.element_id,
      }
      this.generalService.nameParams$(serviceName, params).subscribe(res => {
        this.data = res.data;


      }, () => {this.loading = false}, () => {this.loading = false})
    }
  }
}
