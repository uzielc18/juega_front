import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../core';
import { GeneralService } from '../../../providers';
import { END_POINTS } from '../../../providers/utils';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  newsList: any[] = [];

  collapseLeft: boolean = false;
  collapseTop: boolean = false;

  constructor(private generalService: GeneralService, private userService: AppService) { }

  ngOnInit(): void {
    this.getNews();
  }

  tweakCollapseLeft() {
    this.collapseLeft = !this.collapseLeft;
  }

  tweakCollapseTop() {
    this.collapseTop = !this.collapseTop;
  }

  getNews() {
    const serviceName = END_POINTS.base_back.user + '/news';
    this.generalService.nameId$(serviceName, this.userService.user.id).subscribe((res: any) => {
      if (res.success) {
        this.newsList = res.data || [];
        console.log(this.newsList)
      }
    })
  }
}
