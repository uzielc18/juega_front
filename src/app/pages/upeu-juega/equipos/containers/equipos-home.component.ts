import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralService} from "../../../../providers";
import {TabsEquiposListComponent} from "../components/views/tabs-equipos-list/tabs-equipos-list.component";
import {
  MSemestersComponent
} from "../../../configurations/semesters/components/modals/m-semesters/m-semesters.component";
import {NbDialogService} from "@nebular/theme";
import {MEquiposComponent} from "../components/modals/m-equipos/m-equipos.component";

@Component({
  selector: 'app-equipos-home',
  templateUrl: './equipos-home.component.html',
  styleUrls: ['./equipos-home.component.scss']
})
export class EquiposHomeComponent implements OnInit {

  tabsData: any = [];
  loading: boolean = false;
  @ViewChild(TabsEquiposListComponent) listEquipos:any;
  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.getTabs()
  }
  getTabs() {
    const serviceName = 'upeudisciplinas';
    this.loading = true;
    this.generalService.nameAll$(serviceName).subscribe(res => {
      if(res.success) {
        this.tabsData = res.data
      }
    }, () => {this.loading = false}, () => {this.loading = false})

  }

  changeTabs(event:any) {
    const idTab = event.tabId;
    switch (idTab) {
      case 'futsal':
        //this.listEquipos.listEquipos();
        break;
      case 'f':
        //this.pregunts.getQuestions();
        break;
      default:
        break;
    }
  }
  loadingsForm($event: boolean) {
    setTimeout(() => {
      this.loading = $event;
    }, 100);
  }

  openModalCreate() {
    this.dialogService
      .open(MEquiposComponent, {
        dialogClass: 'dialog-limited-height',
        context: {

        },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
      if (result === 'ok') {
        //this.getSemestres();
      }
    });
  }

}
