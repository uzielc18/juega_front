import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';

@Component({
  selector: 'app-news-home',
  templateUrl: './news-home.component.html',
  styleUrls: ['./news-home.component.scss']
})
export class NewsHomeComponent implements OnInit {
  loading: boolean = false;
  listNews:any = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: GeneralService) { }

  ngOnInit(): void {
    this.getNews();
  }
  crearView() {
    this.router.navigate([`created`], { relativeTo: this.activatedRoute.parent});
  }
  getNews() {
    const serviceName = END_POINTS.base_back.config + '/news';
    this.loading = true;
    this.service.nameAll$(serviceName).subscribe((res:any) => {
      this.listNews = res.data || [];
    }, () => {this.loading = false}, ()=> {this.loading=false});
  }
}
