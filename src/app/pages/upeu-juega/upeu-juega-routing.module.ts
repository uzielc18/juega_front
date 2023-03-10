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
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpeuJuegaRoutingModule { }
