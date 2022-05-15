import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import { END_POINTS } from 'src/app/providers/utils';
import { MConfigurationComponent } from '../components/modals/m-configuration/m-configuration.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configutarion-home',
  templateUrl: './configutarion-home.component.html',
  styleUrls: ['./configutarion-home.component.scss']
})
export class ConfigutarionHomeComponent implements OnInit {
  loading:boolean=false;
  configs:any = [];
  constructor(private dialogService: NbDialogService, private service: GeneralService) { }

  ngOnInit(): void {
  }
  tabChange($event:any) {
    const tipo = $event.tabId;
    this.configs = [];
    this.listConfig(tipo);

    switch (tipo) {
      case 'global':
        break;
      case 'personal':
        
        break;
      case 'area':
        
        break;
    
      default:
        break;
    }
  }
  openModal(value:any, item:any, cat:any) {
    const values:any = {
      type: value,
      items: item,
      method: cat,
    }
       this.dialogService.open(MConfigurationComponent, {
         dialogClass: 'dialog-limited-height',
         context: {
           datos: values
         },
         closeOnBackdropClick: false,
         closeOnEsc: false
       }).onClose.subscribe(result => {
         if (result && result.close === 'ok') {
           this.listConfig(result.value);
         }
       });
     }
     listConfig(value:any) {
      const serviceName = END_POINTS.base_back.config + '/configurations';
      const params = {
        tipo: value,
      }
      this.loading = true;
      this.service.nameParams$(serviceName, params).subscribe((res:any) => {
        this.configs = res.data || [];
      }, () => {this.loading = false}, ()=> {this.loading=false});
    }
    deleteConfig(item:any) {
      const serviceName = END_POINTS.base_back.config + '/configurations';
      Swal.fire({
        title: 'Eliminar',
        text: '¿ Desea eliminar la configuración ?',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
          if (result.isConfirmed) {
            this.loading = true;
            this.service.deleteNameId$(serviceName, item.id).subscribe((res:any) => {
              if (res.success) {
                this.listConfig(item.tipo);
              }
            }, () => {this.loading = false}, ()=> {this.loading=false});
          }
      });
    }
}
