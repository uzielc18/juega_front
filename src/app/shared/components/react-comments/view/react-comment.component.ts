import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";

@Component({
  selector: 'app-react-comment',
  templateUrl: './react-comment.component.html',
  styleUrls: ['./react-comment.component.scss']
})
export class ReactCommentComponent implements OnInit {

  data: any;
  @Input() item: any;
  @Input() color: any;
  @Input() size: any;
  @Input() type_rating: any;
  @Input() userInfo: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
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
          this.data = res.data
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
    this.loadingsForm.emit(true);
    this.generalService.addNameData$(serviceName, data).subscribe(
      (res: any) => {
        if (res.success) {
          this.data.valor = this.data.valor + 1;
          this.data.activo = 0;
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

}
