export const environment = {
  production: true,
  module_id: 527,
  authStrategy: {
    name: 'lamb',
    clientId: 'l8gBC1fcEUsB2daoqbyxNADSznav62V0RIaVlbDb',
    baseEndpoint: 'https://oauth.upeu.edu.pe',
    redirectUri: `https://lamb-learning.upeu.edu.pe/oauth2/callback`,
    success: '/pages/dashboard',
  },
  authGoogleStrategy: {
    name: 'google',
    clientId:'649461344129-0thst4vl3n9aj0j7njie8nd73psls419.apps.googleusercontent.com',
    endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    redirectUri: `https://lamb-learning.upeu.edu.pe/oauth2/google/callback`,
    success: '/pages/dashboard',
  },
  apiUrls: {
    // auth: 'https://api.patmos.edu.pe',
      auth: 'https://api-lamb-learning.upeu.edu.pe',
      base: 'https://api-lamb-learning.upeu.edu.pe',
  },
  shellApp: `https://lamb-learning.upeu.edu.pe/auth`,
  uri: {
    client_id: 'viW1Dl5hS7uSAnxBpBlOw',
    url: `https://lamb-learning.upeu.edu.pe/pages/manage/zoom/validate`,
  } ,
};
