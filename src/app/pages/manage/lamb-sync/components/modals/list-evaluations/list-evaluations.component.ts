import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-list-evaluations',
  templateUrl: './list-evaluations.component.html',
  styleUrls: ['./list-evaluations.component.scss']
})
export class ListEvaluationsComponent implements OnInit {

  @Input() item:any;
  items: any[] = [];
  loading:boolean = false;
  formHeader: any = FormGroup;
  pagesCount: any[] = [20, 50, 100, 300, 500];
  pagination: any = {
    page: 1,
    per_page: this.pagesCount[0],
    pageSize: 20,
    collectionSize: 0,
  };
  constructor(public activeModal: NbDialogRef<ListEvaluationsComponent>,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.refreshItems();
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      id_per_page: [this.pagination.per_page || "", [Validators.required]],
    };
    this.formHeader = this.fb.group(controls);
  }

  closeModal(){
    this.activeModal.close('close');
  }
  refreshItems() {
    this.pagination.collectionSize = this.item.length;
    this.items = this.item
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
