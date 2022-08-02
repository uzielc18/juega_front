import {
  Component, Input,
  OnInit,
} from '@angular/core';
import {NbDialogService} from "@nebular/theme";
import {MReporteNotasComponent} from "./modals/m-reporte-notas/m-reporte-notas.component";
import {END_POINTS} from "../../../../../providers/utils";
import {GeneralService} from "../../../../../providers";
import {ActivatedRoute} from "@angular/router";
import {EmitEventsService} from "../../../../../shared/services/emit-events.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-tabs-reporte-notas',
  templateUrl: './tabs-reporte-notas.component.html',
  styleUrls: ['./tabs-reporte-notas.component.scss']
})
export class TabsReporteNotasComponent implements OnInit {
  recuperarEmail:any = this.activatedRoute.snapshot.paramMap.get('email');
  loading:boolean = false;
  email: any
  nowDate = new Date()
  person: any;
  data: any = [];
  @Input() profile: any;
  @Input() notas: any;
  constructor(private dialogService: NbDialogService,
              private generalService: GeneralService,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
  }

  openNotas(item: any){
    this.dialogService
      .open(MReporteNotasComponent, {
        dialogClass: 'dialog-limited-height',
        context: {
          item: item,
          profile: this.profile,
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
