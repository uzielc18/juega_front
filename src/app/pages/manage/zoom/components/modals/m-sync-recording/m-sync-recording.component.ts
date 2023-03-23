import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {GeneralService} from "../../../../../../providers";
import Swal from "sweetalert2";

@Component({
  selector: 'app-m-sync-recording',
  templateUrl: './m-sync-recording.component.html',
  styleUrls: ['./m-sync-recording.component.scss']
})
export class MSyncRecordingComponent implements OnInit {

  loading: boolean = false;
  listCourseZoom: any = [];
  @Input() item: any;
  @Input() semester: any;
  selectedItem = 20;

  pagesCount: any[] = [20, 50, 100, 300, 500];
  pagination: any = {
    page: 1,
    per_page: this.pagesCount[0],
    pageSize: 20,
    collectionSize: 0,
  };
  constructor(public activeModal: NbDialogRef<MSyncRecordingComponent>,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const serviceName = 'zoomRecords-list';
    const params = {
      programa_estudio_id: this.item.programa_estudio_id || '',
      semester_id: this.semester,
    }
    this.loading = true;
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      if( res.success) {
        this.listCourseZoom= res.data
        this.listCourseZoom.map((m: any) => {
          if(m.id_canva == null && m.id_canva_module == null) {
            m.color_error = '#F6DADE'
          }
          if(m.id_canva === null && m.id_canva_module !== null) {
            m.color_error = '#EEC7A1'
          }
          if(m.id_canva_module === null && m.id_canva !== null) {
            m.color_error = '#FBF7B8'
          }
          m.course_id = m.records[0]?.course_id;
        })
        this.pagination.sizeListData = (res.data && res.data.total) || 0;
        this.pagination.sizePage = (res.data && res.data.per_page) || 0;
        if (this.pagination.sizeListData < this.listCourseZoom.length) {
          this.pagination.isDisabledPage = true;
        } else {
          this.pagination.isDisabledPage = false;
        }
      }

    }, () => {this.loading = false}, () => {this.loading = false})
  }
  closeModal() {
    this.activeModal.close('');
  }
  loadPage($event: any): any {
    this.pagination.page = $event;
    this.getData();
  }

  sizeTable($event: any): any {
    this.pagination.per_page = $event;
    this.getData();
  }
  synCanvas() {
    const serviceName = 'canva-insert-record';
      const params = {
        programa_estudio_id:this.item.programa_estudio_id || '',
        semester_id: this.semester || '',
        ciclo: this.item.ciclo || '',
        grupo: this.item.grupo || ''
      }

    Swal.fire({
      title: 'Sincronizar',
      text: '¿ Esta seguro de sincronizar con canva ? ',
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
        this.generalService.nameParams$(serviceName, params).subscribe(res => {
          if(res.success) {
            this.getData();
          }
        }, () => {this.loading = false}, () => {this.loading = false})
      }
    });
  }
  synCanvasCourse(item: any) {
    const serviceName = 'canva-insert-record';
    const params = {
      programa_estudio_id:this.item.programa_estudio_id || '',
      semester_id: this.semester || '',
      ciclo: this.item.ciclo || '',
      grupo: this.item.grupo || '',
      course_id: item.course_id
    }

    Swal.fire({
      title: 'Sincronizar',
      text: '¿ Esta seguro de sincronizar con canva ? ',
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
        this.generalService.nameParams$(serviceName, params).subscribe(res => {
          if(res.success) {
            this.getData();
          }
        }, () => {this.loading = false}, () => {this.loading = false})
      }
    });
  }
}
