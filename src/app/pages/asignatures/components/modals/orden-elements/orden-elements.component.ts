import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';

@Component({
  selector: 'app-orden-elements',
  templateUrl: './orden-elements.component.html',
  styleUrls: ['./orden-elements.component.scss']
})
export class OrdenElementsComponent implements OnInit {
  loading:boolean = false;
  @Input() arrayElementos:any = [];
  constructor(public activeModal: NbDialogRef<OrdenElementsComponent>, private service: GeneralService) { }

  ngOnInit(): void {
    // console.log(this.arrayElementos);
    
  }
  closeModal() {
    this.activeModal.close('close');
  }
  shift(index1: number, index2: number): void {
    const data = [...this.arrayElementos];
    if (index2 > 0 && index1 < data.length - 1) {
        [data[index1], data[index2]] = [data[index2], data[index1]];
        this.arrayElementos = data;
    }
  }
  saveOrden() {
    const serviceName ='save-elements-order';
    const array = JSON.parse(JSON.stringify(this.arrayElementos));
    let newArray:any = [];
    array.forEach((element:any, index:any) => {
      const item = {
        id: element.id,
        orden: index+1,
      }
      newArray.push(item);
    });
    const params = {
      elements: newArray,
    }
    if (params && params.elements) {
      this.loading = true;
      this.service.updateNameData$(serviceName, params).subscribe(res => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});
    }
  }
}
