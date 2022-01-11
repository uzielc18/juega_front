import { environment } from 'src/environments/environment';

const patmos_b = environment.apiUrls.base;
export const END_POINTS = {
  patmos_base: patmos_b + '/api',
  base_back: { // Proyecto
    resourse: 'resources-person',
    elements: 'elements',
    user: '/user',
    config: 'config',
  },
};
