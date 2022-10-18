import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.scss']
})
export class InquiriesComponent implements OnInit {

  @Input() item: any;
  loading:boolean = false;
  constructor() { }


  ngOnInit(): void {
  }

}
