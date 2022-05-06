import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { AppService } from '../../../core';
import { GeneralService } from '../../../providers';
import { END_POINTS } from '../../../providers/utils';
import { CreateRubricComponent } from '../components/create-rubric/create-rubric.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rubrics-home',
  templateUrl: './rubrics-home.component.html',
  styleUrls: ['./rubrics-home.component.scss'],
})
export class RubricsHomeComponent implements OnInit {
  @Output() changeEmit: EventEmitter<any> = new EventEmitter();

  userInfo: any;
  rubrics: any[] = [];
  loading: boolean = false;

  formHeader: any = FormGroup;
  pagesCount: any[] = [20, 50, 100, 300, 500];

  pagination: any = {
    page: 1,
    per_page: this.pagesCount[0],
    sizePage: 0,
    sizeListData: 0,
    isDisabledPage: false,
  };

  collectionSize = this.rubrics.length;

  constructor(
    private dialogService: NbDialogService,
    private generalService: GeneralService,
    private userService: AppService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getUserInfo();
    this.fieldReactive();
  }

  private fieldReactive() {
    const controls = {
      id_per_page: [this.pagination.per_page || '', [Validators.required]],
    };
    this.formHeader = this.formBuilder.group(controls);
    this.getRubrics();
  }

  getUserInfo() {
    this.userInfo = this.userService;
  }

  getRubrics() {
    const serviceName = END_POINTS.base_back.rubrics + '/rubricasGuias';
    this.loading = true;
    const params = {
      person_id: this.userInfo._user.id,
      page: this.pagination.page,
      per_page: this.pagination.per_page,
    };
    this.generalService.nameParams$(serviceName, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.rubrics = res.data || [];
          this.pagination.sizeListData = (res.data && res.meta.total) || 0;
          this.pagination.sizePage = (res.data && res.meta.per_page) || 0;
          if (this.pagination.sizeListData < this.rubrics.length) {
            this.pagination.isDisabledPage = true;
          } else {
            this.pagination.isDisabledPage = false;
          }
        }
      },
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  loadPage($event: any): any {
    this.pagination.page = $event;
    this.getRubrics();
  }

  selectedPerPage(pages: any) {
    this.pagination.per_page = pages;
    this.getRubrics();
  }

  createRubric() {
    this.dialogService
      .open(CreateRubricComponent, {
        dialogClass: 'dialog-limited-height',
        context: { action: 'create' },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result === 'ok') {
          this.getRubrics();
        }
      });
  }

  editRubric(rubric: any) {
    this.dialogService
      .open(CreateRubricComponent, {
        dialogClass: 'dialog-limited-height',
        context: { rubricaId: rubric.id, action: 'edit' },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result === 'ok') {
          this.getRubrics();
        }
      });
  }

  duplicateRubric(rubric: any) {
    this.dialogService
      .open(CreateRubricComponent, {
        dialogClass: 'dialog-limited-height',
        context: { rubricaId: rubric.id, action: 'duplicate' },
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result === 'ok') {
          this.getRubrics();
        }
      });
  }

  deleteRubric(rubric: any) {
    if (rubric && rubric.id) {
      Swal.fire({
        title: 'Eliminar rubrica',
        text: '¿Está seguro de eliminar la rubrica?',
        backdrop: true,
        icon: 'question',
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#7f264a',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          const serviceName = END_POINTS.base_back.rubrics + '/rubricasGuias';
          this.loading = true;
          this.generalService.deleteNameId$(serviceName, rubric.id).subscribe((res: any) => {
            if (res.success) {
              this.getRubrics();
            }
          });
        }
      }),
        () => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        };
    }
  }
}
