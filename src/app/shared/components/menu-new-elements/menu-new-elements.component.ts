import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from "../../../providers";

@Component({
  selector: 'app-menu-new-elements',
  templateUrl: './menu-new-elements.component.html',
  styleUrls: ['./menu-new-elements.component.scss']
})
export class MenuNewElementsComponent implements OnInit {

  loading: boolean = false
  showUnit: boolean = false
  showSection: boolean = false;
  data: any = [];
  @Input() element: any;
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    setTimeout(() => {
    }, 3000);
  }
  selectUnit(){
    this.showUnit = true
  }


}
