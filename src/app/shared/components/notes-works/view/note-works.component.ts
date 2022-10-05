import {Component, Input, OnInit} from '@angular/core';
import {GeneralService} from "../../../../providers";
import {END_POINTS} from "../../../../providers/utils";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-note-works',
  templateUrl: './note-works.component.html',
  styleUrls: ['./note-works.component.scss']
})
export class NoteWorksComponent implements OnInit {

  loading:boolean = false;
  data: any = [];
  notas: any = [];
  fileName= 'ExcelSheet.xlsx';
  @Input() item:any;
  @Input() code: any;
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loading = true
    const serviceName = END_POINTS.base_back.activities_evaluations + '/registro-actividades';

    if(this.code == 'ASIG'){
      const params = {
        id_carga_curso_docente: this.item.id_carga_curso_docente,
      }
      this.generalService.nameParams$(serviceName, params).subscribe((res:any) => {
       this.data = res.data
      },() => {this.loading = false}, () => {this.loading = false})
    }else{
      const params = {
        id_carga_curso_docente: this.item.id_carga_curso_docente,
        element_id: this.item.element_id,
      }
      this.generalService.nameParams$(serviceName, params).subscribe(res => {
        this.data = res.data;
      }, () => {this.loading = false}, () => {this.loading = false})
    }
  }
  searchNota(data: any){
    const arr: any = []
    const arr2: any = []
    const as: any = data.notas.forEach((f: any) => {
      const a: any = f.element_id
        return as === a
      })
    console.log(as)

  }
  get validate(){

    return
  }
  exportExel(){
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.item.nombre + '-registro.xlsx');
  }
  /*exportExel2(){
    const arr: any = [];

    this.data.registro.forEach((fr: any) => {
      let obj: any = {
        "codigo": "",
        "nombres": "",

      }
      this.data.elementos.forEach((f: any) => {
        obj[f.titulo] = ""
      })
      obj.codigo = fr.codigo;
      obj.nombres = fr.nombres_completos;
      fr.notas.forEach((n: any)=> {
        this.data.elementos.forEach((f: any) => {
          obj[f.titulo] = n
        })
      })
      arr.push(obj);
    })

    this.excelService.excelDownload(arr);
  }*/
}
