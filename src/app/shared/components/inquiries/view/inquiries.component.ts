import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.scss']
})
export class InquiriesComponent implements OnInit {

  @Input() item: any;
  @Output() emitEvenetLoad: EventEmitter<boolean> = new EventEmitter();
  loading:boolean = false;
  constructor() { }


  ngOnInit(): void {
  }
  actualizarData(){
    this.emitEvenetLoad.emit(true)
  }


}
