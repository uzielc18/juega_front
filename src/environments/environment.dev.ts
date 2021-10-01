export const environment = {
    production: false,
    module_id: 591,
    authStrategy: {
        name: 'oauth2',
        clientId: 'tp6DXQQjwFHlEPrkilrDDB3rknQqsVctAbjaYQiM',
        baseEndpoint: 'https://oauth.upeu.edu.pe',
        redirectUri: `https://www.upeu.dev/lamb-academic/fronts/enrollment/callback`,
        success: '/lamb-academic/fronts/enrollment/pages/dashboard'
    },
    apiUrls: {
        auth: 'https://www.upeu.dev/lamb-academic/backs/auth',
        setup: 'https://www.upeu.dev/lamb-academic/backs/setup'
    },
    shellApp: 'https://www.upeu.dev/lamb-academic/fronts/shell',
};


