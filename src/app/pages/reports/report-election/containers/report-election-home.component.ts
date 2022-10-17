import {Component, OnInit, ViewChild} from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";

@Component({
  selector: 'app-report-election-home',
  templateUrl: './report-election-home.component.html',
  styleUrls: ['./report-election-home.component.scss']
})
export class ReportElectionHomeComponent implements OnInit {

  data: any = [];
  dataFilter: any = [];

  loading:boolean = false;



  constructor( private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getData();
    this.getFilterData()
  }

  classActive(item: any){
    let valor: any = 'hover_class_desactive';
    if(item.checked){
      valor = 'hover_class_active'
    }
    return valor
  }
  selectItem(item: any, filter: any){
    filter?.map((r:any) => {
      r.checked = false;
    });
    item.checked = true;
  }

  getData(){
    this.loading = true;
    const serviceName = END_POINTS.base_back.reportes + '/elecciones-datos';
    this.generalService.nameAll$(serviceName).subscribe( res => {
      this.data = res.data;
      if(res.success){
      }
    }, () => {this.loading = false}, () => {this.loading = false})
  }
  getFilterData(){
    const serviceName = END_POINTS.base_back.reportes + '/elecciones-filtros';
    this.generalService.nameAll$(serviceName).subscribe( res => {
      this.dataFilter = res.data.elecciones
      this.dataFilter.map((m: any) => {
        m.checked = false
      })

    })
  }


}
