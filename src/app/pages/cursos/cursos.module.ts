import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './contents/main/main.component';
import {RouterModule} from '@angular/router';
import {NbButtonModule, NbCardModule} from '@nebular/theme';
import { ChildrenComponent } from './components/children/children.component';
import { InfoComponent } from './components/info/info.component';
import {NebularModule} from '../../shared/nebular.module';



@NgModule({
  declarations: [
    MainComponent,
    ChildrenComponent,
    InfoComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: MainComponent,
                children: [
                    {
                        path: 'children',
                        component: ChildrenComponent
                    },
                ]
            }

        ]),
      NebularModule
    ]
})
export class CursosModule { }
