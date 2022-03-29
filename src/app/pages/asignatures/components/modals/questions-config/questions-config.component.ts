import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AppService } from 'src/app/core';

@Component({
  selector: 'app-questions-config',
  templateUrl: './questions-config.component.html',
  styleUrls: ['./questions-config.component.scss']
})
export class QuestionsConfigComponent implements OnInit {
  loading:boolean = false;
  @Input() item:any;
  userInfo: any;
  constructor(private userService: AppService, public activeModal: NbDialogRef<QuestionsConfigComponent>) { }

  ngOnInit(): void {
    this.getUserInfo();
    console.log(this.item, 'itemsss');
    
  }
  closeModal() {
    this.activeModal.close('close');
  }
  getUserInfo() {
    this.userInfo = this.userService.user;
  }
  saveValues($event:any) {
    if ($event && $event.save_close === 'ok') {
      this.activeModal.close($event);
    }

  }
  loadingsss($event: boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 100);
  }
}
