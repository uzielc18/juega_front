import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import Swal from "sweetalert2";

@Component({
  selector: 'app-react-comment',
  templateUrl: './react-comment.component.html',
  styleUrls: ['./react-comment.component.scss']
})
export class ReactCommentComponent implements OnInit {

  data: any;
  @Input() item: any;
  @Input() type: any;
  @Input() color: any;
  @Input() size: any;
  @Input() icon: any;
  @Input() type_rating: any;
  @Input() userInfo: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  @Output() valueEmmit: EventEmitter<boolean> = new EventEmitter();
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getVoteQuestion(this.item)
  }

  getVoteQuestion(item: any) {
    const serviceName = END_POINTS.base_back.default + 'validar-rating';
    const data = {
      codigo: 'mas_uno' || '',
      type_rating_id: this.type_rating || '',
      valor: 1 || '',
      tabla: 'inquiries' || '',
      tabla_id: item.id || '',
      person_id: this.userInfo?.user.person?.id || '',
    };
    this.loadingsForm.emit(true);
    this.generalService.nameParams$(serviceName, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.data = res.data;
          const arr: any = []
          if(this.data.valor === 1){
            const obj: any = {
              datos: this.data,
              id_tabla:item.id
            }
            //this.valueEmmit.emit(obj)
          }



        }
      },
      () => {
        this.loadingsForm.emit(false);
      },
      () => {
        this.loadingsForm.emit(false);
      }
    );
  }
  upVoteQuestion(item: any) {
    const serviceName = END_POINTS.base_back.default + 'ratings';
    const data = {
      codigo: 'mas_uno' || '',
      type_rating_id: this.type_rating || '',
      valor: 1 || '',
      tabla: 'inquiries' || '',
      tabla_id: item.id || '',
      userid: this.userInfo?.user.id,
      person_id: this.userInfo?.user?.person?.id || '',
    };
    if(this.type_rating === 5){
      Swal.fire({
        title: 'Eliminar',
        text: '¿ Está seguro de elegir esta lista ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#00244E',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.loadingsForm.emit(true);
          this.generalService.addNameData$(serviceName, data).subscribe((res:any) => {
              if (res.success) {
                this.valueEmmit.emit(this.userInfo?.user?.person?.id)
              }
            },
            () => {
              this.loadingsForm.emit(false)
            });
        }
      });
      }else{
        this.loadingsForm.emit(true);
        this.generalService.addNameData$(serviceName, data).subscribe(
          (res: any) => {
            if (res.success) {
              if(this.type_rating === 5){
                this.valueEmmit.emit(this.userInfo?.user?.person?.id)
              }else{
                this.data.valor = this.data.valor + 1;
                this.data.activo = 0;
                this.loadingsForm.emit(false);
              }
            }
          },
          () => {
            this.loadingsForm.emit(false);
          }
        );
      }


  }


}
