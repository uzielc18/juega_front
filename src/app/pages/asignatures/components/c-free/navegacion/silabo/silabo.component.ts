import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from '../../../../../../providers';
import { END_POINTS } from '../../../../../../providers/utils';

@Component({
  selector: 'app-silabo',
  templateUrl: './silabo.component.html',
  styleUrls: ['./silabo.component.scss'],
})
export class SilaboComponent implements OnInit {
  @Input() curso: any;
  silabu: any;

  loading: boolean = false;

  constructor(private generalService: GeneralService) {}

  ngOnInit(): void {}

  getSilabu() {
    const serviceName = END_POINTS.base_back.config + '/syllable-viewer';
    const id_carga_curso = this.curso.id_carga_curso;
    this.loading = true;
    this.generalService.nameId$(serviceName, id_carga_curso).subscribe(
      res => {
        if (res.success) {
          this.silabu = res.data;
          const pdf_newTab = window.open('about:blank');
          if (pdf_newTab) {
            pdf_newTab?.document.write(
              "<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(this.silabu) + "'></iframe>"
            );
          }
        }
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}