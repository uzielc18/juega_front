import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { Auth2Guard, ScaffoldComponent } from "./core";

const config: ExtraOptions = {
  useHash: false,
};
const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("../app/core/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "pages",
    canActivate: [Auth2Guard],
    component: ScaffoldComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () => import("./pages/dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
      {
        path: "asignatures",
        loadChildren: () => import("./pages/asignatures/asignatures.module").then((m) => m.AsignaturesModule),
      },
      {
        path: "activities",
        loadChildren: () => import("./pages/activities/activities.module").then((m) => m.ActivitiesModule),
      },
      {
        path: "evaluations",
        loadChildren: () => import("./pages/evaluations/evaluations.module").then((m) => m.EvaluationsModule),
      },
      {
        path: "evaluations-teacher",
        loadChildren: () =>
          import("./pages/evaluations-teacher/evaluations-teacher.module").then((m) => m.EvaluationsTeacherModule),
      },
      {
        path: "rubrics",
        loadChildren: () => import("./pages/rubrics/rubrics.module").then((m) => m.RubricsModule),
      },
      {
        path: "manage",
        loadChildren: () => import("./pages/manage/manage.module").then((m) => m.ManageModule),
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        loadChildren: () => import("./pages/notfound/notfound.module").then((m) => m.NotfoundModule),
      },
    ],
  },
  {
    path: "exam/:pending_id/:person_id",
    canActivate: [Auth2Guard],
    loadChildren: () => import("./pages/exam/exam.module").then((m) => m.ExamModule),
  },
  {
    path: "",
    redirectTo: "pages",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
