import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../../providers";
import {END_POINTS} from "../../../../providers/utils";
import {NbDialogService} from "@nebular/theme";
import {MSemestersComponent} from "../components/modals/m-semesters/m-semesters.component";
import {MMenuMComponent} from "../../../manage/menus/components/modals/m-menu-m/m-menu-m.component";

@Component({
  selector: 'app-semesters-home',
  templateUrl: './semesters-home.component.html',
  styleUrls: ['./semesters-home.component.scss']
})
export class SemestersHomeComponent implements OnInit {

  loading: boolean = false
  semesters: any;
  constructor(private generService: GeneralService,
              private dialogService: NbDialogService ) { }

  ngOnInit(): void {
    this.getSemestres()
  }

  getSemestres(){
    this.loading = true
    const serviceName = END_POINTS.base_back.semesters
    this.generService.nameAll$(serviceName).subscribe(resp => {
      this.semesters = resp.data
      console.log(this.semesters)
    },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      })
  }

  openSemesters( item:any, code:any) {
    this.dialogService
      .open(MSemestersComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          item: item,
          code: code,
        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
      if (result === 'ok') {
        this.getSemestres();
      }
    });
  }
}
