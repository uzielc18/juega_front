import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GeneralService} from "../../../../providers";
import {END_POINTS} from "../../../../providers/utils";
import Swal from "sweetalert2";

@Component({
  selector: 'app-elections-teachers',
  templateUrl: './elections-teachers.component.html',
  styleUrls: ['./elections-teachers.component.scss']
})
export class ElectionsTeachersComponent implements OnInit {

  typeRatinsData: any =[];
  validarBtn: any = [];
  @Input() teacherItem: any;
  @Input() userInfo: any;
  @Output() loadingsForm: EventEmitter<boolean> = new EventEmitter();
  @Output() valueEmmit: EventEmitter<any> = new EventEmitter();
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getTypeRatings();
  }
  getTypeRatings(){
    const serviceName = 'typeRatings';
    const params = {
      agrupado: 1,
      agrupado_valor: 0
    }
    this.loadingsForm.emit(true);
    this.generalService.nameParams$(serviceName, params).subscribe(resp => {
      this.typeRatinsData = resp.data;
      this.typeRatinsData.map((m: any) => {
        this.getVoteQuestion(m)
      })
    }, () => {this.loadingsForm.emit(false);}, () => {this.loadingsForm.emit(false);})
  }
  getVoteQuestion(item: any) {
    const serviceName = END_POINTS.base_back.default + 'validar-rating';
    const data = {
      codigo: item.codigo || '',
      type_rating_id: item.id || '',
      valor: 1 || '',
      tabla: 'persons' || '',
      tabla_id: this.teacherItem.person_id || '',
      person_id: this.userInfo?.user.person?.id || '',
    };
    this.loadingsForm.emit(true);
    this.generalService.nameParams$(serviceName, data).subscribe(
      (res: any) => {
        if (res.success) {
          item.validarBtn = res.data;
          const arr: any = []
          if(this.validarBtn.valor === 1){
            const obj: any = {
              datos: this.validarBtn,
              id_tabla:item.id
            }
            this.valueEmmit.emit(obj)
          }
        }
      },
      () => {
        this.loadingsForm.emit(false);
      },
      () => {
        this.loadingsForm.emit(false);
      }
    );
    return item
  }
  stylebtn(item: any){
    let valor: any = 'hover_class_desactive';
    if(item?.validarBtn?.valor === 1 && item?.validarBtn?.activo === 0){
      valor = 'hover_class_active'
    }
    if(item?.validarBtn?.valor === 0 && item?.validarBtn?.activo === 0){
      valor = 'hover_class_desactive'
    }
    return valor
  }
  upVoteQuestion(item: any, datos: any) {
    const serviceName = END_POINTS.base_back.default + 'ratings';
    const data = {
      codigo: item.codigo || '',
      type_rating_id: item.id || '',
      valor: 1 || '',
      tabla: 'persons' || '',
      tabla_id: this.teacherItem.person_id || '',
      userid: this.userInfo?.user?.id,
      person_id: this.userInfo?.user.person?.id || '',
    };
      Swal.fire({
        title: 'Elecciones 2022',
        text: '¿ Está seguro de elegir esta lista ? ',
        backdrop: true,
        icon: 'question',
        // animation: true,
        showCloseButton: true,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#00244E',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        // timer: 2000,
      }).then((result:any) => {
        if (result.isConfirmed) {
          this.loadingsForm.emit(true);
          this.generalService.addNameData$(serviceName, data).subscribe((res:any) => {
              if (res.success) {
                this.valueEmmit.emit('refresh')
              }
            },
            () => {
              this.loadingsForm.emit(false)
            });
        }
      });

  }
}
