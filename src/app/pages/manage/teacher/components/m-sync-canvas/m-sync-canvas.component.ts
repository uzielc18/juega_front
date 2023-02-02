import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from "@nebular/theme";
import {GeneralService} from "../../../../../providers";

@Component({
  selector: 'app-m-sync-canvas',
  templateUrl: './m-sync-canvas.component.html',
  styleUrls: ['./m-sync-canvas.component.scss']
})
export class MSyncCanvasComponent implements OnInit {

  loading:boolean = false;
  @Input() items: any;
  constructor(public activeModal: NbDialogRef<MSyncCanvasComponent>,
              private generalService: GeneralService,
              private toastrService: NbToastrService,) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.activeModal.close('');
  }


  syncCanvas(){
    const serviceName = 'canva-insert-teacher';
    const forms = this.items;
    const params = {
      programa_estudio_id: forms.programa_estudio_id || '',
    }
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      if(res.success){
        this.toastrService.info(status, `${res.message}`);
        this.activeModal.close('ok')
      }
    }, () => {this.loading = false}, () => {this.loading = false})
  }

}
