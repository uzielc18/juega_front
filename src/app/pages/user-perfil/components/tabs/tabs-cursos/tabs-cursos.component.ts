import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {END_POINTS} from "../../../../../providers/utils";
import {GeneralService} from "../../../../../providers";
import {AppService} from "../../../../../core";
import {Subscription} from "rxjs";
import {EmitEventsService} from "../../../../../shared/services/emit-events.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tabs-cursos',
  templateUrl: './tabs-cursos.component.html',
  styleUrls: ['./tabs-cursos.component.scss']
})
export class TabsCursosComponent implements OnInit, OnDestroy {
  recuperarEmail:any = this.activatedRoute.snapshot.paramMap.get('email');
  @Input() profile: any;
  @Input() listCourses: any;
  loading: boolean = false;
  me: any;
  email: any;
  datoSubscription: any = Subscription;
  constructor(private generalService: GeneralService,
              private userService: AppService,
              private activatedRoute: ActivatedRoute,
              private emitEventsService: EmitEventsService,) {

  }
  ngOnChanges():void {
    this.profile = this.profile;
    // console.log(this.pending, this.element, 'elllllllllll', this.userInfo);

  }

  ngOnInit(): void {
     this.getCourses(this.profile?.user?.person.id);
    this.datoSubscription = this.emitEventsService.returnsEmail().subscribe(value => { // para emitir evento desde la cabecera
      if(value){
        this.email = value;
        if(!this.loading){
          this.getCourses(this.profile?.user?.person.id);
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.datoSubscription.unsubscribe();
  }
  get rolSemestre() {
    const sesion: any = sessionStorage.getItem('rolSemesterLeng');
    const val = JSON.parse(sesion);
    if (val && val.rol) {
      return val;
    } else {
      return '';
    }
  }
  getCourses(person_id: any) {
    this.loading = true;
    const serviceName = END_POINTS.base_back.default + 'course-list';
    const params = {
      semester_id: this.rolSemestre.semestre.id,
    };
    this.generalService.nameIdParams$(serviceName,person_id, params).subscribe(
      (res: any) => {
        if (res.success) {
          this.listCourses = res.data
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

}
