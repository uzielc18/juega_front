import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../../../../../../providers';
import { END_POINTS } from '../../../../../../providers/utils';

@Component({
  selector: 'app-v-forum',
  templateUrl: './v-forum.component.html',
  styleUrls: ['./v-forum.component.scss']
})
export class VForumComponent implements OnInit {
  @Input() element: any;
  @Input() userInfo: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();

  formHeader: any = FormGroup;
  comentarios: string[] = [];

  constructor(private formBuilder: FormBuilder, private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.fieldReactive()
  }

  private fieldReactive() {
    const controls = {
      comentario: ['', [Validators.required]],
    }
    this.formHeader = this.formBuilder.group(controls);
  }

  get validCampos(): any {
    const form = this.formHeader.value;
    if (!form.comentario) {
      return true;
    } else {
      return false;
    }
  }

  saveComment() {
    const forms = this.formHeader.value;
    // const serviceName = END_POINTS.base_back.elements;

    // let date = new Date();
    // let fecha = date.toISOString().split('T')[0];
    // let hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    // const f_h = fecha + ' ' + hora;
    // const params = {
    //   comentario: forms.comentario,
    // };

    if (!this.validCampos) {
      // this.generalService.addNameData$(serviceName, params).subscribe(r => {

      // });
      this.comentarios.push(forms.comentario);
      this.formHeader.reset();
    }
  }
}
