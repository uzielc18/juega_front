import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConfigurationComponent} from "../manage/configuration/configuration.component";

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children: [
      {
        path: 'semesters',
        loadChildren: () => import('src/app/pages/configurations/semesters/semesters.module')
          .then(m => m.SemestersModule)
      },
      {
        path: 'coursesTypes',
        loadChildren: () => import('src/app/pages/configurations/courses-types/courses-types.module')
          .then(m => m.CoursesTypesModule)
      },
      {
        path: 'typeAlternatives',
        loadChildren: () => import('src/app/pages/configurations/type-alternatives/type-alternatives.module')
          .then(m => m.TypeAlternativesModule)
      },
      {
        path: 'typeElements',
        loadChildren: () => import('src/app/pages/configurations/type-elements/type-elements.module')
          .then(m => m.TypeElementsModule)
      },
      {
        path: 'typeRatings',
        loadChildren: () => import('src/app/pages/configurations/type-ratings/type-ratings.module')
          .then(m => m.TypeRatingsModule)
      },
      {
        path: 'typeTeachers',
        loadChildren: () => import('src/app/pages/configurations/type-teachers/type-teachers.module')
          .then(m => m.TypeTeachersModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
