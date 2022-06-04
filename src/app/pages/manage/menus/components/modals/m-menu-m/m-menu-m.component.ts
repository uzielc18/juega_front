import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from 'src/app/providers';

@Component({
  selector: 'app-m-menu-m',
  templateUrl: './m-menu-m.component.html',
  styleUrls: ['./m-menu-m.component.scss']
})
export class MMenuMComponent implements OnInit {
  formHeader: any = FormGroup;
  loading:boolean = false;
  defaultIcon:any = 'info-outline';
  listRoles:any = [];
  @Input() nivel:any;
  @Input() item:any;
  @Input() code:any;
  constructor(public activeModal: NbDialogRef<MMenuMComponent>,private generalService: GeneralService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.getRoles();
  }
  private fieldReactive() {
    const controls = {
      title: ['', [Validators.required]],
      rol: [[], [Validators.required]],
      icono: ['', [Validators.required]],
      nivel: [this.nivel || '', [Validators.required]],
      url: ['', [Validators.required]],
      path_match: ['prefix', [Validators.required]],
      target: [''],
      orden: ['', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    if (this.code === 'UPDATE') {
      this.setUpdates();
    }
  }
  closeModal() {
    this.activeModal.close('close');
  }
  getRoles() {
    const serviceName = 'roles';
    this.generalService.nameAll$(serviceName).subscribe((res:any) => {
      this.listRoles =  res.data || [];
    })
  }
  saveMenu() {
    const serviceName = 'menus';
    const forms = this.formHeader.value;
    const params = {
      menu_id: '',
      title: forms.title,
      rol: forms.rol.join(','),
      icono: forms.icono,
      nivel: forms.nivel,
      url: forms.url,
      path_match: forms.path_match,
      target: forms.target,
      orden: forms.orden,
    };
    if (this.code === 'NEW') {
      params.menu_id = this.nivel === 1 ? 0 : this.nivel === 2 ? this.item.id : '';
      this.loading = true;
      this.generalService.addNameData$(serviceName, params).subscribe((res:any) => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});

    } else {
      params.menu_id =  this.item.menu_id;
      this.loading = true;
      this.generalService.updateNameIdData$(serviceName, this.item.id, params).subscribe((res:any) => {
        if (res.success) {
          this.activeModal.close('ok');
        }
      }, () => {this.loading = false;}, () => {this.loading = false;});
    }
  }
  setUpdates() {
    this.formHeader.patchValue({
      title: this.item.title,
      rol: this.item.rol.split(',').map(function(item:any) {return parseInt(item, 10);}),
      icono: this.item.icono,
      nivel: this.item.nivel,
      url: this.item.url,
      path_match: this.item.path_match,
      target: this.item.target,
      orden: this.item.orden,
    });
  }

}
