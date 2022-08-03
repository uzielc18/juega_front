import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-list-docente',
  templateUrl: './list-docente.component.html',
  styleUrls: ['./list-docente.component.scss']
})
export class ListDocenteComponent implements OnInit {

  loading: any = false;
  @Input() item:any = [];
  items: any[] = [];
  formHeader: any = FormGroup;
  pagesCount: any[] = [20, 50, 100, 300, 500];
  pagination: any = {
    page: 1,
    per_page: this.pagesCount[0],
    pageSize: 20,
    collectionSize: 0,
  };
  constructor(public activeModal: NbDialogRef<ListDocenteComponent>,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fieldReactive();
    this.refreshItems();
  }

  private fieldReactive() {
    const controls = {
      id_per_page: [this.pagination.per_page || "", [Validators.required]],
    };
    this.formHeader = this.fb.group(controls);
  }
  closeModal(){
    this.activeModal.close('close')
  }
  refreshItems() {
    this.pagination.collectionSize = this.item.data.length;
    this.items = this.item.data
      .map((evaluation: any, i: any) => ({ id: i + 1, ...evaluation }))
      .slice(
        (this.pagination.page - 1) * this.pagination.pageSize,
        (this.pagination.page - 1) * this.pagination.pageSize + this.pagination.pageSize
      );
  }
  selectedPerPage(pages: any) {
    this.pagination.pageSize = pages;
    this.refreshItems();
  }
}
