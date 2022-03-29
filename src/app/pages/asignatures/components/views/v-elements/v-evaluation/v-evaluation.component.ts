import { Component, Input, OnChanges, OnInit } from '@angular/core';
@Component({
  selector: 'app-v-evaluation',
  templateUrl: './v-evaluation.component.html',
  styleUrls: ['./v-evaluation.component.scss']
})
export class VEvaluationComponent implements OnInit, OnChanges {
  @Input() element: any;
  @Input() userInfo: any;
  @Input() pending: any;
  constructor(
  ) { }
  ngOnChanges():void {
    this.pending = this.pending;
    console.log(this.pending, this.element, 'elllllllllll');
    
  }
  ngOnInit(): void {
  }
}
