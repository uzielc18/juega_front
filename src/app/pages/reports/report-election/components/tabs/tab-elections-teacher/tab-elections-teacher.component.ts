import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-elections-teacher',
  templateUrl: './tab-elections-teacher.component.html',
  styleUrls: ['./tab-elections-teacher.component.scss']
})
export class TabElectionsTeacherComponent implements OnInit {

  col_md_active: boolean = false;
  dataFilter: any = [
    {
      name: 'asamblea universitario'
    }
  ]
  constructor() { }

  ngOnInit(): void {
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
  selectItem(item: any, filter: any){
    filter?.map((r:any) => {
      r.checked = false;
    });
    item.checked = true;
    this.col_md_active = true;
    //this.filterData(item);

  }
}
