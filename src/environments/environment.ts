import {API} from './vhost';

export const environment = {
    production: false,
    module_id: 1050,
    authStrategy: {
        name: 'oauth2',
        clientId: 'tp6DXQQjwFHlEPrkilrDDB3rknQqsVctAbjaYQiM',
        baseEndpoint: 'https://oauth.upeu.edu.pe',
        redirectUri: `${window.location.origin}/oauth2/callback`,
        success: '/pages/dashboard'
    },
    apiUrls: {
        auth: API.auth.dev,
        setup: API.setup.dev
    },
    shellApp: `${window.location.origin}`,
};
