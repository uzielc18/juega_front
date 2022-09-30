import { API } from './vhost';

export const environment = {
  production: false,
  module_id: 1050,
  authStrategy: {
    name: '_lamb_strategy',
    clientId: 'OECdqAkEwvd9gEEDnX7vsaYLFAtqiBZwwJg4ztQB',
    clientSecret:'oKLfJo1ut09TzLcb7vfWFhBqQWsbU4tgBWWPdUge802miZ3pZvjg8X6QZ4xB1EUznq5giqUOGNeSKAMwuy3bRgOTojQjbvnjv4y5AqsfJcVESl6rQLsgejMANL456Qa4',
    baseEndpoint: 'https://oauth.upeu.edu.pe',
    redirectUri: `${window.location.origin}/auth/lamb/callback`,
    success: '/pages/dashboard',
  },
  authGoogleStrategy: {
    name: '_google_strategy',
    clientId:
      '649461344129-0thst4vl3n9aj0j7njie8nd73psls419.apps.googleusercontent.com',
    clientSecret: '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',
    endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    refreshTokenEndpoint: 'https://oauth2.googleapis.com/token',
    redirectUri: `${window.location.origin}/auth/google/callback`,
    success: '/pages/dashboard',
  },
  authAzureStrategy: {
    name: '_azure_strategy',
    clientId:
      '700888e6-1816-490e-9f6b-13255282f84f',
    clientSecret: 'ulJ8Q~2JnL_8gFBvjBCU9b_EOwFHkqfIOPyHGdcc',
    endpoint: 'https://login.microsoftonline.com/cfbd88b4-94bc-4fba-98bd-64d0726394a3/oauth2/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/cfbd88b4-94bc-4fba-98bd-64d0726394a3/oauth2/token',
    refreshTokenEndpoint: 'https://login.microsoftonline.com/cfbd88b4-94bc-4fba-98bd-64d0726394a3/oauth2/token',
    redirectUri: `${window.location.origin}/auth/azure/callback`,
    success: '/pages/dashboard',
  },
  apiUrls: {
    auth: API.auth.dev,
    setup: API.setup.dev,
    base: API.base.dev,
  },
  shellApp: `${window.location.origin}/auth`,
  pages: `${window.location.origin}/pages`,
  learning: `${window.location.origin}`,
  uri: {
    client_id: 'vARG7XA1TQuAodHuaU8NuQ',
    url: `${window.location.origin}/pages/manage/zoom/validate`,
  } ,
};
