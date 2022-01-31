import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from '../../../../../../providers';
import { END_POINTS } from '../../../../../../providers/utils';
import { CalificarElementEstudentComponent } from '../../../modals/calificar-element-estudent/calificar-element-estudent.component';

@Component({
  selector: 'app-v-forum',
  templateUrl: './v-forum.component.html',
  styleUrls: ['./v-forum.component.scss']
})
export class VForumComponent implements OnInit {
  @Input() element: any;
  @Input() userInfo: any;
  @Input() pending: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  toggle: boolean = false;

  formHeader: any = FormGroup;
  comentarios: any[] = [
    {
      respuesta: 'hohohohohohohohohhohohohoho',
      children_respuesta: [{
        respuesta: 'hohohohohoholalalalalalalala'
      }],
      user_id: 1
    },
    {
      respuesta: 'hohohohohohohohohohohohohohohohhohohohohohohohohohohohohohhohohohohohohhohohohoho',
      children_respuesta: [{
        respuesta: 'hohohohohohohohohohohohohohohhohohohoholalalalalalalala'
      }],
      user_id: 1
    }
  ];

  constructor(private formBuilder: FormBuilder, private generalService: GeneralService, private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.fieldReactive()
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol) {
      return val;
    } else {
      return '';
    }

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
  calificar(element: any) {
    this.dialogService.open(CalificarElementEstudentComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        element: element,
        // response: params,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        // this.filtrar();
      }
    });
  }

  responder() {
    this.toggle = !this.toggle;
  }
}
