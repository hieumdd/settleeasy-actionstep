import { exchangeCodeForToken, getAuthorizationURL, getToken } from './auth.service';

it('getAuthorizationURL', () => {
    const url = getAuthorizationURL();
    console.log(url);
    expect(url).toBeDefined();
});

it('exchangeCodeForToken', async () => {
    const code = '01511b0c75af937bf404b829459674fe8769b323';
    return exchangeCodeForToken(code)
        .then((token) => expect(token).toBeDefined())
        .catch((error) => {
            console.error(error);
            throw error;
        });
});

it('getToken', async () => {
    return getToken()
        .then((token) => {
            console.log(token.token);
            expect(token.expired()).toBe(false);
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
});
