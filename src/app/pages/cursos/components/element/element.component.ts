import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from '../../../../providers';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss'],
})
export class ElementComponent implements OnInit {
  iconElements: any = [];
  uniqueElements: any = [];
  @Input() element: any = [];

  constructor(private generalService: GeneralService) {}

  ngOnInit(): void {
    this.getIconElements();
    console.log('elementos', this.element);
  }

  getIconElements() {
    const serviceName = '/typeElements';
    this.generalService
      .nameAll$(serviceName)
      .subscribe(({ data: elements }) => {
        this.iconElements = elements;
      });
  }

  // getIconByElement(tipo: any) {
  //   // get icon by type
  //   const iconElement = this.iconElements.find(
  //     (element: any) => element.nombre === tipo
  //     );
  //   return iconElement.icon;
  // }

  // getUniqueElements() {
  //   this.uniqueElements = [
  //     ...new Map(
  //       Object.keys(this.element).map((item: any) => [item['tipo'], item])
  //     ).values(),
  //   ];
  //   console.log(this.uniqueElements);
  // }

  // getTotalElements(typeElement: string) {
  //   let total = 0;
  //   if (this.element.tipo === typeElement) {
  //     total++;
  //   }
  //   return total;
  // }
}
