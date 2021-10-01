export const environment = {
    production: true,
    module_id: 527,
    authStrategy: {
        name: 'oauth2',
        clientId: 'tp6DXQQjwFHlEPrkilrDDB3rknQqsVctAbjaYQiM',
        baseEndpoint: 'https://oauth.upeu.edu.pe',
        redirectUri: 'https://lamb-academic.upeu.edu.pe/enrollment/callback',
        success: '/enrollment/pages/dashboard'
    },
    apiUrls: {
        auth: 'https://api-lamb-academic.upeu.edu.pe/auth',
        setup: 'https://api-lamb-academic.upeu.edu.pe/setup'
    },
    shellApp: 'https://lamb-academic.upeu.edu.pe',
};
