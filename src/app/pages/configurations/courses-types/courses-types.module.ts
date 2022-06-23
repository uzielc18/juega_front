import { NgModule } from '@angular/core';

import { CoursesTypesRoutingModule } from './courses-types-routing.module';
import { CoursesTypesComponent } from './courses-types.component';

import {NebularModule} from "../../../shared/nebular.module";
import {ControlMessagesModule} from "../../../shared/components/control-messages/control-messages.module";
import {GeneralService} from "../../../providers";
import { CoursesTypeHomeComponent } from './containers/courses-type-home.component';
import { MCoursesTypesComponent } from './components/modals/m-courses-types/m-courses-types.component';
import {UnitSessionModule} from "../../../shared/components/unit-session/view/unit-session.module";

const COMPONENTS: any[] = [
  CoursesTypesComponent,
  CoursesTypeHomeComponent,
  MCoursesTypesComponent
];
const NG_MODULES: any = [
  NebularModule,
];
const NGB_MODULES: any = [
];
const CONTROL_MESSAGGE: any = [
  ControlMessagesModule,
];
const SERIVCES: any = [
  GeneralService,
];
const MODALS: any = [
  MCoursesTypesComponent
];
const NGX_MODULES: any = [
];
const MODULES: any = [
  UnitSessionModule
];

@NgModule({
  providers: [
    ...SERIVCES,
  ],
  imports: [
    CoursesTypesRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS, CoursesTypeHomeComponent, MCoursesTypesComponent],
  entryComponents: [...MODALS],
})
export class CoursesTypesModule { }
