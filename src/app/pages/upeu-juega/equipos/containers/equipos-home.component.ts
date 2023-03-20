import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralService} from "../../../../providers";
import {TabsEquiposListComponent} from "../components/views/tabs-equipos-list/tabs-equipos-list.component";
import {
  MSemestersComponent
} from "../../../configurations/semesters/components/modals/m-semesters/m-semesters.component";
import {NbDialogService} from "@nebular/theme";
import {MEquiposComponent} from "../components/modals/m-equipos/m-equipos.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-equipos-home',
  templateUrl: './equipos-home.component.html',
  styleUrls: ['./equipos-home.component.scss']
})
export class EquiposHomeComponent implements OnInit {

  formHeader: any = FormGroup;
  tabsData: any = [];
  campeonatos:any=[];
  campeonato:any;
  campeonato_id:any;
  loading: boolean = false;
  @ViewChild(TabsEquiposListComponent) listEquipos:any;
  constructor(private generalService: GeneralService,
              private dialogService: NbDialogService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.listCampeonatos();
    this.fieldReactive();
    //this.getTabs();
  }
  private fieldReactive() {
    const controls = {
      campeonato: [''],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  getTabs() {
    const serviceName = 'upeudisciplinas';
    const param={campeonato_id:this.campeonato_id || null,};
    this.loading = true;
    this.generalService.nameParams$(serviceName,param).subscribe(res => {
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
  listCampeonatos(){
    this.loading = true
    const serviceName = 'upeucampeonatos';
    this.generalService.nameAll$(serviceName).subscribe(resp => {
      this.campeonatos = resp.data;
    }, () => {this.loading = false}, () => {this.loading = false});
  }
  selectCampeonato(item:any){

    this.formHeader.controls['campeonato'].setValue(item);
    this.campeonato_id=item.id;
    this.campeonato=item;
    this.getTabs();
  }
  openModalCreate() {
    this.dialogService
      .open(MEquiposComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          campeonato:this.campeonato,
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
