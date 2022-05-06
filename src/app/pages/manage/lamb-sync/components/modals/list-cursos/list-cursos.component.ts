import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "app-list-cursos",
  templateUrl: "./list-cursos.component.html",
  styleUrls: ["./list-cursos.component.scss"],
})
export class ListCursosComponent implements OnInit {
  @Input() item: any = [];
  @Input() prog: any;

  pagesCount: any[] = [20, 50, 100, 300, 500];
  pagination: any = {
    page: 1,
    per_page: this.pagesCount[0],
    pageSize: 20,
    collectionSize: 0,
  };

  items: any[] = [];
  formHeader: any = FormGroup;
  loading: boolean = false;

  constructor(public activeModal: NbDialogRef<ListCursosComponent>, private formBuilder: FormBuilder) {
    this.refreshItems();
  }

  ngOnInit(): void {
    // console.log(this.prog);
    this.refreshItems();
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      id_per_page: [this.pagination.per_page || "", [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
  }

  closeModal() {
    this.activeModal.close("close");
  }

  refreshItems() {
    this.pagination.collectionSize = this.item.length;
    this.items = this.item
      .map((silabu: any, i: any) => ({ id: i + 1, ...silabu }))
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
