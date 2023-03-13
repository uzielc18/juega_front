import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {GeneralService} from "../../../../../../providers";

@Component({
  selector: 'app-tabs-equipos-list',
  templateUrl: './tabs-equipos-list.component.html',
  styleUrls: ['./tabs-equipos-list.component.scss']
})
export class TabsEquiposListComponent implements OnInit {

  @Input() item: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  data: any = []
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.listEquipos()
  }

  listEquipos() {
    const serviceName = 'equipos-list-cat';
    const params = {
      upeudisciplina_id: this.item.id
    }
    this.loadingsForm.emit(true)
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      if(res.success) {
        this.data = res.data
        this.data.map((f: any) => {
          if(f.id === this.data[0].id || f.id === this.data[1].id) {
            f.active = false
          }else {
            f.active = true
          }
        })
      }
    }, () => {this.loadingsForm.emit(false)}, () => {this.loadingsForm.emit(false)})
  }

}
