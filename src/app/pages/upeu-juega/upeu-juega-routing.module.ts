import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UpeuJuegaComponent} from "./upeu-juega.component";

const routes: Routes = [{
  path: '',
  component: UpeuJuegaComponent,
  children: [
    {
      path:'categorias',
      loadChildren: () => import('src/app/pages/upeu-juega/catagorias/categorias.module').then(m => m.CategoriasModule)
    },{
      path:'disciplinas',
      loadChildren: () => import('src/app/pages/upeu-juega/disciplinas/disciplinas.module').then(m => m.DisciplinasModule)
    },{
      path:'encuentros',
      loadChildren: () => import('src/app/pages/upeu-juega/encuentros/encuentros.module').then(m => m.EncuentrosModule)
    },{
      path:'equipos',
      loadChildren: () => import('src/app/pages/upeu-juega/equipos/equipos.module').then(m => m.EquiposModule)
    },{
      path:'campeonatos',
      loadChildren: () => import('src/app/pages/upeu-juega/campeonatos/campeonatos.module').then(m => m.CampeonatosModule)
    },{
      path:'resultados',
      loadChildren: () => import('src/app/pages/upeu-juega/resultados/resultados.module').then(m => m.ResultadosModule)
    },{
      path:'puntos',
      loadChildren: () => import('src/app/pages/upeu-juega/puntos/puntos.module').then(m => m.PuntosModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpeuJuegaRoutingModule { }
