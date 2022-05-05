import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent implements OnInit, OnChanges {
  formHeader: any = FormGroup;
  @Input() listProgStud:any = [];
  public searchProgramList: any[] = [];
  public querySearch:any;
  @ViewChild(NbPopoverDirective) popover:any = NbPopoverDirective;
  @Output() changeSelected: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder) {
    this.searchProgramList = ['name_programa_estudio'];
  }
  ngOnChanges():void {
    this.listProgStud = JSON.parse(JSON.stringify(this.listProgStud));
    if (this.listProgStud.length>0) {
      this.selected();
    }
  }
  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      programa_estudio_id: [''],
      name_programa_estudio: ['Todos']
    };
    this.formHeader = this.formBuilder.group(controls);
  }

  selecteItem(item:any) {
    if (item) {
      this.formHeader.patchValue({
        programa_estudio_id: item.id,
        name_programa_estudio: item.name_programa_estudio,
      });
      this.popover.hide();
      this.changeSelected.emit(this.formHeader);
      this.selected();
    }
  }
  selected() {
    const forms = this.formHeader.value;
    this.listProgStud.map((res:any) => {
      res.background = '';
      res.color = '';
    })
    if (this.listProgStud?.length>0) {
        this.listProgStud.map((res:any) => {
          if (forms?.programa_estudio_id === res.id) {
            res.background = `${'var(--color-primary-500)'}`;
            res.color = 'white';
          }
        })
    }
  }
}
