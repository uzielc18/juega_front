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
    this.getCanvaInfo();
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
               importado: [],
               fImportar: [],
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
           }]

         this.dataInfoCanva.courses.forEach((m: any) => {
           console.log(m)
           const obj = {
             total: m.total,
             type_teachers_code: m.type_teachers_code
           }
           this.SyncCanva[0].fImportar.push(obj)
         })
          this.dataInfoCanva.courses_en_canva.forEach((m: any) => {
            const obj = {
              total: m.total,
              type_teachers_code: m.type_teachers_code
            }
            this.SyncCanva[0].importado.push(obj)
          })
        console.log(this.SyncCanva)
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
          this.getCanvaInfo();
        }
      }, () => {this.loading= false}, () => {this.loading = false})
    }
    if(item.id == 2){
        const serviceName = 'canva-insert-enrollment-teacher';
        const params = {
          programa_estudio_id: this.items.programa_estudio_id,
          semester_id: this.items.semester
        }
      this.loading = true;
        this.generalService.nameParams$(serviceName, params).subscribe( res => {
          if(res.success){
            this.toastrService.info(status, `${res.message}`);
            this.getCanvaInfo();
          }
        },() => {this.loading= false}, () => {this.loading = false})
    }
    if(item.id === 3){
      const serviceName = 'canva-insert-enrollment';
      const params = {
        programa_estudio_id: this.items.programa_estudio_id,
        semester_id: this.items.semester
      }
      this.loading = true;
      this.generalService.nameParams$(serviceName, params).subscribe( res => {
        if(res.success){
          this.toastrService.info(status, `${res.message}`);
          this.getCanvaInfo();
        }
      },() => {this.loading= false}, () => {this.loading = false})
    }
  }
  syncCanvasCourse(item: any, imp: any){
      if(item.id == 1){
        const serviceName = 'canva-insert-course';
        const forms = this.items;
        const params = {
          id_canva:  forms.id_canva.id_canva,
          programa_estudio_id: forms.id_canva.id,
          semester_id: forms.semester,
          ciclo: forms.ciclo,
          type_teachers_code: imp.type_teachers_code

        }
        this.loading = true;
        this.generalService.nameParams$(serviceName, params).subscribe(res => {
          if(res.success){
            this.toastrService.info(status, `${res.message}`);
            this.getCanvaInfo();
          }
        }, () => {this.loading= false}, () => {this.loading = false})
      }
  }
}
