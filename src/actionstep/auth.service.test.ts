import { getAuthorizationURL } from './auth.service';

it('getAuthorizationURL', () => {
    const url = getAuthorizationURL();
    console.log(url);
    expect(url).toBeDefined();
});
