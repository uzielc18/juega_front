import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { CalificarElementEstudentComponent } from '../../../modals/calificar-element-estudent/calificar-element-estudent.component';


@Component({
  selector: 'app-v-forum',
  templateUrl: './v-forum.component.html',
  styleUrls: ['./v-forum.component.scss']
})
export class VForumComponent implements OnInit, OnChanges {
  @Input() element: any;
  @Input() userInfo: any;
  @Input() pending: any;
  @Input() rolSem: any;
  @Output() refreshPending: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  formHeader: any = FormGroup;
  @Input() listResponses:any = [];
  constructor(private dialogService: NbDialogService
  ) { }
  ngOnChanges():void {
    this.pending = this.pending;
    this.rolSem = this.rolSem;
    this.listResponses = this.listResponses;
  }
  ngOnInit(): void {
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


  get getValidComent() {
    if (this.rolSemestre?.rol?.name === 'Estudiante') {
      let valids = false;
      if (this.pending?.student_pending?.pending_forum?.permitir_comentarios === 'NO' && this.pending?.student_pending?.pending_forum?.forums_responses?.length < 1) {
        valids = true;
      }
      if (this.pending?.student_pending?.pending_forum?.permitir_comentarios === 'SI') {
        valids = true;
      }
      return valids;
    } else {
      return false;
    }
  }

  changeEmit() {
    setTimeout(() => {
      this.refreshPending.emit();
    }, 1000);
  }
}
