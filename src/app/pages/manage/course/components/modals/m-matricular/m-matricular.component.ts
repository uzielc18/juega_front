import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbTagComponent, NbTagInputAddEvent } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-m-matricular',
  templateUrl: './m-matricular.component.html',
  styleUrls: ['./m-matricular.component.scss']
})
export class MMatricularComponent implements OnInit {
  loading:boolean = false;
  @Input() item:any;
  formHeader: any = FormGroup;
  estudVerList:any = [];
  trees: Set<any> = new Set([]);
  constructor(public activeModal: NbDialogRef<MMatricularComponent>, private service: GeneralService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      codigos: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  closeModal() {
    this.activeModal.close('close');
  }
  procesarCodigos() {
    const serviceName = 'procesar-codigos';
    let array:any = [];
    this.trees.forEach((r:any) => {
      array.push(r);
    });
    const params = {
      codigos: array.join(',') || '',
    }
    if (params && params.codigos) {
      this.loading = true;
      this.service.addNameIdData$(serviceName, this.item.id, params).subscribe((res:any) => {
        this.estudVerList = res.data || [];
      }, () => {this.loading = false;}, () => {this.loading = false;});
    }
  }
  matricularCodigos() {
    const serviceName = 'matricular-codigos';
    let array:any = [];
    this.estudVerList.forEach((r:any) => {
      if (Number(r.estado) === 1) {
          array.push(r.codigo);
      }
    });
    const params = {
      codigos: array.join(',') || '',
    }
    if (params && params.codigos) {
      Swal.fire({
        title: 'MATRICULAR',
        text: '¿ Desea matricular a los estudiantes ? ',
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
            this.service.addNameIdData$(serviceName, this.item.id, params).subscribe((res:any) => {
              if (res.success) {
                this.activeModal.close('ok');
              }
            }, () => {this.loading = false;}, () => {this.loading = false;});
          }
        });
    }
  }
  onTagRemove(tagToRemove: NbTagComponent): void {
    this.trees.delete(tagToRemove.text);
    // this.formHeader.controls['codigos'].setValue(this.trees.join(','));
  }

  onTagAdd(): void {
    const opens:any = document.getElementsByClassName('tags');
    // console.log(opens[0].value);
    
    if (opens && opens[0].value) {
      this.trees.add(opens[0].value);
      // this.formHeader.controls['codigos'].setValue(this.trees.join(','));
    }
    opens[0].value = '';
    // console.log(this.trees);
    // console.log(this.formHeader.value);
    
  }
}
