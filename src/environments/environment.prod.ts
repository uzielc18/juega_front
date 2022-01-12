export const environment = {
    production: true,
    module_id: 527,
    authStrategy: {
      name: 'lamb',
      clientId: 'CCoDFWUHL6OJ4sus9eEIUh6Vk62lNCAnPGY3FXgg',
      baseEndpoint: 'https://oauth.upeu.edu.pe',
      redirectUri: `https://upeu.patmos.edu.pe/oauth2/callback`,
      success: '/pages/dashboard',
    },
    authGoogleStrategy: {
      name: 'google',
      clientId:'649461344129-0thst4vl3n9aj0j7njie8nd73psls419.apps.googleusercontent.com',
      endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      redirectUri: `https://lamb-elearning.upeu.edu.pe/oauth2/google/callback`,
      success: '/pages/dashboard',
    },
    apiUrls: {
        auth: 'https://api-lamb-elearning.upeu.edu.pe',
        base: 'https://api-lamb-elearning.upeu.edu.pe',
    },
    shellApp: `https:/lamb-elearning.upeu.edu.pe/auth`,
};
