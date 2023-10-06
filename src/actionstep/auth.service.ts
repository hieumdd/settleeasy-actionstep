import { Timestamp } from '@google-cloud/firestore';
import { AuthorizationCode } from 'simple-oauth2';

import { logger } from '../logging.service';
import * as tokenRepository from './token.repository';
import axios from 'axios';

const client = new AuthorizationCode({
    client: {
        id: process.env.ACTIONSTEP_CLIENT_ID ?? '',
        secret: process.env.ACTIONSTEP_CLIENT_SECRET ?? '',
    },
    auth: {
        authorizeHost: 'https://go.actionstepstaging.com/',
        authorizePath: 'api/oauth/authorize',
        tokenHost: 'https://api.actionstepstaging.com/',
        tokenPath: 'api/oauth/token',
    },
    http: { json: 'force' },
});

export const getAuthorizationURL = () => {
    return client.authorizeURL({ redirect_uri: process.env.ACTIONSTEP_REDIRECT_URI, scope: 'all' });
};

export const exchangeCodeForToken = async (code: string) => {
    const { token } = await client.getToken({
        code,
        redirect_uri: process.env.ACTIONSTEP_REDIRECT_URI ?? '',
        scope: 'all',
    });

    await tokenRepository.set(token);
    return token;
};

export const getToken = async () => {
    const existingToken = await tokenRepository.get().then((token) => {
        return client.createToken({ ...token, expires_at: (<Timestamp>token.expires_at).toDate() });
    });

    if (existingToken.expired(300_000)) {
        const newToken = await existingToken.refresh();
        await tokenRepository.set(newToken.token);
        return newToken;
    }

    return existingToken;
};

export const getClient = async () => {
    const { token } = await getToken();

    const client = axios.create({
        baseURL: process.env.ACTIONSTEP_API_ENDPOINT,
        headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            Authorization: `Bearer ${token.access_token}`,
        },
    });

    client.interceptors.response.use(
        (response) => response,
        (error) => {
            if (axios.isAxiosError(error)) {
                logger.warn({ config: error.config, data: error.response?.data });
            } else {
                logger.warn({ error });
            }
            throw error;
        },
    );

    return client;
};
