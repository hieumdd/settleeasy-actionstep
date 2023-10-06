import { AuthorizationCode } from 'simple-oauth2';

import * as tokenRepository from './token.repository';

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

export const getAccessToken = async (code: string) => {
    const accessToken = await client.getToken({
        code,
        redirect_uri: process.env.ACTIONSTEP_REDIRECT_URI ?? '',
        scope: 'all',
    });

    await tokenRepository.set(accessToken.token);

    return accessToken.token;
};
