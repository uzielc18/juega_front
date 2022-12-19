import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-m-sync-canvas',
  templateUrl: './m-sync-canvas.component.html',
  styleUrls: ['./m-sync-canvas.component.scss']
})
export class MSyncCanvasComponent implements OnInit {

  loading: boolean = false;
  @Input() userInfo: any;
  @Input() items: any;
  dataInfoCanva: any;
  SyncCanva: any = []

  constructor(public activeModal: NbDialogRef<MSyncCanvasComponent>,
              private generalService: GeneralService,
              private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.getCanvaInfo()
  }
  closeModal(){
    this.activeModal.close('')
  }

  getCanvaInfo(){
    const serviceName = 'canva-info';
    const params = {
      programa_estudio_id: this.items.programa_estudio_id,
      semester_id: this.items.semester

    }
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      this.dataInfoCanva = res.data
        this.SyncCanva = [
            {
               id: 1,
               name: 'Cursos',
               importado: this.dataInfoCanva.courses_en_canva,
               fImportar: this.dataInfoCanva.courses
           },
           {
               id:2,
               name: 'Docentes',
               importado: this.dataInfoCanva.teacher_en_canva,
               fImportar: this.dataInfoCanva.teachers
           },
           {
             id:3,
             name: 'Matriculas',
             importado: this.dataInfoCanva.enrollments_en_canva,
             fImportar: this.dataInfoCanva.enrollments
           }];


    },() => {this.loading = false}, () => {this.loading = false})
  }

  syncCanvas(item: any) {
    if(item.id == 1){
      const serviceName = 'canva-insert-course';
      const forms = this.items;
      const params = {
        id_canva:  forms.id_canva.id_canva,
        programa_estudio_id: forms.id_canva.id,
        semester_id: forms.semester,
        ciclo: forms.ciclo

      }
      this.loading = true;
      this.generalService.nameParams$(serviceName, params).subscribe(res => {
        if(res.success){
          this.toastrService.info(status, `${res.message}`);
          //this.getCourseZoom();
        }
      }, () => {this.loading= false}, () => {this.loading = false})
    }
    if(item.id == 2){

    }
  }
}
