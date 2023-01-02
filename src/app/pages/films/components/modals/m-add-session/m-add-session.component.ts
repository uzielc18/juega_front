import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../providers";

@Component({
  selector: 'app-m-add-session',
  templateUrl: './m-add-session.component.html',
  styleUrls: ['./m-add-session.component.scss']
})
export class MAddSessionComponent implements OnInit {

  loading:boolean = false;
  topicsData: any = [];
  @Input() items: any;
  @Input() tipo: any;
  formSession: any = FormGroup
  constructor(public activeModal: NbDialogRef<MAddSessionComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldsReactive();
    this.getTopics();
  }

  private fieldsReactive(){
    const controls = {
      topic_id: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
    }
    this.formSession = this.fb.group(controls);
    if(this.tipo=='EDITAR'){
      this.setUpdate();
    }
  }
  getTopics(){
    this.loading = true;
    const serviceName = 'topics-zoom-course';
    this.generalService.nameId$(serviceName, this.items.course_id).subscribe(res => {

      this.topicsData = res.data;

    }, () => {this.loading = false}, () => {this.loading = false})
  }
  saveElements(){
    this.loading = true;
    const serviceName = 'save-element-zoom/'+this.items.id;
    const data = {
      topic_id: this.formSession.controls['topic_id'].value,
      id_carga_curso_docente: this.items.id_carga_curso_docente,
      id_carga_curso: this.items.id_carga_curso,
      titulo: this.formSession.controls['titulo'].value
    }
    if(this.tipo=='EDITAR'){
      this.generalService.updateNameIdData$(serviceName,this.items.element_id,data).subscribe(res => {
        if(res.success){
          this.activeModal.close('ok');
        }
      }, () => {this.loading = false}, () => {this.loading = false})
    }else{
      this.generalService.addNameData$(serviceName, data).subscribe(res => {
        if(res.success){
          this.activeModal.close('ok');
        }
      }, () => {this.loading = false}, () => {this.loading = false})
    }
  }
  closeModal(){
    this.activeModal.close('close');
  }
  setUpdate(){
    this.formSession.patchValue({
      topic_id: this.items.topic_id,
      titulo: this.items.titulo,
    });
  }

}
