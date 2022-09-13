import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-poll-home',
  templateUrl: './poll-home.component.html',
  styleUrls: ['./poll-home.component.scss']
})
export class PollHomeComponent implements OnInit {

  loading: boolean = false;
  constructor(private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }
  crearView() {
    this.router.navigate([`created`], { relativeTo: this.activatedRoute.parent});
  }


}
