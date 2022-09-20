import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NbDialogRef} from "@nebular/theme";
import {GeneralService} from "../../../../../../../providers";
import {END_POINTS} from "../../../../../../../providers/utils";
import Swal from "sweetalert2";

@Component({
  selector: 'app-m-answers-questions',
  templateUrl: './m-answers-questions.component.html',
  styleUrls: ['./m-answers-questions.component.scss']
})
export class MAnswersQuestionsComponent implements OnInit {

  loading: boolean = false;
  @Input() item:any;
  formHeader: any = FormGroup;
  constructor(public activeModal: NbDialogRef<MAnswersQuestionsComponent>, private formBuilder: FormBuilder, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  closeModal() {
    this.activeModal.close('close');
  }
  private fieldReactive() {
    const controls = {
      comentario: [this.item.respuesta || '', [Validators.required]],
    }
    this.formHeader = this.formBuilder.group(controls);
  }
  update(){
    const serviceName = END_POINTS.base_back.default + 'inquirieAnswers';
    const forms = this.formHeader.value;
    const params = {
      respuesta: forms.comentario,
    };
    this.loading = true;
    this.generalService.updateNameIdData$(serviceName, this.item.id, params).subscribe(r => {
      if (r.success) {
        this.activeModal.close('ok');
      }
    },() => {this.loading = false});
  }
}
