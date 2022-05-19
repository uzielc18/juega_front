import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsHomeComponent } from './containers/news-home.component';
import { NewsComponent } from './news.component';
import { NebularModule } from 'src/app/shared/nebular.module';
import { ControlMessagesModule } from 'src/app/shared/components/control-messages/control-messages.module';
import { GeneralService } from 'src/app/providers';
import { CreatedNewsComponent } from './components/views/created-news/created-news.component';
import { ImageRecorteModule } from 'src/app/shared/components/recortes/image-recorte/image-recorte.module';
import { TreeviewModule } from 'ngx-treeview';
import { PreviewNewsModule } from 'src/app/shared/components/news-comp/preview-news/preview-news.module';

const COMPONENTS: any[] = [
  NewsComponent,
  NewsHomeComponent,
  CreatedNewsComponent
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
];
const NGX_MODULES: any = [
  TreeviewModule.forRoot(),
];
const MODULES: any = [
  ImageRecorteModule,
  PreviewNewsModule
];

@NgModule({
  providers: [
    ...SERIVCES,
  ],
  imports: [
    NewsRoutingModule,
    ...NG_MODULES,
    ...NGB_MODULES,
    ...CONTROL_MESSAGGE,
    ...NGX_MODULES,
    ...MODULES,
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...MODALS],
})

export class NewsModule { }
