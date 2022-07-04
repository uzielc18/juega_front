import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ScaffoldComponent } from './core';
import { AuthGuard } from './core/auth/guards/auth.guard';

const config: ExtraOptions = {
  useHash: false,
};
const routes: Routes = [
 
  {
    path: 'pages',
    canActivate: [AuthGuard],
    component: ScaffoldComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'asignatures',
        loadChildren: () => import('./pages/asignatures/asignatures.module').then(m => m.AsignaturesModule),
      },
      {
        path: 'activities',
        loadChildren: () => import('./pages/activities/activities.module').then(m => m.ActivitiesModule),
      },
      {
        path: 'evaluations',
        loadChildren: () => import('./pages/evaluations/evaluations.module').then(m => m.EvaluationsModule),
      },
      {
        path: 'evaluations-teacher',
        loadChildren: () => import('./pages/evaluations-teacher/evaluations-teacher.module').then(m => m.EvaluationsTeacherModule),
      },
      {
        path: 'rubrics',
        loadChildren: () => import('./pages/rubrics/rubrics.module').then(m => m.RubricsModule),
      },
      {
        path: 'manage',
        loadChildren: () => import('./pages/manage/manage.module').then(m => m.ManageModule),
      },
      {
        path: 'my-calendar',
        loadChildren: () => import('./pages/my-calendar/my-calendar.module').then(m => m.MyCalendarModule),
      },
      {
        path: 'configurations',
        loadChildren: () => import('./pages/configurations/configurations.module').then(m => m.ConfigurationsModule),
      },

      // {
      //   path: "**",
      //   loadChildren: () => import("./pages/notfound/notfound.module").then((m) => m.NotfoundModule),
      // },

      // {
      //   path: "pages/not-found",
      //   loadChildren: () => import("./pages/notfound/notfound.module").then((m) => m.NotfoundModule),
      // },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },

    ],
  },
  {
    path: 'exam/:pending_id/:person_id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/exam/exam.module').then(m => m.ExamModule),
  },
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: "**",
    canActivate: [AuthGuard],
    loadChildren: () => import("./pages/notfound/notfound.module").then((m) => m.NotfoundModule),
  },

  {
    path: "pages/not-found",
    canActivate: [AuthGuard],
    loadChildren: () => import("./pages/notfound/notfound.module").then((m) => m.NotfoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
