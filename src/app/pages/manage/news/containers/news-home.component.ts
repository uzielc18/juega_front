import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { PreviewNewsComponent } from 'src/app/shared/components/news-comp/preview-news/preview-news.component';
import { DIRECTORY } from 'src/app/shared/directorios/directory';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news-home',
  templateUrl: './news-home.component.html',
  styleUrls: ['./news-home.component.scss']
})
export class NewsHomeComponent implements OnInit {
  loading: boolean = false;
  listNews:any = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: GeneralService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.getNews();
  }
  crearView() {
    this.router.navigate([`created`], { relativeTo: this.activatedRoute.parent});
  }
  tabChange($event:any) {
    this.listNews = [];
    this.getNews();
  }
  getNews() {
    const serviceName = END_POINTS.base_back.news + '/news';
    this.loading = true;
    this.service.nameAll$(serviceName).subscribe((res:any) => {
      this.listNews = res.data || [];
    }, () => {this.loading = false}, ()=> {this.loading=false});
  }
  deleteNews(item:any) {
    const serviceName = END_POINTS.base_back.news + '/news';
    if (item.id) {
      Swal.fire({
        title: 'Eliminar',
        text: '¿ Desea eliminar la noticia ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#00244E',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
          if (result.isConfirmed) {
            this.loading = true;
            this.service.deleteNameId$(serviceName, item.id).subscribe(r => {
              if (r.success) {
                this.getNews();
              }
            }, () => { this.loading =false; }, () => { this.loading =false; });
          }
        });
      }
  }
  getFileItem(item:any) {
    const params:any = {
      type: 'get',
      directory: DIRECTORY.news,
      key: item.imagen, // name s3
      // 127805_200110121_17603.pdf
    };
    const serviceName = END_POINTS.base_back.resourse + '/files-upload/get-signed-url';
    if (params && params.key) {
      this.loading =true;
      this.service.nameParams$(serviceName, params).subscribe(r => {
        const urlFile = r.data && r.data.url || '';
        if (urlFile) {
          item.base64_url = urlFile;
          this.openPreviewFile(item);
        }
      }, () => { this.loading =false }, () => { this.loading =false });
    }
  }
  openPreviewFile(val:any) {
    this.dialogService.open(PreviewNewsComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        valuess: val,
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
      }
    });
}
}
