import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GeneralService} from "../../../../../../providers";
import {END_POINTS} from "../../../../../../providers/utils";

@Component({
  selector: 'app-m-categories',
  templateUrl: './m-categories.component.html',
  styleUrls: ['./m-categories.component.scss']
})
export class MCategoriesComponent implements OnInit {
  @Input() code: any;

  @Input() item: any;

  FormCategories: any = FormGroup

  loading: boolean = false

  constructor(public activeModal: NbDialogRef<MCategoriesComponent>,
              private fb: FormBuilder,
              private generalService: GeneralService) {
  }

  ngOnInit(): void {
    this.fieldsReactive();
  }

  closeModal() {
    this.activeModal.close('close');
  }


  private fieldsReactive() {
    const controls = {
      nombre: ['', [Validators.required]],
      tabla: ['', [Validators.required]],
      descripcion: [''],
      estado: ['1']
    }
    this.FormCategories = this.fb.group(controls);
    if (this.code === 'UPDATE') {
      this.setUpdate();
    }
  }

  setUpdate() {
    this.FormCategories.patchValue({
      nombre: this.item.nombre,
      descripcion: this.item.descripcion,
      tabla: this.item.tabla,
      estado: this.item.name,
    });
  }

  save() {
    const serviceName = 'categories';
    const forms = this.FormCategories.value;
    const params = {
      nombre: forms.nombre,
      descripcion: forms.descripcion,
      tabla: forms.tabla,
      estado: forms.estado
    };
    if (this.code === 'NEW') {
      this.loading = true;
      this.generalService.addNameData$(serviceName, params).subscribe((res: any) => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {
        this.loading = false;
      }, () => {
        this.loading = false;
      });

    } else {
      this.loading = true;
      this.generalService.updateNameIdData$(serviceName, this.item.id, params).subscribe((res: any) => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    }
  }

}
