import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tab-elections-poll',
  templateUrl: './tab-elections-poll.component.html',
  styleUrls: ['./tab-elections-poll.component.scss']
})
export class TabElectionsPollComponent implements OnInit {

  @Output() editInquiries: EventEmitter<any> = new EventEmitter();
  @Output() deleteInquiries: EventEmitter<any> = new EventEmitter();
  @Input() data:any = [];
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
