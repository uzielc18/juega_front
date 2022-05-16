import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../core';
import { GeneralService } from '../../../providers';
import { END_POINTS } from '../../../providers/utils';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  newsList: any[] = [];
  collapseLeft: boolean = false;
  collapseTop: boolean = false;
  idCollapseTop: number = 0;
  idCollapseLeft: number = 0;

  loading: boolean = false;

  images = [944, 1011, 984].map(n => `https://picsum.photos/id/${n}/900/500`);

  constructor(private generalService: GeneralService, private userService: AppService) {}

  ngOnInit(): void {
    this.setCollapse();
    this.getNews();
  }

  setCollapse() {
    const config = this.userService.user.person.configurationperson;
    this.collapseLeft = config.find((x: any) => x.nombre === 'PERFIL-COLLAPSE').valor === '1' ? true : false;
    this.collapseTop = config.find((x: any) => x.nombre === 'NOTICIAS-COLLAPSE').valor === '1' ? true : false;
    this.idCollapseTop = config.find((x: any) => x.nombre === 'NOTICIAS-COLLAPSE').id;
    this.idCollapseLeft = config.find((x: any) => x.nombre === 'PERFIL-COLLAPSE').id;
  }

  saveCollapseTop() {
    this.loading = true;
    const serviceName = END_POINTS.base_back.config + '/configurationperson';
    const params = {
      valor: this.collapseTop ? '1' : '0',
    };
    this.generalService.updateNameIdData$(serviceName, this.idCollapseTop, params).subscribe(
      (res: any) => {
        if (res.success) {
          console.log(res);
          this.setCollapse();
        }
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  tweakCollapseLeft() {
    this.collapseLeft = !this.collapseLeft;
  }

  tweakCollapseTop() {
    this.collapseTop = !this.collapseTop;
    this.saveCollapseTop();
  }

  getNews() {
    const serviceName = END_POINTS.base_back.user + '/news';
    this.generalService.nameId$(serviceName, this.userService.user.id).subscribe((res: any) => {
      if (res.success) {
        this.newsList = res.data || [];
        console.log(this.newsList);
      }
    });
  }
}
