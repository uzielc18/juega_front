import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ng2-charts-component',
  templateUrl: './ng2-charts-component.component.html',
  styleUrls: ['./ng2-charts-component.component.scss']
})
export class Ng2ChartsComponentComponent implements OnInit {

  @Input() data: any;
  @Input() type: any = 'ELEC'
  constructor() { }

  ngOnInit(): void {
  }

}
