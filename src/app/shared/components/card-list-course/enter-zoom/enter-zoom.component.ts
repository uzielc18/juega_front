import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-enter-zoom',
  templateUrl: './enter-zoom.component.html',
  styleUrls: ['./enter-zoom.component.scss']
})
export class EnterZoomComponent implements OnInit {

  loading: boolean = false;
  @Input() item:any;

  constructor(public activeModal: NbDialogRef<EnterZoomComponent>) { }

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

  closeModal() {
    this.activeModal.close('ok');
  }
  irUrl() {
    if (this.item && this.item.join_url !== null) {
      window.open(this.item.join_url, '_blank');
    }
  }

}
