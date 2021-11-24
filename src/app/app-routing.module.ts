import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { Auth2Guard, ScaffoldComponent } from './core';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

const config: ExtraOptions = {
  useHash: false,
};
const routes: Routes = [
  {
    path: 'pages',
    component: ScaffoldComponent,
    data: {
      breadcrumb: {
        label: 'Inicio',
      },
    },
    canActivate: [Auth2Guard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'courses',
        data: { breadcrumb: 'Asignaturas' },
        loadChildren: () =>
          import('./pages/cursos/cursos.module').then((m) => m.CursosModule),
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
    redirectTo: 'pages',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
