import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent implements OnInit {
  formHeader: any = FormGroup;
  listProgramStudy:any = [{id: 'X', nombre_corto: 'Todos'}];
  public searchProgramList: any[] = [];
  public querySearch:any;
  @ViewChild(NbPopoverDirective) popover:any = NbPopoverDirective;
  constructor(private formBuilder: FormBuilder) {
    this.searchProgramList = ['nombre_corto', 'sede_nombre'];
  }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      programa_estudio_id: [''],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  selecteItem(item:any) {
    if (item && item.id) {
      this.formHeader.patchValue({
        programa_estudio_id: item
      });
      this.popover.hide();
    }
  }
  get selected() {
    const forms = this.formHeader.value;
    this.listProgramStudy.map((res:any) => {
      res.background = '';
      res.color = '';
    })
    if (forms.programa_estudio_id && forms.programa_estudio_id.id && this.listProgramStudy?.length>0) {
      this.listProgramStudy.map((res:any) => {
        if (forms.programa_estudio_id.id === res.id) {
          res.background = `${'var(--color-primary-500)'}`;
          res.color = 'white';
        }
      })
      return true;
    } else {
      return false;
    }
  }
}
