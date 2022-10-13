import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tab-poll-camp',
  templateUrl: './tab-poll-camp.component.html',
  styleUrls: ['./tab-poll-camp.component.scss']
})
export class TabPollCampComponent implements OnInit {

  @Output() editInquiries: EventEmitter<any> = new EventEmitter();
  @Output() deleteInquiries: EventEmitter<any> = new EventEmitter();
  @Input() data: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  editInquirie(item: any){
    this.editInquiries.emit(item);
  }
  deleteInquirie(item: any){
    this.deleteInquiries.emit(item)
  }

}
