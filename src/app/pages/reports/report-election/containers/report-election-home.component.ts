import {Component, OnInit, ViewChild} from '@angular/core';
import {END_POINTS} from "../../../../providers/utils";
import {GeneralService} from "../../../../providers";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-report-election-home',
  templateUrl: './report-election-home.component.html',
  styleUrls: ['./report-election-home.component.scss']
})
export class ReportElectionHomeComponent implements OnInit {

  data: any = [];
  dataFilter: any = [];
  col_md_active: boolean = false;
  todos: any = 'todos';
  loading:boolean = false;



  constructor( private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getData();
    this.getFilterData()
  }

  classActive(item: any){
    let valor: any = 'hover_class_desactive';
    if(item?.checked){
      valor = 'hover_class_active'
    }
    if(item === 'todos'){
      valor = 'hover_class_active'
    }
    return valor
  }
  selectItemTodos(item: any, filter: any, value: any){
    if(value === 'all'){
      filter?.map((r:any) => {
        r.checked = false;
      });
      this.todos = 'todos'
      this.col_md_active = false;
      this.filterData(item)
    }

  }
  selectItem(item: any, filter: any){
    filter?.map((r:any) => {
      r.checked = false;
    });
    this.todos = ''
    item.checked = true;
    this.col_md_active = true;
    this.filterData(item);

  }
  filterData(item: any){
    const serviceName = END_POINTS.base_back.reportes + '/elecciones-datos';
    const params = {
      id_election: item.id || item
    }
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe( res => {
      this.data = res.data;
    }, () => {this.loading = false}, () => {this.loading = false})
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
  exportExel(idHtml: any){
    /* pass here the table id */
    let element = document.getElementById(idHtml);
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, idHtml + '.xlsx');
  }

  updateData(filter: any){
    console.log(filter)
   // this.filterData(item);
  }
}
