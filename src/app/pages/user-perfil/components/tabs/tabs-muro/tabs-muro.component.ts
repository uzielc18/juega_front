import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from "../../../../../providers";

@Component({
  selector: 'app-tabs-muro',
  templateUrl: './tabs-muro.component.html',
  styleUrls: ['./tabs-muro.component.scss']
})
export class TabsMuroComponent implements OnInit {

  @Input() profile: any;
  @Input() listInquiries: any
  loading: boolean = false
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }

  loadingsFiles($event: boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 200);
  }


}
