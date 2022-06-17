import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";
import {END_POINTS} from "../../../../../../providers/utils";

@Component({
  selector: 'app-m-type-alternatives',
  templateUrl: './m-type-alternatives.component.html',
  styleUrls: ['./m-type-alternatives.component.scss']
})
export class MTypeAlternativesComponent implements OnInit {
  loading:boolean = false
  FormTypeAlternatives: any = FormGroup;
  @Input() item: any;
  @Input() code: any;
  constructor(public activeModal: NbDialogRef<MTypeAlternativesComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) { }

  ngOnInit(): void {
    this.fielsReactive();
  }

  private fielsReactive(){
    const controls = {
      nombre: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
    };

    this.FormTypeAlternatives = this.fb.group(controls)
    if(this.code === 'UPDATE'){
      this.setData();
    }
  }
  setData(){
      this.FormTypeAlternatives.patchValue({
        nombre: this.item.nombre,
        codigo: this.item.codigo
      });
  }
  closeModal(){
    this.activeModal.close('close');
  }
  saveTypeAlternatives(){
   const serviceName = END_POINTS.base_back.quiz + '/typeAlternatives';
   const forms = this.FormTypeAlternatives.value
   const params ={
      nombre: forms.nombre,
      codigo: forms.codigo
   };
   if(this.code ==='NEW'){
     this.loading = true
     this.generalService.addNameData$(serviceName, params).subscribe(resp => {
       if(resp.success){
         this.activeModal.close('ok');
       }
     },() => {this.loading = false;}, () => {this.loading = false});
   }else{
     this.loading = true
     this.generalService.updateNameIdData$(serviceName, this.item.id ,params).subscribe(resp =>{
       if(resp.success){
          this.activeModal.close('ok')
       }
     },() => {this.loading = false;}, () => {this.loading = false});
   }
  }
}
