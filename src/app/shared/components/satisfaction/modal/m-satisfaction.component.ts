import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {GeneralService} from "../../../../providers";
import {AppService} from "../../../../core";
import {SatisfactionComponent} from "../view/satisfaction.component";

@Component({
  selector: 'app-m-satisfaction',
  templateUrl: './m-satisfaction.component.html',
  styleUrls: ['./m-satisfaction.component.scss']
})
export class MSatisfactionComponent implements OnInit, AfterViewInit {

  user: any;
  loading: boolean = false
  items: any = [];
  @Input() item: any;
  @ViewChild(SatisfactionComponent) child: any;
  constructor(public activeModal: NbDialogRef<MSatisfactionComponent>,
              private generalService: GeneralService,
              private appService: AppService) { }

  ngOnInit(): void {
    console.log(this.appService.user);
  }

  ngAfterViewInit(): void {

  }

}
