import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { MUniSesComponent } from './components/modals/m-uni-ses/m-uni-ses.component';

@Component({
  selector: 'app-v-unit-session',
  templateUrl: './v-unit-session.component.html',
  styleUrls: ['./v-unit-session.component.scss']
})
export class VUnitSessionComponent implements OnInit {
  formHeader: any = FormGroup;
  units:any = [];
  dragList:any = [
    {
      nivel: 1,
      titulo: 'Unidad 1',
      descripcion: 'Los complementos de la vida sin sentido alguno',
    },
    {
      nivel: 2,
      titulo: 'Session 1',
      descripcion: 'Los complementos de la vida sin sentido alguno',
    },
    {
      nivel: 2,
      titulo: 'Session 2',
      descripcion: 'Los complementos de la vida sin sentido alguno',
    },
    {
      nivel: 2,
      titulo: 'Session 3',
      descripcion: 'Los complementos de la vida sin sentido alguno',
    },
    {
      nivel: 1,
      titulo: 'Unidad 2',
      descripcion: 'Los complementos de la vida sin sentido alguno',
    },
    {
      nivel: 2,
      titulo: 'Session 1',
      descripcion: 'Los complementos de la vida sin sentido alguno',
    },
    {
      nivel: 2,
      titulo: 'Session 2',
      descripcion: 'Los complementos de la vida sin sentido alguno',
    }
  ];
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dragList, event.previousIndex, event.currentIndex);
  }

  constructor(private formBuilder: FormBuilder, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.fieldReactive();
  }
  private fieldReactive() {
    const controls = {
      drag_drop: [false],
    };
    this.formHeader = this.formBuilder.group(controls);
  }
  reloadList() {

  }
  toogleValue($event:any) {
    // if ($event) {
    //   this.dragList = JSON.parse(JSON.stringify(this.units));
    // }
  }
  changeOrden() {

  }
  openUnitSess() {
    this.dialogService.open(MUniSesComponent, {
      dialogClass: 'dialog-limited-height',
      context: {
      },
      closeOnBackdropClick: false,
      closeOnEsc: false
    }).onClose.subscribe(result => {
      if (result === 'ok') {
     
      }
    });
  }
}
