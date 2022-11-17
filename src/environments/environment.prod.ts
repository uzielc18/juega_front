export const environment = {
  production: true,
  module_id: 527,
  /*authStrategy: {
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
  }, */

  authStrategy: {
    name: '_lamb_strategy',
    clientId: 'OECdqAkEwvd9gEEDnX7vsaYLFAtqiBZwwJg4ztQB',
    clientSecret:'oKLfJo1ut09TzLcb7vfWFhBqQWsbU4tgBWWPdUge802miZ3pZvjg8X6QZ4xB1EUznq5giqUOGNeSKAMwuy3bRgOTojQjbvnjv4y5AqsfJcVESl6rQLsgejMANL456Qa4',
    baseEndpoint: 'https://oauth.upeu.edu.pe',
    redirectUri: `https://lamb-learning.upeu.edu.pe/auth/lamb/callback`,
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
    redirectUri: `https://lamb-learning.upeu.edu.pe/auth/google/callback`,
    success: '/pages/dashboard',
  },
  authAzureStrategy: {
    name: '_azure_strategy',
    clientId:
      '700888e6-1816-490e-9f6b-13255282f84f',
    clientSecret: 'ulJ8Q~2JnL_8gFBvjBCU9b_EOwFHkqfIOPyHGdcc',
    endpoint: 'https://login.microsoftonline.com/cfbd88b4-94bc-4fba-98bd-64d0726394a3/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/cfbd88b4-94bc-4fba-98bd-64d0726394a3/oauth2/v2.0/token',
    refreshTokenEndpoint: 'https://login.microsoftonline.com/cfbd88b4-94bc-4fba-98bd-64d0726394a3/oauth2/v2.0/token',
    redirectUri: `${window.location.origin}/auth/azure/callback`,
    success: '/pages/dashboard',
  },
  apiUrls: {
    // auth: 'https://api.patmos.edu.pe',
      auth: 'https://api-lamb-learning.upeu.edu.pe',
      base: 'https://api-lamb-learning.upeu.edu.pe',
  },
  shellApp: `https://lamb-learning.upeu.edu.pe/auth`,
  pages: `https://lamb-learning.upeu.edu.pe/pages`,
  learning: `https://lamb-learning.upeu.edu.pe`,
  uri: {
    client_id: 'viW1Dl5hS7uSAnxBpBlOw',
    url: `https://lamb-learning.upeu.edu.pe/pages/manage/zoom/validate`,
  } ,
};
