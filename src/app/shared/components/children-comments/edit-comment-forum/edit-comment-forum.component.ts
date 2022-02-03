import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';

@Component({
  selector: 'app-edit-comment-forum',
  templateUrl: './edit-comment-forum.component.html',
  styleUrls: ['./edit-comment-forum.component.scss']
})
export class EditCommentForumComponent implements OnInit {
  loading: boolean = false;
  @Input() item:any;
  formHeader: any = FormGroup;
  constructor(public activeModal: NbDialogRef<EditCommentForumComponent>, private formBuilder: FormBuilder, private generalServi: GeneralService) { }

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
  updateComment() {
    const forms = this.formHeader.value;
    const serviceName = '/forumsResponses';
    const params = {
      respuesta: forms.comentario,
    };
    if (params && params.respuesta) {
      this.loading = true;
      this.generalServi.updateNameIdData$(serviceName, this.item.id, params).subscribe(r => {
        if (r.success) {
          this.activeModal.close('ok');
        }
      }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
}
