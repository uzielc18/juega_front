import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {GeneralService} from "../../../../providers";

@Component({
  selector: 'app-m-inquiries',
  templateUrl: './m-inquiries.component.html',
  styleUrls: ['./m-inquiries.component.scss']
})
export class MInquiriesComponent implements OnInit {

  validarClose: boolean = false;
  data: any = [];
  loading: boolean = false;
  @Input() infoUser: any;
  constructor(public activeModal: NbDialogRef<MInquiriesComponent>, private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getData();
  }
  closeModal(){
    this.activeModal.close('');
  }
  emitEvenetLoad($event: any){
    if($event === true){
      this.getData();
    }
  }
  getData(){
    const serviceName = 'instrumentos';
    const params = {
      id_persona: this.infoUser
    }
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      if(res.data.length > 0){
          this.data = res.data

        this.data.filter((f: any) => {
          if(f.codigo_estado === 'PENDIENTE'){
            this.validarClose = true
          }
        })
      }
    }, () => {this.loading = false}, () => {this.loading = false})
  }


}
