import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GeneralService} from "../../../../../../providers";
import {END_POINTS} from "../../../../../../providers/utils";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-tab-elections-teacher',
  templateUrl: './tab-elections-teacher.component.html',
  styleUrls: ['./tab-elections-teacher.component.scss']
})
export class TabElectionsTeacherComponent implements OnInit {

  loading: boolean = false;
  col_md_active: boolean = false;
  data: any = [];
  tipoCategoria: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  filterElectionData: any = [
    {
      name: 'PRINCIPAL',
      checked: true
    },
    {
      name: 'ASOCIADO',
      checked: true
    },
    {
      name: 'AUXILIAR',
      checked: true
    }
  ]
  typeRatinsData: any = []
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getTypeRatings();
  }
  classActive(item: any){
    let valor: any = 'hover_class_desactive';
    if(item?.checked){
      valor = 'hover_class_active'
    }
    return valor
  }
  selectItem(item: any, filter: any){
    filter?.map((r:any) => {
      r.checked = false;
    });
    item.checked = true;
    this.col_md_active = true;
    this.filterData(item);

  }
  getTypeRatings(){
    const serviceName = 'typeRatings';
    const params = {
      agrupado: 0,
      agrupado_valor: 0
    }
    this.loadingsForm.emit(true);
    this.generalService.nameParams$(serviceName, params).subscribe(resp => {
      this.typeRatinsData = resp.data;
      this.typeRatinsData.map((m: any) => {
           m.checked = false
      })
      if(this.typeRatinsData[0]){
        this.typeRatinsData[0].checked = true
        this.filterData(this.typeRatinsData[0].id);
        this.col_md_active = true;
      }
    },() => {this.loadingsForm.emit(false)}, () => {this.loadingsForm.emit(false)})
  }

  filterData(item: any){
    const serviceName = END_POINTS.base_back.reportes + '/elecciones-docente';
    const params = {
      type_rating_id: item.id || item
    }
    this.loadingsForm.emit(true);
    this.generalService.nameParams$(serviceName, params).subscribe( res => {
      this.data = res.data;
    }, () => {this.loadingsForm.emit(false)}, () => {this.loadingsForm.emit(false)})
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

  selectFilterItem(item: any, data: any){

    this.typeRatinsData.filter((f: any ) => {
      if(f.checked){
        this.filterDataCategory(f, item)
        this.tipoCategoria = item.name
      }
    })
  }
  filterDataCategory(item: any, categoria: any){
    const serviceName = END_POINTS.base_back.reportes + '/elecciones-docente';
    const params = {
      type_rating_id: item.id || item,
      categoria_docente: categoria.name
    }
    this.loadingsForm.emit(true);
    this.generalService.nameParams$(serviceName, params).subscribe( res => {
      this.data = res.data;

    }, () => {this.loadingsForm.emit(false)}, () => {this.loadingsForm.emit(false)})
  }
}
