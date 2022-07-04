import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {END_POINTS} from "../../../../../../../providers/utils";
import {GeneralService} from "../../../../../../../providers";

@Component({
  selector: 'app-m-activities',
  templateUrl: './m-activities.component.html',
  styleUrls: ['./m-activities.component.scss']
})
export class MActivitiesComponent implements OnInit {

  items: any = [];
  students: any = [];
  @Input() item:any;
  loading: boolean = false
  constructor(public activateModal: NbDialogRef<MActivitiesComponent>,
              private generalService: GeneralService) { }

  ngOnInit(): void {
  this.getData();
  }

  getData(){
    this.loading = true
    const serviceName = END_POINTS.base_back.evaluations_Registry + '/get-resources'
    const params = {
      evaluation_id: this.item.id
    }
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      this.items = res.data.elements;
      if(this.items.length > 0){
        this.items.map( (check:any) => {
          check.checked = false;
        })
      }
    }, () => {this.loading = false}, () => {this.loading = false});

  }
  get checkedValidate():any{
    let array:any = [];
    if(this.items.length > 0){
      this.items.map((res:any) => {
        if(res.checked){
           array.push(res.checked)
        }
      })
    }
    return array.length > 0 ? false :true;
  }
  calcular(){
    this.loading = true;
    const serviceName = END_POINTS.base_back.evaluations_Registry + '/get-notes-elements';
    const array = this.items.filter((res:any) => res.checked === true);
    console.log(array);
    const ids:any = [];
    if(array.length > 0){
      array.map((a:any) => {
          const item = {
            id: a.id,
          }
          ids.push(item.id);
      })
    }
    const params = {
      elements_id: ids.length > 0 ? ids.join(','): '',
      evaluation_id: this.item.id,
      id_carga_curso_docente: this.item.id_carga_curso_docente
    }
    this.generalService.nameParams$(serviceName, params).subscribe(res => {
      console.log(res)
      this.students = res.data.students;
      },
      () => {this.loading = false}, () => {this.loading = false}

    )
  }
  closeModal(){
    this.activateModal.close('close');
  }
  saveNotes(){

  }
}
