import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { ConfigZoomComponent } from 'src/app/shared/components/config-zoom/config-zoom.component';

@Component({
  selector: 'app-zoom-course',
  templateUrl: './zoom-course.component.html',
  styleUrls: ['./zoom-course.component.scss']
})
export class ZoomCourseComponent implements OnInit {
  loading: boolean = false;
  @Input() item:any;
  formHeader: any = FormGroup;
  listCourseZoom:any = [];
  // listProgramStudy:any = [];
  // ciclos = [{ciclo: '1'}, {ciclo:'2'}, {ciclo:'3'}, {ciclo:'4'}, {ciclo:'5'}, {ciclo:'6'}, {ciclo:'7'}, {ciclo:'8'}, {ciclo:'9'}, {ciclo:'10'}, {ciclo:'11'}, {ciclo:'12'}, {ciclo:'13'}, {ciclo:'14'}];
  constructor(public activeModal: NbDialogRef<ZoomCourseComponent>, private generalServi: GeneralService, private formBuilder: FormBuilder,
    private dialogService: NbDialogService) { }

  ngOnInit(): void {
    // console.log(this.item.programa_estudio_id);
    
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      programa_estudio_id: [this.item && this.item.programa_estudio_id || ''],
      ciclo: [this.item && this.item.ciclo || ''],
      grupo: [this.item && this.item.grupo || ''],
    };
    this.formHeader = this.formBuilder.group(controls);
    // this.getProgramStudy();
    this.getCourseZoom();
  }
  closeModal() {
    this.activeModal.close('close');
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol){
      return val;
    } else {
      return '';
    }

  }
  openConfig(items:any) {
    this.dialogService.open(ConfigZoomComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        datos: items,

      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.getCourseZoom();
      }
    });
  }
  // getProgramStudy() {
  //   const serviceName = 'programaEstudios';
  //   this.generalServi.nameAll$(serviceName).subscribe((res:any) => {
  //     this.listProgramStudy = res.data || [];
  //     if (this.listProgramStudy.length>0) {
  //       this.getCourseZoom();
  //     }
  //   });
  // }
  // changeProgramStudy() {
  //   this.getCourseZoom();
  // }
  // changeCiclo() {
  //   this.getCourseZoom();
  // }
  getCourseZoom() {
    const serviceName = 'courses';
    const forms =  this.formHeader.value;
    const params = {
      programa_estudio_id: forms.programa_estudio_id || '',
      ciclo: forms.ciclo || '',
      grupo: forms.grupo || '',
      paginate: 'N',
      semester_id: this.rolSemestre.semestre.id || '',
    }
    if (params && params.programa_estudio_id && params.ciclo && params.grupo) {
      this.loading = true;
      this.generalServi.nameParams$(serviceName, params).subscribe((res:any) => {
        this.listCourseZoom = res.data || [];
      }, () => {this.loading = false}, () => {this.loading = false});
    }
  }

}