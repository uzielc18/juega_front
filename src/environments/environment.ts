import { API } from './vhost';

export const environment = {
  production: false,
  module_id: 1050,
  authStrategy: {
    name: 'lamb',
    clientId: 'tp6DXQQjwFHlEPrkilrDDB3rknQqsVctAbjaYQiM',
    baseEndpoint: 'https://oauth.upeu.edu.pe',
    redirectUri: `${window.location.origin}/oauth2/callback`,
    success: '/pages/dashboard',
  },
  authGoogleStrategy: {
    name: 'google',
    clientId:
      '649461344129-0thst4vl3n9aj0j7njie8nd73psls419.apps.googleusercontent.com',
    endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    redirectUri: `${window.location.origin}/oauth2/google/callback`,
    success: '/pages/dashboard',
  },
  apiUrls: {
    auth: API.auth.dev,
    setup: API.setup.dev,
  },
  shellApp: `${window.location.origin}`,
};
