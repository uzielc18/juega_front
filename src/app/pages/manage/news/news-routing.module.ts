import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatedNewsComponent } from './components/views/created-news/created-news.component';
import { NewsHomeComponent } from './containers/news-home.component';
import { NewsComponent } from './news.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent,
    children: [
      {
        path: '',
        component: NewsHomeComponent
      },
      {
        path: 'created',
        component: CreatedNewsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
