import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
    children: [
      {
        path: 'lamb-sync',
        loadChildren: () => import('src/app/pages/manage/lamb-sync/lamb-sync.module')
          .then(m => m.LambSyncModule),
      },
      {
        path: 'zoom',
        loadChildren: () => import('src/app/pages/manage/zoom/zoom.module')
          .then(m => m.ZoomModule),
      },
      {
        path: 'course',
        loadChildren: () => import('src/app/pages/manage/course/course.module')
          .then(m => m.CourseModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
