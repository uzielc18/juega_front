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
      },
      {
        path: 'teacher',
        loadChildren: () => import('src/app/pages/manage/teacher/teacher.module')
          .then(m => m.TeacherModule),
      },
      {
        path: 'student',
        loadChildren: () => import('src/app/pages/manage/student/student.module')
          .then(m => m.StudentModule),
      },
      {
        path: 'configuration',
        loadChildren: () => import('src/app/pages/manage/configuration/configuration.module')
          .then(m => m.ConfigurationModule),
      },
      {
        path: 'news',
        loadChildren: () => import('src/app/pages/manage/news/news.module')
          .then(m => m.NewsModule),
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
