import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConfigurationComponent} from "../manage/configuration/configuration.component";

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children: [
      {
        path: 'tipo-programas',
        loadChildren: () => import('src/app/pages/configurations/tipo-programas/tipo-programas.module')
          .then(m => m.TipoProgramasModule)
      },
      {
        path: 'semipresencial',
        loadChildren: () => import('src/app/pages/configurations/semipresencial/semipresencial.module')
          .then(m => m.SemipresencialModule)
      },
      {
        path: 'nivel-ensenanza',
        loadChildren: () => import('src/app/pages/configurations/nivel-ensenanza/nivel-ensenanza.module')
          .then(m => m.NivelEnsenanzaModule)
      },
      {
        path: 'sedes',
        loadChildren: () => import('src/app/pages/configurations/sedes/sedes.module')
          .then(m => m.SedesModule)
      },
      {
        path: 'sede-areas',
        loadChildren: () => import('src/app/pages/configurations/sede-areas/sede-areas.module')
          .then(m => m.SedeAreasModule)
      },
      {
        path: 'areas',
        loadChildren: () => import('src/app/pages/configurations/areas/areas.module')
          .then(m => m.AreasModule)
      },
      {
        path: 'tipo-contratos',
        loadChildren: () => import('src/app/pages/configurations/contratos/tipo-contratos.module')
          .then(m => m.TipoContratosModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('src/app/pages/configurations/roles/roles.module')
          .then(m => m.RolesModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('src/app/pages/configurations/categories/categories.module')
          .then(m => m.CategoriesModule)
      },
      {
        path: 'semesters',
        loadChildren: () => import('src/app/pages/configurations/semesters/semesters.module')
          .then(m => m.SemestersModule)
      },
      {
        path: 'courses-types',
        loadChildren: () => import('src/app/pages/configurations/courses-types/courses-types.module')
          .then(m => m.CoursesTypesModule)
      },
      {
        path: 'type-alternatives',
        loadChildren: () => import('src/app/pages/configurations/type-alternatives/type-alternatives.module')
          .then(m => m.TypeAlternativesModule)
      },
      {
        path: 'type-elements',
        loadChildren: () => import('src/app/pages/configurations/type-elements/type-elements.module')
          .then(m => m.TypeElementsModule)
      },
      {
        path: 'type-ratings',
        loadChildren: () => import('src/app/pages/configurations/type-ratings/type-ratings.module')
          .then(m => m.TypeRatingsModule)
      },
      {
        path: 'type-teachers',
        loadChildren: () => import('src/app/pages/configurations/type-teachers/type-teachers.module')
          .then(m => m.TypeTeachersModule)
      },
      {
        path: 'study-program',
        loadChildren: () => import('src/app/pages/configurations/studies-programs/studies-programs.module')
          .then(m => m.StudiesProgramsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
