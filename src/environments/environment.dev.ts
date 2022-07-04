// export const environment = {
//   production: false,
//   module_id: 591,
//   authStrategy: {
//     name: 'oauth2',
//     clientId: 'tp6DXQQjwFHlEPrkilrDDB3rknQqsVctAbjaYQiM',
//     baseEndpoint: 'https://oauth.upeu.edu.pe',
//     redirectUri: `https://www.upeu.dev/lamb-academic/fronts/enrollment/callback`,
//     success: '/lamb-academic/fronts/enrollment/pages/dashboard',
//   },
//   apiUrls: {
//     auth: 'https://www.upeu.dev/lamb-academic/backs/auth',
//     setup: 'https://www.upeu.dev/lamb-academic/backs/setup',
//   },
//   shellApp: 'https://www.upeu.dev/lamb-academic/fronts/shell',
// };

import { API } from './vhost';

export const environment = {
  production: false,
  module_id: 1050,
  authStrategy: {
    name: 'lamb',
    clientId: 'SDR74A0tHgbCgqOctjdC36eMaHqs4pE6II37uzQW',
    baseEndpoint: 'https://oauth.upeu.edu.pe',
    redirectUri: `https://www.upeu.dev/lamb-patmos/fronts/patmos-upeu-base-front/oauth2/callback`,
    success: '/lamb-patmos/fronts/patmos-upeu-base-front/pages/dashboard',
  },
  authGoogleStrategy: {
    name: 'google',
    clientId:
      '649461344129-0thst4vl3n9aj0j7njie8nd73psls419.apps.googleusercontent.com',
    endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    redirectUri: `https://www.upeu.dev/lamb-patmos/fronts/patmos-upeu-base-front/oauth2/google/callback`,
    success: '/lamb-patmos/fronts/patmos-upeu-base-front/pages/dashboard',
  },
  apiUrls: {
    auth: API.auth.dev,
    setup: API.setup.dev,
    base: API.base.dev,
  },
  shellApp: `https://www.upeu.dev/lamb-patmos/fronts/patmos-upeu-base-front/auth`,
  pages: `https://www.upeu.dev/lamb-patmos/fronts/patmos-upeu-base-front/pages`,
  learning: `https://www.upeu.dev/lamb-patmos/fronts/patmos-upeu-base-front`,
  uri: {
    client_id: 'vARG7XA1TQuAodHuaU8NuQ',
    url: `https://www.upeu.dev/lamb-patmos/fronts/patmos-upeu-base-front/pages/manage/zoom/validate`,
  } ,
};
