import { AuthorizationCode } from 'simple-oauth2';

const client = new AuthorizationCode({
    client: {
        id: process.env.ACTIONSTEP_CLIENT_ID ?? '',
        secret: process.env.ACTIONSTEP_CLIENT_SECRET ?? '',
    },
    auth: {
        authorizeHost: 'https://go.actionstepstaging.com',
        authorizePath: '/api/oauth/authorize',
        tokenHost: 'https://api.actionstepstaging.com',
        tokenPath: '/api/oauth/token',
    },
});

export const getAuthorizationURL = () => {
    return client.authorizeURL({ redirect_uri: process.env.ACTIONSTEP_REDIRECT_URI, scope: 'all' });
};
