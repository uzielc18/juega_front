import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import Swal from "sweetalert2";
import {NbDialogService} from "@nebular/theme";
import {AppService} from "../../../../core";

@Component({
  selector: 'app-report-errors-home',
  templateUrl: './report-errors-home.component.html',
  styleUrls: ['./report-errors-home.component.scss']
})
export class ReportErrorsHomeComponent implements OnInit {
  loading:boolean = false;

  items:any = [];
  selectedItem = 20;
  pagination: any = {
    page: 1,
    per_page: 20,
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };
  pagesCount: any[] = [20, 30, 50];

  constructor(
              private generalService: GeneralService,
              private appUserInfo: AppService
  ) { }


  ngOnInit(): void {
    this.ListErrors();

    console.log();

  }
  ListErrors() {
    //const serviceName = END_POINTS.base_back + '/personErrors';

    const serviceName = 'personErrors';
    const params = {
      per_page: this.pagination.per_page,
      page: this.pagination.page,
      paginate: 'S',
    }
    this.loading = true;
    this.generalService.nameParams$(serviceName,params).subscribe(
      (res: any) => {
        this.items = res.data || [];
        this.loading = false;
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );

  }


}
