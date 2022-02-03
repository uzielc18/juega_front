import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { Auth2Guard, ScaffoldComponent } from './core';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { NotfoundModule } from './pages/notfound/notfound.module';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const config: ExtraOptions = {
  useHash: false,
};
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'pages',
    canActivate: [Auth2Guard],
    component: ScaffoldComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'asignaturas',
        loadChildren: () => import('./pages/asignatures/asignatures.module').then((m) => m.AsignaturesModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotfoundComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
