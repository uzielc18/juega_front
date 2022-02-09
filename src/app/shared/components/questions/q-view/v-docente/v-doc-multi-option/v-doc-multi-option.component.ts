import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-doc-multi-option',
  templateUrl: './v-doc-multi-option.component.html',
  styleUrls: ['./v-doc-multi-option.component.scss']
})
export class VDocMultiOptionComponent implements OnInit {
  @Input() alternativas:any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
