import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AppService } from '../../../core';
import { GeneralService } from '../../../providers';
import { END_POINTS } from '../../../providers/utils';
import { CreateRubricComponent } from '../components/create-rubric/create-rubric.component';

@Component({
  selector: 'app-rubrics-home',
  templateUrl: './rubrics-home.component.html',
  styleUrls: ['./rubrics-home.component.scss'],
})
export class RubricsHomeComponent implements OnInit {
  @Output() changeEmit: EventEmitter<any> = new EventEmitter();

  userInfo: any;
  rubrics: any[] = [];

  constructor(
    private dialogService: NbDialogService,
    private generalService: GeneralService,
    private userService: AppService
  ) {}

  ngOnInit() {
    this.getUserInfo();
    this.getRubrics();
  }

  getUserInfo() {
    this.userInfo = this.userService;
  }

  getRubrics() {
    const serviceName = END_POINTS.base_back.rubrics + '/rubricasGuias';
    const params = {
      person_id: this.userInfo._user.id,
    };
    this.generalService.nameParams$(serviceName, params).subscribe((res: any) => {
      if (res.success) {
        this.rubrics = res.data || [];
        // console.log(this.rubrics);
      }
    });
  }

  createRubric() {
    this.dialogService
      .open(CreateRubricComponent, {
        dialogClass: 'dialog-limited-height',
        context: {},
        closeOnBackdropClick: false,
        closeOnEsc: false,
      })
      .onClose.subscribe(result => {
        if (result === 'ok') {
          // this.rubrics = [];
          this.getRubrics();
        }
      });
  }

  editRubric(rubric: any) {
    console.log(rubric);
  }

  deleteRubric(rubric: any) {
    console.log(rubric);
    //   const serviceName = END_POINTS.base_back.rubrics + '/rubricasGuias';
    //   const params = {
    //     id: rubric.id,
    //     person_id: this.userInfo._user.id,
    //   };
    //   this.generalService.nameParams$(serviceName, params).subscribe((res: any) => {
    //     if (res.success) {
    //       this.getRubrics();
    //     }
    //   });
  }
}
