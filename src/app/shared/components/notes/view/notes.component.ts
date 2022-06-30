import { Component, OnInit } from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {ActivatedRoute} from "@angular/router";
import {
  MTypeAlternativesComponent
} from "../../../../pages/configurations/type-alternatives/components/modals/m-type-alternatives/m-type-alternatives.component";
import {NbDialogService} from "@nebular/theme";
import {MActivitiesComponent} from "./components/modals/m-activities/m-activities.component";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  idCargaCursoDocente: any = this.activatedRoute.snapshot.paramMap.get('id_carga_curso_docente');
  loading:boolean = false;
  constructor(private generalService: GeneralService,
              private activatedRoute: ActivatedRoute,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
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
    this.generalService.nameId$(serviceName, this.idCargaCursoDocente).subscribe(res => {
      console.log(res)
    }, () => {this.loading = false}, () => {this.loading = false});
  }
}
