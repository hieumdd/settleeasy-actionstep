import { getAccessToken, getAuthorizationURL } from './auth.service';

it('getAuthorizationURL', () => {
    const url = getAuthorizationURL();
    console.log(url);
    expect(url).toBeDefined();
});

it('getAccessToken', async () => {
    const code = '01511b0c75af937bf404b829459674fe8769b323';
    return getAccessToken(code)
        .then((token) => expect(token).toBeDefined())
        .catch((error) => {
            console.error(error);
            throw error;
        });
});
