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
  }
  getTopics(){
    this.loading = true;
    const serviceName = '/topics-zoom-course';
    this.generalService.nameId$(serviceName, this.items.topic_id).subscribe(res => {
      this.topicsData = res.data;
    }, () => {this.loading = false}, () => {this.loading = false})
  }
  saveElements(){
    this.loading = true;
    const serviceName = '/save-element-zoom';
    const data = {
      topic_id: this.formSession.controls['topic_id'].value,
      id_carga_curso_docente: this.items.id_carga_curso_docente,
      id_carga_curso: this.items.id_carga_curso,
      titulo: this.formSession.controls['titulo'].value
    }
    this.generalService.addNameData$(serviceName, data).subscribe(res => {
      if(res.success){
        this.activeModal.close('ok');
      }
    }, () => {this.loading = false}, () => {this.loading = false})
  }
  closeModal(){
    this.activeModal.close('close');
  }

}
