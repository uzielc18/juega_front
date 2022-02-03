import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-v-evaluation',
  templateUrl: './v-evaluation.component.html',
  styleUrls: ['./v-evaluation.component.scss']
})
export class VEvaluationComponent implements OnInit {
  @Input() element: any;
  @Input() userInfo: any;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
