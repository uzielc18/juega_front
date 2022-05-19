import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rubricas',
  templateUrl: './rubricas.component.html',
  styleUrls: ['./rubricas.component.scss'],
})
export class RubricasComponent implements OnInit {
  @Input() rubrica: any = null;
  @Input() calification: any = null;
  colors: any[] = ['#57884e', '#8ba642', '#f9c851', '#f9a65a', '#f97a5a', '#f94a5a', '#f9065a'];
  bgColors: any[] = ['#57884e50', '#8ba64250', '#f9c85150', '#f9a65a50', '#f97a5a50', '#f94a5a50', '#f9065a50'];

  loading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.check();
  }

  rubricColors(i: any) {
    return {
      // 'background-color': this.colors[i],
      // color: '#fff',
      color: this.colors[i],
      'border-bottom': '3px solid ' + this.colors[i],
    };
  }

  rubricColorsContent(rubrica: any, i: any) {
    if (rubrica.checked) {
      return {
        background: this.bgColors[i],
        // color: 'white',
      };
    } else {
      return {};
    }
  }

  check() {
    // if (this.rubrica && this.calification) {
    // this.loading = false;
    setTimeout(() => {
      console.log(this.rubrica);
      this.rubrica.criterios.map((rub: any) => {
        rub.niveles.map((niv: any) => {
          this.calification.puntos.map((punt: any) => {
            if (punt.rubricas_id === niv.rubricas.id) {
              niv.checked = true;
            }
          });
        });
      });
    }, 15000);
    // }
  }
}
