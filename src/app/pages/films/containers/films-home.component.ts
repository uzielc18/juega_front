import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MUnitSessionComponent} from "../../../shared/components/unit-session/modal/m-unit-session.component";
import {MAddSessionComponent} from "../components/modals/m-add-session/m-add-session.component";
import {NbDialogService} from "@nebular/theme";

@Component({
  selector: 'app-films-home',
  templateUrl: './films-home.component.html',
  styleUrls: ['./films-home.component.scss']
})
export class FilmsHomeComponent implements OnInit {

  loading:boolean = false;
  formHeader: any = FormGroup;
  constructor(private fb: FormBuilder,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.fieldReactive();

  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    if (sesion) {
      return JSON.parse(sesion);
    } else {
      return '';
    }
  }

  private fieldReactive() {
    const controls = {
      cursos: [''],
    };
    this.formHeader = this.fb.group(controls);
  }


  addSession(){
    this.dialogService.open(MAddSessionComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
        items: 'item',
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
        //this.getCourseZoom();
      }
    });
  }
}
