import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralService} from "../../../../providers";

@Component({
  selector: 'app-poll-home',
  templateUrl: './poll-home.component.html',
  styleUrls: ['./poll-home.component.scss']
})
export class PollHomeComponent implements OnInit {

  loading: boolean = false;
  data: any = [];
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getData();
  }
  crearView() {
    this.router.navigate([`created`], { relativeTo: this.activatedRoute.parent});
  }

  getData(){
    const serviceName = 'inquiries';
    const params = {
      tabla: 'tutoria'
    }
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      if(res.success){
        this.data = res.data
      }
    })
  }

}
