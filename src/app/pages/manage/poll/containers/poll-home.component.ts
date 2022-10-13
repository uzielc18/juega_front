import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralService} from "../../../../providers";
import {END_POINTS} from "../../../../providers/utils";
import Swal from "sweetalert2";

@Component({
  selector: 'app-poll-home',
  templateUrl: './poll-home.component.html',
  styleUrls: ['./poll-home.component.scss']
})
export class PollHomeComponent implements OnInit {

  dataElections: any = [];
  loading: boolean = false;
  data: any = [];
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getData();
    this.getDataElections();
  }
  crearView() {
    this.router.navigate([`created`], { relativeTo: this.activatedRoute.parent});
  }

  getData(){
    this.loading = true;
    const serviceName = 'inquiries';
    const params = {
      tabla: 'tutoria'
    }
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      if(res.success){
        this.data = res.data
      }
    }, () => {this.loading = false}, () => {this.loading = false})
  }
  getDataElections(){
    this.loading = true;
    const serviceName = 'inquiries';
    const params = {
      tabla: 'election'
    }
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      if(res.success){
        this.dataElections = res.data
      }
    }, () => {this.loading = false}, () => {this.loading = false})
  }
  deleteInquiries(item:any) {
    const serviceName =  'inquiries';
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
          this.generalService.deleteNameId$(serviceName, item.id).subscribe(r => {
            if (r.success) {
              if(item.tabla === 'tutoria'){
                this.getData();
              }else{
                this.getDataElections();
              }
            }
          }, () => { this.loading =false; }, () => { this.loading =false; });
        }
      });
    }
  }
  editInquiries(item: any){
    this.router.navigate([`edit`, item.id], { relativeTo: this.activatedRoute.parent});
  }

}
