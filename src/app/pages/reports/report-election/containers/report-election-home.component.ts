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

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [

  ];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }

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
      this.dataBar(this.data)

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

  dataBar(item: any){
    console.log(item)
    item.labels?.forEach((f: any) => {
      this.barChartData.labels?.push(f.titulo);
    });
    console.log(this.barChartData)
    item.datasets.forEach((f:any) => {
      const obj = {
        data: f.data,
        label: f.label
      }
      console.log(obj)
      this.barChartData.datasets.push(obj)
    })
      //this.barChartData.datasets = item.datasets
  }


}
