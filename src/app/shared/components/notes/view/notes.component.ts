import { Component, OnInit } from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {ActivatedRoute} from "@angular/router";
import {NbDialogService} from "@nebular/theme";
import {MActivitiesComponent} from "./components/modals/m-activities/m-activities.component";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  items: any = [];
  itemStudents: any = [];
  idCargaCursoDocente: any = this.activatedRoute.snapshot.paramMap.get('id_carga_curso_docente');
  loading:boolean = false;

  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }
  constructor(private generalService: GeneralService,
              private activatedRoute: ActivatedRoute,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.getData();
    console.log(this.rolSemestre.semestre)

  }
  getData(){
    this.loading = true
    const params ={
      id_carga_curso_docente: this.idCargaCursoDocente
    }
    const serviceName = END_POINTS.base_back.evaluations_Registry + '/get-evaluations';
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      this.items = res.data.evaluations;
      console.log(this.items[0].id_carga_curso)
      this.itemStudents = res.data.students;
    }, () => {this.loading = false}, () => {this.loading = false});

  }

  openElement(item: any){
    this.dialogService.open(MActivitiesComponent,{
      dialogClass: 'dialog-limited-height',
      context: {
        item: item,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(resp => {
      if (resp === 'ok'){
        //this.getData();
      }
    })
  }

  obtenerRubros(){
    this.loading = true
    const serviceName = END_POINTS.base_back.config + '/get-evaluations';
    this.generalService.nameIdAndIdAndId$(serviceName, this.items[0].id_carga_curso, '0', this.rolSemestre.semestre.codigo).subscribe(res => {
      console.log(res)
    }, () => {this.loading = false}, () => {this.loading = false});
  }
}
