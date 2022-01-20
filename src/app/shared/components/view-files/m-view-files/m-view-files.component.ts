import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-m-view-files',
  templateUrl: './m-view-files.component.html',
  styleUrls: ['./m-view-files.component.scss']
})
export class MViewFilesComponent implements OnInit {
  loading:boolean = false;
  @Input() item:any;
  constructor(public activeModal: NbDialogRef<MViewFilesComponent>) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.activeModal.close('close');
  }
  loadingsFiles($event:any) {
    setTimeout(() => {
      this.loading = $event;
    }, 1000);
  }
}
