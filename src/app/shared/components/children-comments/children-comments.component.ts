import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { EditCommentForumComponent } from './edit-comment-forum/edit-comment-forum.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-children-comments',
  templateUrl: './children-comments.component.html',
  styleUrls: ['./children-comments.component.scss']
})
export class ChildrenCommentsComponent implements OnInit, OnChanges {
  loading: boolean = false;
  @Input() element: any;
  @Input() userInfo: any;
  @Input() viewRespond: boolean = true;
  @Input() getValidComent: boolean = false;
  @Input() options: boolean = true;
  formHeader: any = FormGroup;
  @Input() list: any = [];
  @Output() changeEmit: EventEmitter<any> = new EventEmitter();
  @Input() pending: any;
  constructor(private formBuilder: FormBuilder, private generalService: GeneralService, private dialogService: NbDialogService) { }

  ngOnChanges():void {
    this.element = this.element;
    this.viewRespond = this.viewRespond;
    this.list = this.list;
    this.getValidComent = this.getValidComent;
    this.options = this.options;
    this.pending = this.pending;
    // console.log(this.pending, 'id');

  }
  ngOnInit(): void {
    this.fieldReactive();
    // this.getResponsesDocen();
  }
  private fieldReactive() {
    const controls = {
      comentario: ['', [Validators.required]],
    }
    this.formHeader = this.formBuilder.group(controls);
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
  get valiNota() {
    if (this.pending?.student_pending?.nota) {
      return false;
    } else {
      return true;
    }
  }

  responder(comentario:any) {
    if (comentario.checked) {
      comentario.checked = false;
    } else {
      comentario.checked = true;
    }

  }

  saveDocComment(item:any) {
    const serviceName = 'forumsResponses';
    // let date = new Date();
    // let fecha = date.toISOString().split('T')[0];
    // let hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    // const f_h = fecha + ' ' + hora;
    const params = {
      forum_id : this.element.forums.id || '',
      person_id: this.userInfo.id,
      forums_response_id: item.id,
      respuesta: item.enviar_comentario,
      pending_id: '',
    };
    if (params && params.forum_id && params.person_id) {
      this.loading = true;
      this.generalService.addNameData$(serviceName, params).subscribe(r => {
        if (r.success) {
          this.changeEmit.emit();
          item.enviar_comentario = '';
        }
      }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
  formatDate(date: any) {
    if (date) {
      const fec = date.split(' ');
      const da = fec[0];
      const time = fec[1];
      const fecha = da.split('-');
      var n = `${fecha[2]}/${fecha[1]}-${fecha[0]} ${time}`;
      if (n) {
        return n;
      } else {
        return 'Sin fecha';
      }
    } else {
      return 'Sin fecha';
    }
  }
  openEditComment(comentario:any) {
    this.dialogService.open(EditCommentForumComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        item: comentario,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        this.changeEmit.emit();
      }
    });
  }
  deleteComment(item:any) {
    const serviceName = 'forumsResponses';
    if (item.id) {
      Swal.fire({
        title: 'Eliminar',
        text: '¿ Desea eliminar el comentario ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
          if (result.isConfirmed) {
            this.loading = true;
            const params = {
              pending_id: item.forums_response_id === 0 ? this.pending?.student_pending?.id : '',
            }
            this.generalService.deleteNameIdParams$(serviceName, item.id, params).subscribe(r => {
              if (r.success) {
                this.changeEmit.emit();
              }
            }, () => { this.loading =false; }, () => { this.loading =false; });
          }
        });
      }
  }
  saveComment() {
    const forms = this.formHeader.value;
    const serviceName = 'forumsResponses';
    // let date = new Date();
    // let fecha = date.toISOString().split('T')[0];
    // let hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    // const f_h = fecha + ' ' + hora;
    const params = {
      forum_id : this.element.forums.id || '',
      person_id: this.userInfo.id,
      forums_response_id: 0,
      respuesta: forms.comentario,
      pending_id: this.pending?.student_pending?.id || '',
    };
    if (params && params.forum_id && params.person_id) {
      this.loading = true;
      this.generalService.addNameData$(serviceName, params).subscribe(r => {
        if (r.success) {
          this.formHeader.reset();
          this.changeEmit.emit();
        }
      }, () => { this.loading = false; }, () => { this.loading = false; });
    }
  }
}
