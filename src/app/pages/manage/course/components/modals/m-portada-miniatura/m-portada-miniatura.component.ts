import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-m-portada-miniatura',
  templateUrl: './m-portada-miniatura.component.html',
  styleUrls: ['./m-portada-miniatura.component.scss']
})
export class MPortadaMiniaturaComponent implements OnInit {
  loading:boolean = false;
  @Input() keyFile:any;
  @Input() directori:any;
  constructor(public activeModal: NbDialogRef<MPortadaMiniaturaComponent>) { }

  ngOnInit(): void {
    console.log(this.keyFile, this.directori);
    
  }
  closeModal() {
    const result = {
      close: 'close',
      value: '',
    }
    this.activeModal.close(result);
  }
  fileResult($event:any) {
    const result = {
      close: 'ok',
      value: $event,
    }
    this.activeModal.close(result);
  }
}
