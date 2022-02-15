import { environment } from 'src/environments/environment';

const patmos_b = environment.apiUrls.base;
export const END_POINTS = {
  patmos_base: patmos_b + '/api',
  base: '/api',
  base_back: { // Proyecto
    resourse: 'resources-person',
    elements: 'elements',
    user: 'user',
    config: 'config',
    quiz: 'quiz',
    nivel_ensenanza: 'list-nivel-ensenanzas',
    sede_areas: 'list-sede-areas',
    programa_estudios: 'list-programa-estudios',
    semesters: 'semesters'
  },
};
