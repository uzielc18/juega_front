import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.scss']
})
export class RelationComponent implements OnInit, OnChanges {
  @Input() alternativas:any = [];
  relationList: any[] = [];
  secondList: any[] = [];
  constructor() { }
  ngOnChanges():void {
    this.alternativas = JSON.parse(JSON.stringify(this.alternativas));

    this.relationList = this.alternativas.arrayA;
    this.secondList = this.alternativas.arrayB;
  }
  ngOnInit(): void {
  }
  styles(item: any) {
    if (item && item.checked) {
      // console.log(item.color);
      
      return {
        'background-color': item.color,
        color: 'white',
      };
    } else {
      return {
        'background-color': 'white',
        color: 'black',
      };
    }
  }
  imgStyleDef() {
    return {
      'background-color': '#EDF1F7',
      'border-radius': 'var(--border-radius)',
      overflow: 'hidden',
    };
  }

  imgStyle(item: any) {
    return {
      'background-color': item.bgcolor,
      'border-radius': 'var(--border-radius)',
      overflow: 'hidden',
    };
  }
}
